
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { type Article } from '@/lib/types';
import AnimatedCounter from '@/components/animated-counter';

export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const articlesCollection = useMemoFirebase(() => query(collection(firestore, 'articles')), [firestore]);
  const { data: articles, isLoading } = useCollection<Article>(articlesCollection);

  const totalArticles = articles?.length || 0;
  const totalViews = articles?.reduce((sum, article) => sum + (article.engagement || 0), 0) || 0;

  const subscribersCollection = useMemoFirebase(() => query(collection(firestore, 'newsletter_subscribers')), [firestore]);
  const { data: subscribers } = useCollection(subscribersCollection);
  const totalSubscribers = subscribers?.length || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <p className="text-4xl font-bold">...</p> : <p className="text-4xl font-bold"><AnimatedCounter to={totalArticles} /></p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <p className="text-4xl font-bold">...</p> : <p className="text-4xl font-bold"><AnimatedCounter to={totalViews} /></p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold"><AnimatedCounter to={totalSubscribers} /></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
