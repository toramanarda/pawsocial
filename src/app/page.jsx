"use client";

import { useApp } from "@/context/AppContext";
import CreatePostBox from "@/components/feed/CreatePostBox";
import PostCard from "@/components/feed/PostCard";

export default function HomePage() {

  const { posts, users, feedTab, setFeedTab, activeCategory, setActiveCategory } = useApp();

  // Takip edilen kullanıcıların ID listesi
  const followingUserIds = users.filter((u) => u.isFollowing).map((u) => u.id);

  // For You / Following ve Kategori Filtresi
  const filteredPosts = posts.filter((post) => {
    if (feedTab === "following") {
      const authorId = post.authorId || post.author?.id;
      if (!followingUserIds.includes(authorId)) return false;
    }
    return true;
  });

  return (
    <div>
      {/* Üst Başlık ve Sekmeler */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line z-10">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-line">
          <h1 className="text-[18px] font-extrabold text-ink">Home</h1>
          <span className="text-muted tracking-[3px] font-bold cursor-pointer select-none">•••</span>
        </div>
        <div className="flex border-b border-line">
          <button
            onClick={() => setFeedTab("for-you")}
            className={`relative flex-1 py-3 text-center font-bold text-[13px] transition-colors cursor-pointer ${feedTab === "for-you" ? "text-ink" : "text-muted hover:text-ink"
              }`}
          >
            For you
            {feedTab === "for-you" && (
              <span className="absolute bottom-[-1px] left-[32%] right-[32%] h-[3px] bg-coral rounded-full" />
            )}
          </button>

          <button
            onClick={() => setFeedTab("following")}
            className={`relative flex-1 py-3 text-center font-bold text-[13px] transition-colors cursor-pointer ${feedTab === "following" ? "text-ink" : "text-muted hover:text-ink"
              }`}
          >
            Following
            {feedTab === "following" && (
              <span className="absolute bottom-[-1px] left-[32%] right-[32%] h-[3px] bg-coral rounded-full" />
            )}
          </button>
        </div>
      </header>

      {/* Post Oluşturma */}
      <CreatePostBox />

      {/* Gönderi Akışı Listesi */}
      <div className="divide-y divide-line">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="p-8 text-center text-muted text-[14px]">
            {feedTab === "following"
              ? "No posts from people you follow yet."
              : "No posts found."}
          </div>
        )}
      </div>
    </div>
  );
}