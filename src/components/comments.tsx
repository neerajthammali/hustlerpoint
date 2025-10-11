
'use client';

import React, { useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, serverTimestamp, CollectionReference, DocumentData } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Skeleton } from './ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

type Comment = {
  id: string;
  authorName: string;
  authorId: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function Comments({ articleId }: { articleId: string }) {
  const { user, isUserLoading } = useAuth();
  const [commentText, setCommentText] = useState('');
  const firestore = useFirestore();

  const commentsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'articles', articleId, 'comments');
  }, [firestore, articleId]);

  const commentsQuery = useMemoFirebase(() => {
    if (!commentsColRef) return null;
    return query(commentsColRef as CollectionReference<DocumentData>, orderBy('createdAt', 'desc'));
  }, [commentsColRef]);

  const { data: comments, isLoading: isLoadingComments } = useCollection<Comment>(commentsQuery);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user || !commentsColRef) return;

    addDocumentNonBlocking(commentsColRef, {
      text: commentText,
      authorId: user.uid,
      authorName: user.isAnonymous ? 'Anonymous' : (user.displayName || 'User'),
      createdAt: serverTimestamp(),
    });

    setCommentText('');
  };

  const isPostingDisabled = isUserLoading || !commentText.trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <form className="space-y-4" onSubmit={handlePostComment}>
            <Textarea
              placeholder="Share your thoughts..."
              className="min-h-[100px]"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isUserLoading}
            />
            <Button type="submit" disabled={isPostingDisabled}>
              {isUserLoading ? 'Authenticating...' : 'Post Comment'}
            </Button>
          </form>
          <div className="space-y-6">
            {isLoadingComments && (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            )}
            {!isLoadingComments && comments && comments.length > 0 && (
              <>
              <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/40?u=${comment.authorId}`} alt={comment.authorName} data-ai-hint="avatar" />
                    <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{comment.authorName}</p>
                      {comment.createdAt && (
                         <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt.seconds * 1000), { addSuffix: true })}
                        </p>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-foreground/90">{comment.text}</p>
                  </div>
                </div>
              ))}
              </>
            )}
             {!isLoadingComments && comments?.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Be the first to comment!</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
