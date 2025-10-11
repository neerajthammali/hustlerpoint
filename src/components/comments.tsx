
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function Comments({ articleId }: { articleId: string }) {
  const recipientEmail = 'heyladdu1206@gmail.com';

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const comment = formData.get('comment') as string;

    const subject = `New Comment on Article: ${articleId}`;
    const body = `
      A new comment has been submitted for the article "${articleId}".

      **From:**
      ${name}

      ---

      **Comment:**
      ${comment}
    `;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    event.currentTarget.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Leave a Comment
        </CardTitle>
        <CardDescription>
          Your comment will be sent to the author.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Write a comment..."
              className="min-h-[100px]"
              required
            />
          </div>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Post Comment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
