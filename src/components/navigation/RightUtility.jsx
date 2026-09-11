"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { useApp } from "@/context/AppContext";

export default function RightUtility() {
  const router = useRouter();
  const { users, toggleFollow, posts = [] } = useApp();
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/discovery?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };
  const tagCounts = {};
  posts.forEach((p) => {
    // 1. tags dizisi
    if (Array.isArray(p.tags)) {
      p.tags.forEach((tag) => {
        const clean = tag.replace("#", "").trim();
        if (clean) tagCounts[clean] = (tagCounts[clean] || 0) + 1;
      });
    }
    // 2. Metin içerisindeki #etiketler
    if (p.content) {
      const matches = p.content.match(/#[\wığüşöçİĞÜŞÖÇ]+/g) || [];
      matches.forEach((t) => {
        const clean = t.replace("#", "").trim();
        if (clean && !p.tags?.includes(clean)) {
          tagCounts[clean] = (tagCounts[clean] || 0) + 1;
        }
      });
    }
    // 3. Category etiketi
    if (p.category && !tagCounts[p.category]) {
      tagCounts[p.category] = (tagCounts[p.category] || 0) + 1;
    }
  });

  const sampleLocations = ["Trending in Istanbul", "Outdoor", "Pets", "Breeds", "Care"];
  const trends = Object.entries(tagCounts)
    .map(([tag, count], idx) => ({
      id: `trend-${idx}`,
      category: sampleLocations[idx % sampleLocations.length],
      tag: `#${tag}`,
      postCount: `${count.toLocaleString()} post${count > 1 ? "s" : ""}`,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
  const suggestedUsers = users.filter((u) => u.id !== "u-arda").slice(0, 4);

  return (
    <aside className="hidden lg:block w-[300px] xl:w-[340px] p-[18px_16px] bg-[#fcfdfd] border-l border-line shrink-0 sticky top-0 h-screen overflow-y-auto">
      {/* Arama Kutusu */}
      <form onSubmit={handleSearchSubmit}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] bg-surface text-muted text-[12px] border border-transparent focus-within:border-line focus-within:bg-white transition-colors">
          <Search size={14} className="text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search PawSocial"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="bg-transparent border-0 outline-none w-full text-ink placeholder:text-muted"
          />
        </div>
      </form>
      {/* Trending */}
      <div className="mt-4 p-[14px_16px] rounded-[14px] bg-white border border-line">
        <h3 className="font-extrabold text-[14px] text-ink mb-2.5">Trending topics</h3>
        <div className="divide-y divide-line">
          {trends.length === 0 ? (
            <p className="text-[12px] text-muted py-2">No trending tags yet.</p>
          ) : (
            trends.map((t) => (
              <div key={t.id} className="py-2 flex items-center justify-between first:pt-0 last:pb-0">
                <Link
                  href={`/discovery?q=${encodeURIComponent(t.tag)}`}
                  className="flex flex-col group min-w-0 flex-1"
                >
                  <span className="text-[11px] text-muted">{t.category}</span>
                  <span className="text-[13px] font-bold text-ink group-hover:text-coral transition-colors truncate">
                    {t.tag}
                  </span>
                  <span className="text-[11px] text-muted">{t.postCount}</span>
                </Link>
                <span className="text-muted text-[12px] tracking-[2px] font-bold cursor-pointer select-none pl-2">•••</span>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Who to follow */}
      <div className="mt-4 p-[14px_16px] rounded-[14px] bg-white border border-line">
        <h3 className="font-extrabold text-[14px] text-ink mb-3">Who to follow</h3>
        <div className="flex flex-col gap-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-2">
              <Link href={`/profile/${user.id}`} className="flex items-center gap-2 min-w-0 group">
                <Avatar initials={user.avatar} color={user.avatarColor} size="sm" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-ink truncate group-hover:underline">
                    {user.name}
                  </span>
                  <span className="text-[11px] text-muted truncate">{user.handle}</span>
                </div>
              </Link>
              <button
                onClick={() => toggleFollow(user.id)}
                className={`px-3 py-1 rounded-[8px] text-[11px] font-extrabold border transition-colors shrink-0 cursor-pointer ${user.isFollowing
                    ? "border-line text-ink bg-white hover:border-red-300 hover:text-red-500"
                    : "border-coral text-coral bg-white hover:bg-coral hover:text-white"
                  }`}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}