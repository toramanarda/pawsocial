"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function RightUtility() {
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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
    </aside>
  );
}