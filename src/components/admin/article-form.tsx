'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFirestore } from '@/firebase';
import { collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  slug: z.string().optional(),
  content: z.string().min(1, { message: 'Content cannot be empty.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  status: z.enum(['draft', 'published', 'scheduled']),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  articleId?: string;
  initialData?: Partial<ArticleFormValues>;
}

export function ArticleForm({ articleId, initialData }: ArticleFormProps) {
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      content: '',
      category: '',
      status: 'draft',
      metaDescription: '',
      keywords: '',
      canonicalUrl: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ArticleFormValues) => {
    try {
      const slug = values.slug || values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const dataToSave = {
        ...values,
        slug,
        updatedAt: serverTimestamp(),
      };

      if (articleId) {
        // Update existing document
        const articleRef = doc(firestore, 'articles', articleId);
        await setDoc(articleRef, dataToSave, { merge: true });
        toast({ title: 'Success', description: 'Article updated successfully.' });
      } else {
        // Create new document
        const articlesCollection = collection(firestore, 'articles');
        await addDoc(articlesCollection, {
          ...dataToSave,
          publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          createdAt: serverTimestamp(),
          author: 'Hustler Point Editorial', 
          imageId: `article-${Math.floor(Math.random() * 5) + 1}`,
          engagement: 0,
          featured: false,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-end gap-4 py-4 border-b">
           <Button type="submit" variant="ghost" disabled={isSubmitting}>
             {articleId ? 'Save Changes' : 'Save Draft'}
           </Button>
           <Popover>
            <PopoverTrigger asChild>
                <Button type="button" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Publishing...
                        </>
                    ) : (
                        'Publish'
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Publishing Options</h4>
                        <p className="text-sm text-muted-foreground">
                        Set category, status, and SEO settings before publishing.
                        </p>
                    </div>
                     <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Tech">Tech</SelectItem>
                                    <SelectItem value="Creators">Creators</SelectItem>
                                    <SelectItem value="Startups">Startups</SelectItem>
                                    <SelectItem value="Tech Culture">Tech Culture</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button 
                        type="button" 
                        onClick={() => {
                            form.setValue('status', 'published');
                            form.handleSubmit(onSubmit)();
                        }}
                        disabled={isSubmitting}
                    >
                       Confirm & Publish
                    </Button>
                </div>
            </PopoverContent>
           </Popover>
        </div>
        
        <div className="mx-auto max-w-3xl space-y-8">
            {/* Cover Image Upload */}
            <div className="flex items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-10 h-10 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">Add a cover image to your article.</p>
                        <Button type="button" variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload from computer
                        </Button>
                    </div>
                </div>
            </div>

            {/* Article Title */}
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Textarea
                    placeholder="Article Title"
                    className="resize-none border-none text-4xl font-extrabold tracking-tight focus-visible:ring-0 p-0 shadow-none"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Article Content */}
            <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Textarea
                    placeholder="Write here. You can also include @mentions..."
                    className="min-h-[400px] resize-none border-none p-0 text-lg focus-visible:ring-0 shadow-none"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
      </form>
    </Form>
  );
}
