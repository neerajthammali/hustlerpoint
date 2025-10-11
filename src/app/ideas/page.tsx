'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Send } from 'lucide-react';

export default function IdeasPage() {
  const recipientEmail = "neerajthammali2021@gmail.com";

  const handleIdeaSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const ideaName = formData.get('ideaName') as string;
    const problem = formData.get('problem') as string;
    const solution = formData.get('solution') as string;
    const audience = formData.get('audience') as string;

    const subject = `New Startup Idea Submission: ${ideaName}`;
    const body = `
      A new startup idea has been submitted through Hustler Point.

      **Idea Name:**
      ${ideaName}

      **Submitted By:**
      Name: ${name}
      Email: ${email}

      ---

      **What problem does it solve?**
      ${problem}

      **What is the proposed solution?**
      ${solution}

      **Who is the target audience?**
      ${audience}
    `;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Share Your Startup Idea
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a brilliant idea for a startup? We'd love to hear it. Submissions are private and sent directly to our team.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Submit Your Idea
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleIdeaSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" placeholder="Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ideaName">What's the name of your idea?</Label>
              <Input id="ideaName" name="ideaName" placeholder="e.g., 'Project Phoenix'" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="problem">What problem are you solving?</Label>
              <Textarea id="problem" name="problem" placeholder="Describe the pain point or gap in the market." className="min-h-[100px]" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="solution">What is your solution?</Label>
              <Textarea id="solution" name="solution" placeholder="How does your idea solve this problem?" className="min-h-[120px]" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="audience">Who is the target audience?</Label>
              <Input id="audience" name="audience" placeholder="e.g., 'Small business owners, students, etc.'" required />
            </div>
            <Button type="submit" size="lg">
              <Send className="mr-2 h-4 w-4" />
              Submit Idea Privately
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
