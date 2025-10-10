'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/articles');
  }, [router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <p>Redirecting to articles...</p>
    </div>
  );
}
