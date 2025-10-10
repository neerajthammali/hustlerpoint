
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Mock data for comments
const comments = [
  {
    id: 1,
    author: 'Jane Doe',
    avatar: 'https://picsum.photos/seed/avatar1/40/40',
    date: '2 days ago',
    text: 'This is a really insightful article. Thanks for sharing!',
  },
  {
    id: 2,
    author: 'John Smith',
    avatar: 'https://picsum.photos/seed/avatar2/40/40',
    date: '1 day ago',
    text: 'Great points! I especially agree with the section on hybrid work models.',
  },
];

export default function Comments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <form className="space-y-4">
            <Textarea placeholder="Share your thoughts..." className="min-h-[100px]" />
            <Button>Post Comment</Button>
          </form>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} data-ai-hint="avatar" />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.date}</p>
                  </div>
                  <p className="mt-1 text-sm text-foreground/90">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
