"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, User, Bookmark, Mail } from "lucide-react";
import PostModal from "@/components/feed/PostModal";

export default function Sidebar() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-[11px] py-[10px] rounded-[10px] text-[14px] font-[650] transition-colors ${isActive
                  ? "text-ink bg-surface font-bold"
                  : "text-muted hover:bg-surface/60 hover:text-ink"
                }`}
            >
              <div className="flex items-center gap-[10px]">
                <Icon size={19} className="shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="grid place-items-center w-5 h-5 rounded-full bg-coral text-white text-[11px] font-bold">
                  {item.badge}
                </span>
              )}
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