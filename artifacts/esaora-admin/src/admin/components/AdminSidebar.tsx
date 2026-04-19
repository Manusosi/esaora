import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard, Newspaper, Layers, FolderOpen, Image,
  Settings, BookOpen, Users, Handshake, Award, ShieldCheck,
  Heart, Home, LogOut, ChevronDown, ChevronRight, Menu, X,
  Globe, Mail, Database
} from 'lucide-react';
import { signOut } from '@workspace/esaora-core/lib/auth';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  {
    icon: Newspaper, label: 'News & Articles',
    children: [
      { label: 'All Articles', href: '/admin/articles' },
      { label: 'Add New Article', href: '/admin/articles/new' },
      { label: 'Categories & Tags', href: '/admin/articles/categories' },
    ],
  },
  {
    icon: Layers, label: 'Programmes',
    children: [
      { label: 'All Programmes', href: '/admin/programs' },
      { label: 'Add New', href: '/admin/programs/new' },
    ],
  },
  {
    icon: Image, label: 'Media Library',
    children: [
      { label: 'Image Gallery', href: '/admin/gallery' },
      { label: 'Documents', href: '/admin/media' },
    ],
  },
  { icon: BookOpen, label: 'Reports', href: '/admin/reports' },
  {
    icon: Settings, label: 'Settings',
    children: [
      { label: 'System', href: '/admin/settings/system' },
      { label: 'Profile', href: '/admin/settings/profile' },
      { label: 'Notifications', href: '/admin/settings/notifications' },
    ],
  },
];

const ORG_ITEMS: NavItem[] = [
  { icon: Users, label: 'Team Members', href: '/admin/team' },
  { icon: Handshake, label: 'Partners', href: '/admin/partners' },
  { icon: Mail, label: 'Contact Inbox', href: '/admin/submissions/contact' },
  { icon: Globe, label: 'Membership Applications', href: '/admin/submissions/membership' },
  { icon: Database, label: 'Newsletter Subscribers', href: '/admin/subscribers' },
  { icon: Heart, label: 'Donations', href: '/admin/donations' },
  { icon: ShieldCheck, label: 'Users & Roles', href: '/admin/users' },
];

function NavGroup({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(() =>
    item.children?.some((c) => location.startsWith(c.href)) ?? false
  );

  const isActive = item.href
    ? location === item.href || (item.href !== '/admin' && location.startsWith(item.href))
    : item.children?.some((c) => location.startsWith(c.href));

  const Icon = item.icon;

  if (item.href && !item.children) {
    return (
      <Link href={item.href}>
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 group ${
            isActive
              ? 'bg-white/15 text-white'
              : 'text-white/60 hover:bg-white/8 hover:text-white/90'
          }`}
          title={collapsed ? item.label : undefined}
        >
          <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-[#00d2ff]' : ''}`} />
          {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
          {!collapsed && isActive && <div className="ml-auto w-1.5 h-1.5 bg-[#00d2ff] rounded-full" />}
        </div>
      </Link>
    );
  }

  return (
    <div>
      <div
        onClick={() => !collapsed && setOpen((o) => !o)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
          isActive
            ? 'bg-white/15 text-white'
            : 'text-white/60 hover:bg-white/8 hover:text-white/90'
        }`}
        title={collapsed ? item.label : undefined}
      >
        <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-[#00d2ff]' : ''}`} />
        {!collapsed && (
          <>
            <span className="text-sm font-medium truncate flex-1">{item.label}</span>
            {open
              ? <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
              : <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />}
          </>
        )}
      </div>

      {!collapsed && open && item.children && (
        <div className="ml-7 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
          {item.children.map((child) => (
            <Link key={child.href} href={child.href}>
              <div
                className={`py-2 px-2 rounded-md text-xs cursor-pointer transition-colors duration-150 ${
                  location === child.href
                    ? 'text-[#00d2ff] font-semibold'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {child.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

interface AdminSidebarProps {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
}

export function AdminSidebar({ collapsed, onCollapse }: AdminSidebarProps) {
  const handleSignOut = async () => {
    try { await signOut(); } catch { /* ignore */ }
    window.location.href = '/admin/login';
  };

  return (
    <aside
      className={`flex flex-col h-screen bg-[#0D2417] border-r border-white/5 transition-all duration-300 ease-in-out flex-shrink-0 ${
        collapsed ? 'w-[64px]' : 'w-[260px]'
      }`}
    >
      {/* Logo / Header */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/5 min-h-[72px] ${collapsed ? 'justify-center' : ''}`}>
        <img
          src="/ESAORA-LOGO.png"
          alt="ESA-ORA"
          className="w-8 h-8 object-contain flex-shrink-0"
        />
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">ESA-ORA</p>
            <p className="text-white/40 text-[10px] truncate">Platform Manager</p>
          </div>
        )}
        <button
          onClick={() => onCollapse(!collapsed)}
          className={`ml-auto p-1 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors flex-shrink-0 ${collapsed ? 'ml-0' : ''}`}
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10">
        {NAV_ITEMS.map((item) => (
          <NavGroup key={item.label} item={item} collapsed={collapsed} />
        ))}

        {/* Organization Section */}
        {!collapsed && (
          <div className="pt-4 pb-1 px-3">
            <p className="text-white/25 text-[9px] uppercase tracking-[0.18em] font-bold">Organization</p>
          </div>
        )}
        {collapsed && <div className="my-2 border-t border-white/10" />}

        {ORG_ITEMS.map((item) => (
          <NavGroup key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-white/5 space-y-0.5">
        <Link href="/" target="_blank">
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/40 hover:bg-white/5 hover:text-white/70 transition-all duration-150"
            title={collapsed ? 'Go Back Home' : undefined}
          >
            <Home className="w-[18px] h-[18px] flex-shrink-0" />
            {!collapsed && <span className="text-xs font-medium">Go Back Home</span>}
          </div>
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span className="text-xs font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
