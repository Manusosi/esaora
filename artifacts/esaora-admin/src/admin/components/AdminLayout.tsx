import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AdminLayout({ children, title, breadcrumbs }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden">
      <AdminSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminTopBar title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
