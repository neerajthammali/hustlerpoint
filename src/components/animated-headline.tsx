'use client';

import { useEffect, useState } from 'react';

type AnimatedHeadlineProps = {
  text: string;
};

export default function AnimatedHeadline({ text }: AnimatedHeadlineProps) {
  const words = text.split(' ');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
      {words.map((word, index) => (
        <span key={index} className="inline-block">
          {isMounted && (
            <span
              className="inline-block animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
            >
              {word}&nbsp;
            </span>
          )}
        </span>
      ))}
    </h1>
  );
}
