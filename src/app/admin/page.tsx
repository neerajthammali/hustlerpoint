'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { type Article } from '@/lib/types';
import AnimatedCounter from '@/components/animated-counter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Book, Users, Eye, Copy, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

export default function AdminDashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const articlesCollection = useMemoFirebase(() => query(collection(firestore, 'articles')), [firestore]);
  const { data: articles, isLoading: articlesLoading } = useCollection<Article>(articlesCollection);
  
  const subscribersCollection = useMemoFirebase(() => query(collection(firestore, 'newsletter_subscribers')), [firestore]);
  const { data: subscribers, isLoading: subscribersLoading } = useCollection(subscribersCollection);

  const totalArticles = articles?.length ?? 0;
  const totalViews = articles?.reduce((sum, article) => sum + (article.engagement || 0), 0) ?? 0;
  const totalSubscribers = subscribers?.length ?? 0;

  const stats = [
    { title: 'Total Articles', value: totalArticles, icon: <Book className="h-5 w-5 text-muted-foreground" /> },
    { title: 'Total Views', value: totalViews, icon: <Eye className="h-5 w-5 text-muted-foreground" /> },
    { title: 'Subscribers', value: totalSubscribers, icon: <Users className="h-5 w-5 text-muted-foreground" /> },
    { title: 'Engagement Rate', value: '0%', icon: <Eye className="h-5 w-5 text-muted-foreground" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.displayName || user?.email || 'Admin'} 👋</h1>
        <p className="text-muted-foreground">Here's how your publication is doing.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof stat.value === 'number' ? <AnimatedCounter to={stat.value} /> : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {articles && articles.length === 0 && (
        <Card className="text-center">
            <CardContent className="p-12">
                <h3 className="text-lg font-semibold">You don't have any posts written yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Check out how to write a post so you can start sharing your thoughts
                </p>
                <Button asChild className="mt-6">
                    <Link href="/admin/articles/new">
                        See the editor in action <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Continue growing</CardTitle>
          <p className="text-sm text-muted-foreground">Continue setting up your publication to unlock more features</p>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>You're almost there—just 2 steps to bring your ideas to life</span>
                    <span>2/4</span>
                </div>
                <Progress value={50} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                    <h4 className="font-semibold">Finish your publication settings</h4>
                    <p className="mt-1 text-sm text-muted-foreground">Add the basics—name, logo, and description—so readers instantly recognize you</p>
                    <Button variant="outline" className="mt-4">Complete setup</Button>
                </div>
                <div className="rounded-lg border p-4">
                    <h4 className="font-semibold">Import your subscribers & content lists</h4>
                    <p className="mt-1 text-sm text-muted-foreground">Seamlessly bring your existing audience and past posts into one click</p>
                    <Button variant="outline" className="mt-4">Import audience</Button>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Resources for you</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Quick link</h4>
            <p className="mt-1 text-sm text-muted-foreground">Grab your homepage URL any time—perfect for sharing on social or with collaborators</p>
            <div className="mt-4 flex items-center gap-2 rounded-md border bg-muted p-2">
                <span className="truncate text-sm text-muted-foreground">https://hustlers.point/</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Your guide to growth</h4>
            <p className="mt-1 text-sm text-muted-foreground">Skip the guesswork. Follow step-by-step videos and guides to launch, grow, and monetize—on your schedule</p>
            <div className="mt-4 flex gap-2">
                <Button variant="outline">Video tutorials</Button>
                <Button variant="outline">Blog</Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Need help?</h4>
            <p className="mt-1 text-sm text-muted-foreground">Answers, docs, and real humans are only a click away whenever you hit a snag</p>
             <div className="mt-4 flex gap-2">
                <Button variant="outline">Knowledge Base <ExternalLink className="ml-2 h-3 w-3" /></Button>
                <Button variant="outline">Help <ExternalLink className="ml-2 h-3 w-3" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
