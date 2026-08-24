"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, User, Bookmark } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/discovery", icon: Search },
    { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-t border-line flex items-center justify-around px-2 z-40">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`p-2 transition-colors ${
              isActive ? "text-coral" : "text-muted hover:text-ink"
            }`}
          >
            <Icon size={22} />
          </Link>
        );
      })}
    </nav>
  );
}