'use client';

import React from 'react';

interface ArticleRendererProps {
  content: string;
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content }) => {
  // The 'content' prop is already processed into an HTML string by remark.
  // We can render it directly using dangerouslySetInnerHTML.
  // This is safe because we control the Markdown-to-HTML conversion process on the server.
  return (
    <div
      className="space-y-6 text-lg leading-relaxed text-foreground/90"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleRenderer;
