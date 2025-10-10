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

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  status: z.enum(['draft', 'published']),
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
  
  const onSubmit = async (values: ArticleFormValues) => {
    try {
      if (articleId) {
        // Update existing document
        const articleRef = doc(firestore, 'articles', articleId);
        await setDoc(articleRef, { ...values, updatedAt: serverTimestamp() }, { merge: true });
        toast({ title: 'Success', description: 'Article updated successfully.' });
      } else {
        // Create new document
        const articlesCollection = collection(firestore, 'articles');
        await addDoc(articlesCollection, {
          ...values,
          publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          author: 'Hustler Point Editorial', // Or get from logged in user
          imageId: `article-${Math.floor(Math.random() * 5) + 1}`, // Placeholder
          engagement: 0, // Initial value
          featured: false, // Default
        });
        toast({ title: 'Success', description: 'Article created successfully.' });
      }
      router.push('/admin/articles');
      router.refresh(); // Re-fetch server-side props
    } catch (error) {
      console.error('Error saving article:', error);
      toast({ title: 'Error', description: 'Could not save article.', variant: 'destructive' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g., my-awesome-article" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your article here..." {...field} rows={15} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </div>
        
        <h3 className="text-lg font-medium border-t pt-6">SEO Options</h3>
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter meta description (for search engines)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <Input placeholder="e.g., tech, startups, creators" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="canonicalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Canonical URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter canonical URL if content is syndicated" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">
            {articleId ? 'Update Article' : 'Create Article'}
        </Button>
      </form>
    </Form>
  );
}
