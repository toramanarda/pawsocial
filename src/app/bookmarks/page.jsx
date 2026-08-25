"use client";

import { Bookmark, Trash2 } from "lucide-react";

export default function BookmarksPage() {
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
          className="p-2 rounded-full hover:bg-surface text-muted hover:text-coral transition-colors cursor-pointer"
          title="Clear all bookmarks"
        >
          <Trash2 size={16} />
        </button>
      </header>
    </div>
  );
}