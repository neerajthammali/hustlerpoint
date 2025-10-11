import { ImageUploader } from '@/components/image-uploader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Admin Tools
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Utilities to help you manage your content.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-16">
        <Card>
          <CardHeader>
            <CardTitle>Thumbnail Generator</CardTitle>
            <CardDescription>
              Upload an image to convert it into a `data URI`. Copy the URI and paste it into the `image` field in your article's Markdown frontmatter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploader />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
