
'use client';

import React from 'react';
import Image from 'next/image';

interface ArticleRendererProps {
  content: string;
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content }) => {
  const blocks = content.split('\n\n');

  return (
    <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
      {blocks.map((block, index) => {
        // Headers
        if (block.startsWith('#')) {
          const level = block.match(/^#+/)?.[0].length || 1;
          const HeaderTag = `h${level + 1}` as keyof JSX.IntrinsicElements; // h2, h3, etc.
          const text = block.replace(/^#+\s/, '');
          return <HeaderTag key={index} className="font-headline font-bold">{text}</HeaderTag>;
        }
        
        // Unordered List
        if (block.startsWith('* ') || block.startsWith('- ')) {
            return (
                <ul key={index} className="list-inside list-disc space-y-2 pl-4">
                    {block.split('\n').map((item, i) => (
                        <li key={i}>{item.replace(/^[-*]\s/, '')}</li>
                    ))}
                </ul>
            )
        }
        
        // Ordered List
        if (/^\d+\.\s/.test(block)) {
            return (
                <ol key={index} className="list-inside list-decimal space-y-2 pl-4">
                    {block.split('\n').map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                    ))}
                </ol>
            )
        }
        
        // Blockquote
        if (block.startsWith('> ')) {
            return (
                <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {block.replace(/^> /, '')}
                </blockquote>
            )
        }

        // Paragraph
        return