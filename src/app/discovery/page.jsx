"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Sparkles, TrendingUp, AlertCircle, RefreshCw, Loader2, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import PostCard from "@/components/feed/PostCard";
import { useApp } from "@/context/AppContext";

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";
  const { posts, users = [], toggleFollow } = useApp();
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("posts");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    if (searchTerm.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchTerm, activeCategory]);

  const filterChips = ["For you", "Dogs", "Photography", "#morningwalk", "#weekendwalk"];
  const categories = ["For you", "Dogs", "Photography", "#morningwalk", "#weekendwalk"];
  const cleanSearch = searchTerm.toLowerCase().replace(/^#/, "").trim();

  const matchedPosts = cleanSearch
    ? posts.filter((p) => {
      const matchContent = p.content?.toLowerCase().includes(cleanSearch);
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(cleanSearch));
      const matchCategory = p.category?.toLowerCase().includes(cleanSearch);
      const matchAuthor =
        p.author?.name?.toLowerCase().includes(cleanSearch) ||
        p.author?.handle?.toLowerCase().includes(cleanSearch);
      return matchContent || matchTags || matchCategory || matchAuthor;
    })
    : posts;

  const matchedUsers = cleanSearch
    ? users.filter((u) => {
      return (
        u.name?.toLowerCase().includes(cleanSearch) ||
        u.handle?.toLowerCase().includes(cleanSearch) ||
        u.bio?.toLowerCase().includes(cleanSearch)
      );
    })
    : users;

  return (
    <div>
      {/* Arama Başlığı */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line p-3 z-10">
        <div className="flex items-center gap-2 px-3 py-2 rounded-[12px] bg-surface text-[13px] border border-transparent focus-within:border-coral focus-within:bg-white transition-colors">
          <Search size={16} className="text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search parks, breeds, tips or @users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-0 outline-none w-full text-ink placeholder:text-muted"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-muted hover:text-ink p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
          {isLoading && (
            <Loader2 size={16} className="animate-spin text-coral shrink-0 ml-1" />
          )}
        </div>

        {/* Kategori Filtreleri */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar">
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => {
                if (chip === "For you") setSearchTerm("");
                else setSearchTerm(chip);
              }}
              className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-colors cursor-pointer ${searchTerm === chip || (chip === "For you" && !searchTerm)
                ? "bg-coral-pale text-coral font-bold"
                : "bg-surface text-muted hover:text-ink"
                }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Posts & People Sekmeleri */}
        <div className="flex border-t border-line mt-3">
          <button
            onClick={() => setActiveTab("posts")}
            className={`relative flex-1 py-3 text-center text-[13px] font-bold transition-colors cursor-pointer ${activeTab === "posts" || activeTab === "all" ? "text-ink" : "text-muted hover:text-ink"
              }`}
          >
            Posts
            {(activeTab === "posts" || activeTab === "all") && (
              <span className="absolute bottom-0 left-[32%] right-[32%] h-[3px] bg-coral rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("people")}
            className={`relative flex-1 py-3 text-center text-[13px] font-bold transition-colors cursor-pointer ${activeTab === "people" ? "text-ink" : "text-muted hover:text-ink"
              }`}
          >
            People
            {activeTab === "people" && (
              <span className="absolute bottom-0 left-[32%] right-[32%] h-[3px] bg-coral rounded-full" />
            )}
          </button>
        </div>
      </header>
      {/* Error State */}
      {
        hasError && (
          <div className="p-8 text-center flex flex-col items-center gap-2">
            <AlertCircle size={24} className="text-red-500" />
            <p className="text-[13px] text-muted">Failed to load content.</p>
            <button onClick={() => setHasError(false)} className="text-[12px] font-bold text-coral flex items-center gap-1 hover:underline">
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )
      }

      {/* Loading State */}
      {
        isLoading && (
          <div className="p-6 flex flex-col gap-3">
            <div className="h-3 w-1/2 rounded bg-surface animate-pulse" />
            <div className="h-3 w-full rounded bg-surface animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-surface animate-pulse" />
            <div className="h-3 w-1/3 rounded bg-surface animate-pulse mt-2" />
          </div>
        )
      }

      {/* 1. POSTS SEKMESİ */}
      {
        !isLoading && (activeTab === "posts" || activeTab === "all") && (
          <div>
            {matchedPosts.length === 0 ? (
              <div className="py-16 px-4 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-coral-pale text-coral flex items-center justify-center text-[18px] mb-3">⌕</div>
                <h3 className="text-[15px] font-bold text-ink mb-1">No posts found</h3>
                <p className="text-[12px] text-muted max-w-xs mb-4">Try a different topic, person or spelling.</p>
                <button onClick={() => setSearchTerm("")} className="px-3.5 py-1.5 bg-coral text-white rounded-[8px] text-[12px] font-bold">Clear search</button>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {matchedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )
      }

      {/* 2. PEOPLE SEKMESİ */}
      {
        !isLoading && activeTab === "people" && (
          <div className="divide-y divide-line">
            {matchedUsers.length === 0 ? (
              <div className="py-16 px-4 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-coral-pale text-coral flex items-center justify-center text-[18px] mb-3">⌕</div>
                <h3 className="text-[15px] font-bold text-ink mb-1">No people found</h3>
                <p className="text-[12px] text-muted max-w-xs mb-4">Try searching for another user handle or name.</p>
                <button onClick={() => setSearchTerm("")} className="px-3.5 py-1.5 bg-coral text-white rounded-[8px] text-[12px] font-bold">Clear search</button>
              </div>
            ) : (
              matchedUsers.map((u) => (
                <div key={u.id} className="p-4 flex items-start justify-between gap-3 hover:bg-surface/40 transition-colors">
                  <Link href={`/profile/${u.id}`} className="flex items-start gap-3 min-w-0 flex-1">
                    <Avatar initials={u.avatar || "DG"} color={u.avatarColor || "peach"} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-bold text-[14px] text-ink hover:underline truncate">{u.name}</span>
                        <span className="text-[12px] text-muted truncate">{u.handle}</span>
                      </div>
                      {u.bio && <p className="text-[13px] text-muted mt-0.5 line-clamp-2">{u.bio}</p>}
                    </div>
                  </Link>
                  {toggleFollow && (
                    <button
                      onClick={() => toggleFollow(u.id)}
                      className={`px-3.5 py-1 rounded-[8px] text-[11px] font-extrabold border transition-colors cursor-pointer shrink-0 ${u.isFollowing ? "border-line text-ink bg-white" : "border-coral text-coral bg-white"
                        }`}
                    >
                      {u.isFollowing ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
    </div>
  );
}
export default function DiscoveryPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted text-sm">Loading discovery...</div>}>
      <DiscoveryContent />
    </Suspense>
  );
}