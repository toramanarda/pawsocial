"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, User, Bookmark, Plus } from "lucide-react";

export default function MobileNav({ onOpenCreateModal }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/discovery", icon: Search },
    { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { label: "Notifications", href: "/notifications", icon: Bell, hasBadge: true },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      {/* Mobil Post Butonu */}
      <button
        onClick={onOpenCreateModal}
        className="md:hidden fixed bottom-18 right-4 w-12 h-12 rounded-full bg-coral text-white shadow-fab grid place-items-center z-40 active:scale-95 transition-transform cursor-pointer"
        aria-label="Create post"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-t border-line flex items-center justify-around px-2 z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`p-2 transition-colors ${isActive ? "text-coral" : "text-muted hover:text-ink"
                }`}
            >
              <Icon size={22} />
              {item.hasBadge && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-coral ring-2 ring-white" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}