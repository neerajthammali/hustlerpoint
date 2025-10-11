
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

type Frontmatter = {
  title: string;
  slug: string;
  description: string;
  author: string;
  publisher: string;
  date: string;
  modified_date: string;
  category: string;
  tags: string;
  image: string;
  image_alt: string;
  read_time: string;
  status: 'published' | 'draft';
  language: 'en';
};

export default function EditorPage() {
  const { toast } = useToast();
  const [frontmatter, setFrontmatter] = useState<Frontmatter>({
    title: '',
    slug: '',
    description: '',
    author: 'Neeraj Kumar',
    publisher: 'Hustlers Point',
    date: new Date().toISOString().split('T')[0],
    modified_date: new Date().toISOString().split('T')[0],
    category: 'Tech & AI',
    tags: '',
    image: '',
    image_alt: '',
    read_time: '5 min read',
    status: 'published',
    language: 'en',
  });
  const [content, setContent] = useState('');

  const handleFrontmatterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFrontmatter((prev) => ({ ...prev, [name]: value }));
  };

  const generateMarkdown = () => {
    const fmString = `---
title: "${frontmatter.title}"
slug: "${frontmatter.slug}"
description: "${frontmatter.description}"
author: "${frontmatter.author}"
publisher: "${frontmatter.publisher}"
date: "${frontmatter.date}"
modified_date: "${frontmatter.modified_date}"
category: "${frontmatter.category}"
tags: [${frontmatter.tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
image: "${frontmatter.image}"
image_alt: "${frontmatter.image_alt}"
read_time: "${frontmatter.read_time}"
status: "${frontmatter.status}"
language: "${frontmatter.language}"
---

${content}`;
    return fmString;
  };

  const handleCopyMarkdown = () => {
    const markdown = generateMarkdown();
    navigator.clipboard.writeText(markdown);
    toast({
      title: 'Markdown Copied!',
      description: 'The full article content is ready to be pasted into a .md file.',
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Article Editor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create and generate the Markdown for your next article.
        </p>
      </header>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Frontmatter</CardTitle>
            <CardDescription>Enter the metadata for your article.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Object.keys(frontmatter).map((key) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="capitalize">{key.replace(/_/g, ' ')}</Label>
                <Input
                  id={key}
                  name={key}
                  value={frontmatter[key as keyof Frontmatter]}
                  onChange={handleFrontmatterChange}
                  placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Write your article content using Markdown.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="# Your Article Title..."
              className="min-h-[400px] font-mono"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleCopyMarkdown} size="lg">
            <Copy className="mr-2 h-4 w-4" />
            Generate & Copy Markdown
          </Button>
        </div>
      </div>
    </div>
  );
}
