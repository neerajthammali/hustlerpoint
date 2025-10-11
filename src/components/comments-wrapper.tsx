
'use client';

import { useInView } from 'react-intersection-observer';
import Comments from './comments';
import { Skeleton } from './ui/skeleton';

export default function CommentsWrapper() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div ref={ref} className="min-h-[400px]">
      {inView ? <Comments /> : <Skeleton className="w-full h-[400px] rounded-lg" />}
    </div>
  );
}
