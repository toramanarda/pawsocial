"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Plus, X, Dog, Home, Search, Bookmark, Bell, User } from "lucide-react";
import { useApp } from "@/context/AppContext";
import CreatePostBox from "@/components/feed/CreatePostBox";

function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { currentUser, unreadNotificationsCount } = useApp();

  const currentUserId = currentUser?.id || "u-arda";

  return (
    <>
      <header className="sticky top-0 z-30 flex md:hidden items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-line">
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="p-1.5 -ml-1.5 rounded-full text-ink hover:bg-surface transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-xl bg-coral flex items-center justify-center text-white font-black text-[18px] shadow-sm select-none">
            D
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="p-1.5 -mr-1.5 rounded-full text-coral hover:bg-coral-pale/40 transition-colors cursor-pointer"
          aria-label="Create post"
        >
          <Plus size={22} className="stroke-[2.5]" />
        </button>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="w-72 bg-white h-full shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div className="flex items-center gap-2">
                  <Dog size={24} className="text-coral stroke-[2.5]" />
                  <span className="font-extrabold text-[18px] text-ink">PawSocial</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-surface cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1.5 mt-4">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-[14px] text-ink hover:bg-surface transition-colors"
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>
                <Link
                  href="/discovery"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-[14px] text-ink hover:bg-surface transition-colors"
                >
                  <Search size={20} />
                  <span>Discover</span>
                </Link>
                <Link
                  href="/bookmarks"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-[14px] text-ink hover:bg-surface transition-colors"
                >
                  <Bookmark size={20} />
                  <span>Bookmarks</span>
                </Link>
                <Link
                  href="/notifications"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[14px] text-ink hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Bell size={20} />
                    <span>Notifications</span>
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-coral text-white text-[11px] font-bold">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </Link>
                <Link
                  href={`/profile/${currentUserId}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-[14px] text-ink hover:bg-surface transition-colors"
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-line">
              <span className="font-bold text-[14px] text-ink block">{currentUser?.name || "Arda Toraman"}</span>
              <span className="text-[12px] text-muted">{currentUser?.handle || "@ardatoraman"}</span>
            </div>
          </div>
        </div>
      )}

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <span className="font-bold text-[15px] text-ink">New Post</span>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-full text-muted hover:text-ink hover:bg-surface transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <CreatePostBox onPostCreated={() => setIsCreateOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
export default MobileHeader;