"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, User, Bookmark } from "lucide-react";

export default function Sidebar({ onOpenCreateModal }) {
  const pathname = usePathname();
  
  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/discovery", icon: Search },
    { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { label: "Notifications", href: "/notifications", icon: Bell, badge: 2 },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[205px] border-r border-line p-[18px_13px] shrink-0 bg-white sticky top-0 h-screen">
      {/* Doggo Logosu */}
      <Link href="/" className="flex items-center gap-2 mx-[6px] mb-[22px] font-extrabold text-[17px] tracking-[-0.04em]">
        <span className="grid place-items-center w-7 h-7 rounded-[9px] bg-coral text-white font-black text-sm">
          D
        </span>
        Doggo
      </Link>

      {/* Navigasyon Bağlantıları */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-[10px] px-[11px] py-[10px] rounded-[10px] text-[14px] font-[650] text-muted hover:bg-surface/60 hover:text-ink transition-colors"
            >
              <Icon size={19} className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {/* Post Oluşturma Butonu */}
      <button
        onClick={onOpenCreateModal}
        className="w-full mt-5 py-[10px] px-4 rounded-[10px] bg-coral text-white text-[14px] font-[750] shadow-sm hover:brightness-95 transition-all cursor-pointer"
      >
        Create post
      </button>
    </aside>
  );
}