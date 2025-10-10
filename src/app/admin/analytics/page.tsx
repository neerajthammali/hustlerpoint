import { Card, CardContent } from '@/components/ui/card';

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <Card>
        <CardContent className="p-6">
          <p>Analytics charts and data will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
