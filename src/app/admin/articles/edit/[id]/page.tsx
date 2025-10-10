'use client';

import { useMemo, type PropsWithChildren } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { ArticleForm } from '@/components/admin/article-form';
import { Skeleton } from '@/components/ui/skeleton';

function EditorAuthGuard({ children }: PropsWithChildren) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
}


export default function EditArticlePage() {
  const { id } = useParams();
  const firestore = useFirestore();
  
  const articleRef = useMemoFirebase(() => doc(firestore, 'articles', id as string), [firestore, id]);
  const { data: article, isLoading } = useDoc(articleRef);

  return (
    <EditorAuthGuard>
      <div className="min-h-screen w-full bg-background p-4 sm:p-6 md:p-8">
        {isLoading && (
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
        )}
        {!isLoading && !article && <p>Article not found.</p>}
        {article && <ArticleForm articleId={id as string} initialData={article} />}
      </div>
    </EditorAuthGuard>
  );
}
