'use client';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { LogOut, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

function AuthGuard({ children }: PropsWithChildren) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      router.push('/login');
    });
  };

  const isEditorPage =
    pathname.startsWith('/admin/articles/new') ||
    pathname.startsWith('/admin/articles/edit');

  if (isEditorPage) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/admin/articles"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Logo />
              <span className="sr-only">Hustler Point</span>
            </Link>
            <Link
              href="/admin/articles"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Articles
            </Link>
          </nav>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
              {/* Search can be added here later */}
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
