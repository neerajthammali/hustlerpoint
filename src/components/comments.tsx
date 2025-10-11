
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { MessageSquare, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCollection, useFirebase, useFirestore, useMemoFirebase } from '@/firebase';
import {
  addDocumentNonBlocking,
} from '@/firebase';
import { collection, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  text: string;
  authorName: string;
  authorAvatar: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function Comments({ articleId }: { articleId: string }) {
  useAuth();
  const { user, isUserLoading } = useFirebase();
  const firestore = useFirestore();
  const [commentText, setCommentText] = useState('');

  const commentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'comments', articleId, 'messages'),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, articleId]);

  const { data: comments, isLoading: isLoadingComments } = useCollection<Comment>(commentsQuery);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user || !firestore) return;

    const newComment = {
      text: commentText,
      authorId: user.uid,
      authorName: user.displayName || 'Anonymous',
      authorAvatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
      createdAt: serverTimestamp(),
    };

    const commentsCollection = collection(
      firestore,
      'comments',
      articleId,
      'messages'
    );
    addDocumentNonBlocking(commentsCollection, newComment);
    setCommentText('');
  };

  const renderSkeleton = () => (
    <div className="flex items-start gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Join the Conversation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoadingComments && (
          <div className="space-y-6">
            {renderSkeleton()}
            {renderSkeleton()}
          </div>
        )}
        {!isLoadingComments && comments && comments.length > 0 && (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={comment.authorAvatar} />
                  <AvatarFallback>
                    {comment.authorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold">{comment.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {comment.createdAt &&
                        formatDistanceToNow(
                          new Date(
                            comment.createdAt.seconds * 1000 +
                              comment.createdAt.nanoseconds / 1000000
                          ),
                          { addSuffix: true }
                        )}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
         {!isLoadingComments && comments?.length === 0 && (
            <p className="text-sm text-center text-muted-foreground py-4">Be the first to comment!</p>
        )}
      </CardContent>
      <CardFooter>
        {isUserLoading ? (
           <div className="w-full flex items-center gap-4">
             <Skeleton className="h-10 w-10 rounded-full" />
             <Skeleton className="h-10 flex-1" />
             <Skeleton className="h-10 w-10" />
           </div>
        ) : user ? (
          <form
            onSubmit={handleCommentSubmit}
            className="flex w-full items-start gap-4"
          >
            <Avatar>
              <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} />
              <AvatarFallback>{user.displayName?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1"
              rows={1}
            />
            <Button type="submit" size="icon" disabled={!commentText.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Post Comment</span>
            </Button>
          </form>
        ) : (
          <p className="w-full text-center text-sm text-muted-foreground">
            Sign in to join the discussion.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
