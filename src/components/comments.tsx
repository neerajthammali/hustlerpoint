
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { MessageSquare } from 'lucide-react';

export default function Comments({ articleId }: { articleId: string }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Leave a Comment
        </CardTitle>
        <CardDescription>
          Share your thoughts and join the discussion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="commonninja_component pid-efcf4410-ff0f-4aa1-b513-1a29066d31fc"></div>
      </CardContent>
    </Card>
  );
}
