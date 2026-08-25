"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Sparkles, TrendingUp } from "lucide-react";
import Badge from "@/components/ui/Badge";
import PostCard from "@/components/feed/PostCard";
import { useApp } from "@/context/AppContext";

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const { posts } = useApp();

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);

  const categories = ["All", "Parks", "Walks", "Dog Care", "Events", "Adoption"];

  const discoveryItems = [
    {
      id: "d1",
      title: "Maçka Demokrasi Parkı Köpek Alanı",
      category: "Parks",
      location: "Şişli, İstanbul",
      tags: ["#mackaparki", "#dogpark"],
      stats: "1.2k check-ins this week",
      rating: "4.9 ★",
    },
    {
      id: "d2",
      title: "Caddebostan Sahil Yürüyüş Parkuru",
      category: "Walks",
      location: "Kadıköy, İstanbul",
      tags: ["#caddebostan", "#morningwalk"],
      stats: "840 walkers today",
      rating: "4.8 ★",
    },
    {
      id: "d3",
      title: "Bebek Parkı Sosyalleşme Alanı",
      category: "Parks",
      location: "Beşiktaş, İstanbul",
      tags: ["#bebekparki", "#socialdogs"],
      stats: "520 posts",
      rating: "4.7 ★",
    },
    {
      id: "d4",
      title: "Yaz Aylarında Pati Bakımı & Sıcak Asfalt Uyarısı",
      category: "Dog Care",
      location: "General Guide",
      tags: ["#pawcare", "#summercare"],
      stats: "2.4k readers",
      rating: "Tips",
    },
  ];

  const filteredItems = discoveryItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  const matchedPosts = searchTerm.trim()
    ? posts.filter((p) => {
      const cleanSearch = searchTerm.toLowerCase().replace("#", "");
      const matchContent = p.content?.toLowerCase().includes(cleanSearch);
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(cleanSearch));
      const matchCategory = p.category?.toLowerCase().includes(cleanSearch);
      return matchContent || matchTags || matchCategory;
    })
    : [];

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
        </div>

        {/* Kategori Filtreleri */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[12px] font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${activeCategory === cat
                ? "bg-coral text-white shadow-button"
                : "bg-surface text-muted hover:text-ink hover:bg-line/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>
      {/* Arama İle İlgili Gönderiler */}
      {searchTerm.trim() && matchedPosts.length > 0 && (
        <div className="border-b border-line">
          <div className="px-4 pt-3 pb-1 text-[13px] font-extrabold text-muted">
            RELATED POSTS ({matchedPosts.length})
          </div>
          <div className="divide-y divide-line">
            {matchedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
      {/* Keşfet Kartları Listesi */}
      <div className="p-4 flex flex-col gap-3">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-muted text-[14px]">
            No results found for &ldquo;{searchTerm}&rdquo;
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-[14px] bg-surface/60 border border-line hover:border-line/90 hover:bg-surface transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="category">{item.category}</Badge>
                  <span className="text-[12px] font-semibold text-coral flex items-center gap-1">
                    <Sparkles size={13} />
                    {item.rating}
                  </span>
                </div>
                <span className="text-[11px] text-muted font-medium flex items-center gap-1">
                  <TrendingUp size={12} />
                  {item.stats}
                </span>
              </div>

              <h3 className="text-[15px] font-bold text-ink group-hover:text-coral transition-colors mb-1">
                {item.title}
              </h3>

              <div className="flex items-center justify-between text-[12px] text-muted mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-muted" />
                  {item.location}
                </span>

                <div className="flex items-center gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="font-semibold text-ink/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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