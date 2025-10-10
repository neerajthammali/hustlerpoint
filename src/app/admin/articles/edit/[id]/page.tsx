'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { ArticleForm } from '@/components/admin/article-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditArticlePage() {
  const { id } = useParams();
  const firestore = useFirestore();
  const router = useRouter();
  
  const articleRef = doc(firestore, 'articles', id as string);
  const { data: article, isLoading } = useDoc(articleRef);

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  if (!article && !isLoading) {
    return <p>Article not found.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Article</CardTitle>
      </CardHeader>
      <CardContent>
        {article && <ArticleForm articleId={id as string} initialData={article} />}
      </CardContent>
    </Card>
  );
}
