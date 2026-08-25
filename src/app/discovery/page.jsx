"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function DiscoveryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Parks", "Walks", "Dog Care", "Events", "Adoption"];

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
              className={`text-[12px] font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? "bg-coral text-white shadow-button"
                  : "bg-surface text-muted hover:text-ink hover:bg-line/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}