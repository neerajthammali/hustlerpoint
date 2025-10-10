'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { ArticleForm } from '@/components/admin/article-form';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditArticlePage() {
  const { id } = useParams();
  const firestore = useFirestore();
  const router = useRouter();
  
  const articleRef = useMemoFirebase(() => doc(firestore, 'articles', id as string), [firestore, id]);
  const { data: article, isLoading } = useDoc(articleRef);

  if (isLoading) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-end gap-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
            </div>
            <div className="mx-auto max-w-3xl space-y-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-64 w-full" />
            </div>
      </div>
    );
  }

  if (!article && !isLoading) {
    return <p>Article not found.</p>;
  }

  return (
    <div>
        {article && <ArticleForm articleId={id as string} initialData={article} />}
    </div>
  );
}
