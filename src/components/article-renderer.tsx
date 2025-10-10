
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
        if (block.startsWith('# ')) {
          const level = block.match(/^#+ /)?.[0].trim().length || 1;
          const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;
          const text = block.replace(/^#+ /, '');
          return <HeaderTag key={index}>{text}</HeaderTag>;
        }
        
        if (block.startsWith('1. ')) {
            return (
                <ol key={index} className="list-inside list-decimal space-y-2">
                    {block.split('\n').map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                    ))}
                </ol>
            )
        }

        if (block.startsWith('- ')) {
            return (
                <ul key={index} className="list-inside list-disc space-y-2">
                    {block.split('\n').map((item, i) => (
                        <li key={i}>{item.replace(/^- /, '')}</li>
                    ))}
                </ul>
            )
        }
        
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
};

export default ArticleRenderer;

