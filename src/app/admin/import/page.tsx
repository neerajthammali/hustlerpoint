import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function AdminImportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Import Content</h1>
        <p className="text-muted-foreground">
          Bring your existing audience and content into Hustler's Point.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Import Subscribers</CardTitle>
          <CardDescription>
            Upload a CSV file with an 'email' column to import your subscribers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 rounded-lg border border-dashed p-8">
            <div className="text-center w-full">
                <p className="mb-4 text-muted-foreground">This feature is not yet implemented.</p>
                <Button disabled>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload CSV
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Import Content</CardTitle>
          <CardDescription>
            Import your past posts from other platforms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 rounded-lg border border-dashed p-8">
             <div className="text-center w-full">
                <p className="mb-4 text-muted-foreground">This feature is not yet implemented.</p>
                <Button disabled>
                    <Upload className="mr-2 h-4 w-4" />
                    Import from URL or File
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
