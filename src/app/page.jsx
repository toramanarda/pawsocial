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
    // Tab Filtresi
    if (feedTab === "following") {
      const authorId = post.authorId || post.author?.id;
      if (!followingUserIds.includes(authorId)) return false;
    }
    // Kategori Filtresi
    if (activeCategory && activeCategory !== "all") {
      if (post.category?.toLowerCase() !== activeCategory.toLowerCase()) return false;
    }
    return true;
  });

  const categories = [
    { id: "all", label: "All" },
    { id: "general", label: "General" },
    { id: "parks", label: "Parks" },
    { id: "walks", label: "Walks" },
    { id: "dog care", label: "Dog Care" },
    { id: "tips & tricks", label: "Tips & Tricks" },
    { id: "adoption", label: "Adoption" },
  ];

  return (
    <div>
      {/* Üst Başlık ve Sekmeler */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line z-10">
        <div className="flex border-b border-line">
          <button
            onClick={() => setFeedTab("for-you")}
            className="flex-1 py-3 text-center font-bold text-[14px] relative transition-colors cursor-pointer"
          >
            <span className={feedTab === "for-you" ? "text-ink" : "text-muted"}>
              For you
            </span>
            {feedTab === "for-you" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-coral rounded-full" />
            )}
          </button>

          <button
            onClick={() => setFeedTab("following")}
            className="flex-1 py-3 text-center font-bold text-[14px] relative transition-colors cursor-pointer"
          >
            <span className={feedTab === "following" ? "text-ink" : "text-muted"}>
              Following
            </span>
            {feedTab === "following" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-coral rounded-full" />
            )}
          </button>
        </div>
        {/* Kategori Filtreleme */}
        <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar bg-white">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${activeCategory === cat.id
                ? "bg-coral text-white font-semibold"
                : "bg-surface text-muted hover:text-ink hover:bg-line/60"
                }`}
            >
              {cat.label}
            </button>
          ))}
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
              ? "Henüz takip ettiğin kişilerden bu kategoride gönderi yok."
              : "Bu kategoride henüz gönderi bulunamadı."}
          </div>
        )}
      </div>
    </div>
  );
}