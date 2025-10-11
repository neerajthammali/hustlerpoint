
'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Editor from '@/components/editor';
import { OutputData } from '@editorjs/editorjs';
import { Copy } from 'lucide-react';
import { format } from 'date-fns';

const EditorPage: React.FC = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('Hustler Point Editorial');
  const [editorData, setEditorData] = useState<OutputData>({
    time: Date.now(),
    blocks: [],
    version: '2.29.1',
  });

  const handleEditorChange = useCallback((data: OutputData) => {
    setEditorData(data);
  }, []);

  const convertEditorDataToMarkdown = (data: OutputData): string => {
    let markdown = '';
    data.blocks.forEach(block => {
      switch (block.type) {
        case 'header':
          markdown += `${'#'.repeat(block.data.level)} ${block.data.text}\n\n`;
          break;
        case 'paragraph':
          markdown += `${block.data.text}\n\n`;
          break;
        case 'list':
          const listItems = block.data.items.map((item: string) => 
            block.data.style === 'ordered' ? `1. ${item}` : `* ${item}`
          ).join('\n');
          markdown += `${listItems}\n\n`;
          break;
        case 'image':
          markdown += `![${block.data.caption || ''}](${block.data.file.url})\n\n`;
          break;
        case 'embed':
          // For simplicity, just linking the embed source
          markdown += `[${block.data.source}](${block.data.source})\n\n`;
          break;
        default:
          break;
      }
    });
    return markdown.trim();
  };

  const handleCopyMarkdown = () => {
    const publishedDate = format(new Date(), 'MMMM d, yyyy');
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const content = convertEditorDataToMarkdown(editorData);

    const frontmatter = `---
title: '${title}'
excerpt: '${excerpt}'
category: '${category}'
author: '${author}'
publishedDate: '${publishedDate}'
featured: false
---

${content}
`;

    navigator.clipboard.writeText(frontmatter);
    toast({
      title: 'Markdown Copied!',
      description: `The markdown for "${title}" is ready to be pasted.`,
    });
  };
  
  const handleCopyFileName = () => {
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const fileName = `${slug}.md`;
    navigator.clipboard.writeText(fileName);
    toast({
      title: 'Filename Copied!',
      description: `Filename "${fileName}" copied to clipboard.`,
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
          <CardDescription>
            Fill in the details below and write your article. When you're done, copy the generated markdown and filename to create a new file in your project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article Title" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Startups, Tech" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A short summary of the article." />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <div className="rounded-md border bg-card p-4">
              <Editor data={editorData} onChange={handleEditorChange} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleCopyMarkdown} className="flex-1">
              <Copy className="mr-2 h-4 w-4" /> Copy Full Markdown
            </Button>
             <Button onClick={handleCopyFileName} variant="outline" className="flex-1">
              <Copy className="mr-2 h-4 w-4" /> Copy File Name
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditorPage;
