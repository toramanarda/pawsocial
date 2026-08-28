"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, User, Bookmark, Plus, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import CreatePostBox from "@/components/feed/CreatePostBox";

export default function MobileNav({ onOpenCreateModal }) {
  const pathname = usePathname();
  const { currentUser, unreadNotificationsCount } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUserId = currentUser?.id || "u-arda";

  const handleOpenCreate = () => {
    if (onOpenCreateModal) {
      onOpenCreateModal();
    } else {
      setIsModalOpen(true);
    }
  };

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/discovery", icon: Search },
    { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { label: "Notifications", href: "/notifications", icon: Bell, hasBadge: unreadNotificationsCount > 0 },
    { label: "Profile", href: `/profile/${currentUserId}`, icon: User },
  ];

  return (
    <>
      {/* Mobil Post Butonu */}
      <button
        type="button"
        onClick={handleOpenCreate}
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
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <span className="font-bold text-[15px] text-ink">New Post</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-muted hover:text-ink hover:bg-surface transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <CreatePostBox onPostCreated={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}