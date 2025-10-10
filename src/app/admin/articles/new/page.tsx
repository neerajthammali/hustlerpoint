'use client';

import { ArticleForm } from '@/components/admin/article-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewArticlePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Article</CardTitle>
      </CardHeader>
      <CardContent>
        <ArticleForm />
      </CardContent>
    </Card>
  );
}
