'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFirestore } from '@/firebase';
import { collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { 
    Upload, 
    Image as ImageIcon, 
    Loader2,
    Undo,
    Redo,
    Link,
    Bold,
    Italic,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    MessageSquare,
    ChevronDown,
    CheckCircle2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  subtitle: z.string().optional(),
  content: z.string().min(1, { message: 'Content cannot be empty.' }),
  category: z.string().optional(),
  status: z.enum(['draft', 'published', 'scheduled']),
  tags: z.array(z.string()).optional(),
});

type ArticleFormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  articleId?: string;
  initialData?: Partial<ArticleFormValues>;
}

const EditorToolbar = () => (
    <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon"><Undo className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Redo className="h-4 w-4" /></Button>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <Button variant="ghost" size="icon"><Bold className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Italic className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Strikethrough className="h-4 w-4" /></Button>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <Button variant="ghost" size="icon"><Link className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Code className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><List className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><ListOrdered className="h-4 w-4" /></Button>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <Button variant="ghost" size="icon"><MessageSquare className="h-4 w-4" /></Button>
    </div>
)

export function ArticleForm({ articleId, initialData }: ArticleFormProps) {
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      subtitle: '',
      content: '',
      category: '',
      status: 'draft',
      tags: [],
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ArticleFormValues) => {
    try {
      const slug = values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const dataToSave = {
        ...values,
        slug,
        updatedAt: serverTimestamp(),
      };

      if (articleId) {
        const articleRef = doc(firestore, 'articles', articleId);
        await setDoc(articleRef, dataToSave, { merge: true });
        toast({ title: 'Success', description: 'Article updated successfully.' });
      } else {
        const articlesCollection = collection(firestore, 'articles');
        await addDoc(articlesCollection, {
          ...dataToSave,
          publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          createdAt: serverTimestamp(),
          author: 'Hustler Point Editorial', 
          imageId: `article-${Math.floor(Math.random() * 5) + 1}`,
          engagement: 0,
          featured: false,
          excerpt: values.subtitle
        });
        toast({ title: 'Success', description: 'Article created successfully.' });
      }
      router.push('/admin/articles');
      router.refresh();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({ title: 'Error', description: 'Could not save article.', variant: 'destructive' });
    }
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-screen w-full flex flex-col">
            {/* Header */}
            <header className="flex-shrink-0 flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2 text-sm">
                    <Badge variant={form.getValues('status') === 'published' ? 'default' : 'secondary'}>
                        {form.getValues('status') === 'draft' ? 'Draft' : 'Published'}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Synced</span>
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2">
                  <EditorToolbar />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 rounded-md bg-muted p-0.5">
                        <Button size="sm" variant={ 'default'} className="px-3 h-7">Write</Button>
                        <Button size="sm" variant={'ghost'} className="px-3 h-7">Style</Button>
                    </div>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/avatar/32/32" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            {/* Editor Body */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto py-12 px-4">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="ghost" className="text-muted-foreground"><ImageIcon className="mr-2 h-4 w-4" /> Add thumbnail</Button>
                        <Button variant="ghost" className="text-muted-foreground">Add content tags</Button>
                    </div>

                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="New Post"
                                            className="resize-none border-none text-4xl lg:text-5xl font-extrabold tracking-tight p-0 shadow-none focus-visible:ring-0 leading-tight"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subtitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Add a subtitle"
                                            className="resize-none border-none text-xl text-muted-foreground p-0 shadow-none focus-visible:ring-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                         <div className="flex items-center gap-2 pt-4">
                             {/* Placeholder for tags/categories */}
                         </div>

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="pt-8">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Start writing..."
                                            className="min-h-[400px] resize-none border-none p-0 text-lg focus-visible:ring-0 shadow-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </main>

            {/* Footer Actions */}
            <footer className="flex-shrink-0 flex items-center justify-end p-4 border-t gap-4">
                <Button type="button" variant="outline" onClick={() => router.push('/admin/articles')}>Cancel</Button>
                <Button type="button" variant="ghost" disabled={isSubmitting} onClick={() => {
                    form.setValue('status', 'draft');
                    form.handleSubmit(onSubmit)();
                }}>
                    Save Draft
                </Button>
                <Button type="submit" disabled={isSubmitting} onClick={() => form.setValue('status', 'published')}>
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...</> : 'Publish'}
                </Button>
            </footer>
        </form>
    </Form>
  );
}
