"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function RightUtility() {
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trends = [
      { id: "t1", category: "Trending in Istanbul", tag: "#dogs", postCount: "4,218 posts" },
      { id: "t2", category: "Outdoor", tag: "#morningwalk", postCount: "1,020 posts" },
      { id: "t3", category: "Pets", tag: "#adoptdontshop", postCount: "860 posts" },
      { id: "t4", tag: "#dogfriendly", postCount: "2,032 posts" },
    ];
  };

  return (
    <aside className="hidden lg:block w-[300px] xl:w-[340px] p-[18px_16px] bg-[#fcfdfd] border-l border-line shrink-0 sticky top-0 h-screen overflow-y-auto">
      {/* Arama Kutusu */}
      <form onSubmit={handleSearchSubmit}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] bg-surface text-muted text-[12px] border border-transparent focus-within:border-line focus-within:bg-white transition-colors">
          <Search size={14} className="text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search Doggo"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="bg-transparent border-0 outline-none w-full text-ink placeholder:text-muted"
          />
        </div>
      </form>
      {/* Trending */}
      <div className="mt-4 p-[14px_16px] rounded-[14px] bg-surface border border-line/60">
        <h3 className="font-extrabold text-[14px] text-ink mb-3">Trends for you</h3>
        <div className="flex flex-col gap-3">
          {trends.map((t) => (
            <Link
              key={t.id}
              href={`/discovery?q=${encodeURIComponent(t.tag)}`}
              className="flex flex-col group"
            >
              {t.category && (
                <span className="text-[11px] text-muted font-medium">{t.category}</span>
              )}
              <span className="text-[13px] font-bold text-ink group-hover:text-coral transition-colors">
                {t.tag}
              </span>
              <span className="text-[11px] text-muted">{t.postCount}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}