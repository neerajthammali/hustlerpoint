'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import {
  LayoutDashboard,
  Newspaper,
  LineChart,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { PropsWithChildren } from 'react';

const AdminSidebar = () => {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      router.push('/login');
    });
  };

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/articles', label: 'Articles', icon: Newspaper },
    { href: '/admin/analytics', label: 'Analytics', icon: LineChart },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                href={item.href}
                isActive={pathname === item.href}
                asChild
              >
                <a>
                  <item.icon />
                  {item.label}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut}>
              <LogOut />
              Sign Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
};

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
  const isEditorPage = pathname.startsWith('/admin/articles/new') || pathname.startsWith('/admin/articles/edit');

  if (isEditorPage) {
    return <AuthGuard>{children}</AuthGuard>;
  }
  
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex h-full">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
