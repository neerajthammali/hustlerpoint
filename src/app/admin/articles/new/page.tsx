'use client';

import { ArticleForm } from '@/components/admin/article-form';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';


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

export default function NewArticlePage() {
  return (
    <EditorAuthGuard>
      <div className="min-h-screen w-full bg-background">
        <ArticleForm />
      </div>
    </EditorAuthGuard>
  );
}
