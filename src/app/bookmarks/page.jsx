"use client";

import { useApp } from "@/context/AppContext";
import { Bookmark, Trash2 } from "lucide-react";
import PostCard from "@/components/feed/PostCard";

export default function BookmarksPage() {
  const { posts, toggleBookmark } = useApp();

  const bookmarkedPosts = posts.filter((p) => p.isBookmarked);

  const handleClearAll = () => {
    bookmarkedPosts.forEach((post) => toggleBookmark(post.id));
  };
  return (
    <div>
      {/* Üst Başlık */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line px-4 py-3 z-10 flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-[16px] text-ink leading-tight">
            Bookmarks
          </h1>
          <span className="text-[12px] text-muted">Saved posts & tips</span>
        </div>
        <button
          onClick={handleClearAll}
          disabled={bookmarkedPosts.length === 0}
          className={`p-2 rounded-full transition-colors ${bookmarkedPosts.length === 0
              ? "opacity-30 cursor-not-allowed text-muted"
              : "hover:bg-surface text-muted hover:text-coral cursor-pointer"
            }`}
        >
          <Trash2 size={16} />
        </button>
      </header>
      {/* Kaydedilen Gönderiler Listesi */}
      <div className="divide-y divide-line">
        {bookmarkedPosts.length === 0 ? (
          <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-muted mb-3">
              <Bookmark size={22} />
            </div>
            <h3 className="font-extrabold text-[16px] text-ink mb-1">
              Save posts for later
            </h3>
            <p className="text-[13px] text-muted max-w-xs leading-relaxed">
              Don’t let the good tips slip away! Bookmark posts to easily find them again in the future.
            </p>
          </div>
        ) : (
          bookmarkedPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}