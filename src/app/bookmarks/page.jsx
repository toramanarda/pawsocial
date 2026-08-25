"use client";

import { useState } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import PostCard from "@/components/feed/PostCard";

export default function BookmarksPage() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([
    {
      id: "b1",
      authorId: "u-mnuri",
      author: {
        name: "Mehmet Nuri",
        handle: "@mnuri",
        avatar: "MN",
        avatarColor: "violet",
      },
      content: "Yavru köpeklerde temel itaat eğitimi için ilk 3 ay çok kritik. Sabır ve bolca ödül maması işin sırrı!",
      category: "Tips & Tricks",
      tags: ["dogtraining", "puppylife"],
      createdAt: "4h ago",
      likesCount: 42,
      commentsCount: 11,
      repostsCount: 6,
    },
    {
      id: "b2",
      authorId: "u-elif",
      author: {
        name: "Elif Fidan",
        handle: "@eliffidan",
        avatar: "EF",
        avatarColor: "peach",
      },
      content: "Sabah Maçka Parkı yürüyüşünde harika dostlarla karşılaştık! 🐾 Havalar ısınırken sabah serinliğini kaçırmayın.",
      category: "Walks",
      tags: ["mackaparki", "morningwalk", "dogs"],
      createdAt: "2h ago",
      likesCount: 24,
      commentsCount: 5,
      repostsCount: 2,
    },
  ]);

  const handleClearAll = () => {
    setBookmarkedPosts([]);
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
          className="p-2 rounded-full hover:bg-surface text-muted hover:text-coral transition-colors cursor-pointer"
          title="Clear all bookmarks"
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