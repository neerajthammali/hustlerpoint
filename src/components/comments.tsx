
'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageSquare } from 'lucide-react';

export default function Comments({ articleId }: { articleId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Join the Conversation
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        <p className="mb-4">
          Article comments can be enabled by integrating a third-party service like Giscus, Disqus, or Commento.
        </p>
        <p className="text-sm">
          This allows you to add a rich, interactive comment section without needing a dedicated backend.
        </p>
      </CardContent>
    </Card>
  );
}
