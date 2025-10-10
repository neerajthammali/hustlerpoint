'use client';

import React from 'react';
import Image from 'next/image';
import { OutputData } from '@editorjs/editorjs';

interface ArticleRendererProps {
  data: OutputData;
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ data }) => {
  if (!data || !data.blocks || !Array.isArray(data.blocks)) {
    return <p>No content available.</p>;
  }

  return (
    <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
      {data.blocks.map((block) => {
        switch (block.type) {
          case 'header':
            const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
            return <HeaderTag key={block.id} dangerouslySetInnerHTML={{ __html: block.data.text }} />;
          
          case 'paragraph':
            return <p key={block.id} dangerouslySetInnerHTML={{ __html: block.data.text }} />;
            
          case 'list':
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={block.id} className="list-inside list-disc space-y-2">
                {block.data.items.map((item: string, index: number) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ListTag>
            );
            
          case 'image':
            return (
              <div key={block.id} className="relative my-8 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <Image src={block.data.file.url} alt={block.data.caption || 'Article image'} fill className="object-cover" />
                {block.data.caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{block.data.caption}</figcaption>}
              </div>
            );

          case 'embed':
            return (
                <div key={block.id} className="relative my-8 w-full">
                    <iframe
                        src={block.data.embed}
                        height={block.data.height}
                        className="w-full"
                        allowFullScreen
                    ></iframe>
                     {block.data.caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{block.data.caption}</figcaption>}
                </div>
            )

          default:
            return <p key={block.id}>Unsupported block type: {block.type}</p>;
        }
      })}
    </div>
  );
};

export default ArticleRenderer;
