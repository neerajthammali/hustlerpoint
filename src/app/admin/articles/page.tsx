import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminArticlesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Button>Add Article</Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <p>Article management will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
