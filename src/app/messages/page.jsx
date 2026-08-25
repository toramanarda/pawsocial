"use client";

import { useState } from "react";
import { Search, SquarePen } from "lucide-react";

export default function MessagesPage() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <div className="h-[calc(100vh-60px)] md:h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Sohbet Listesi */}
      <div className="w-full md:w-[320px] lg:w-[360px] border-r border-line flex flex-col shrink-0 h-full">
        {/* Üst Başlık & Yeni Mesaj Butonu */}
        <div className="p-3.5 border-b border-line flex items-center justify-between">
          <h1 className="font-extrabold text-[16px] text-ink">Messages</h1>
          <button
            className="p-2 rounded-full hover:bg-surface text-ink transition-colors cursor-pointer"
            title="New message"
          >
            <SquarePen size={18} />
          </button>
        </div>

        {/* Mesaj İçi Arama */}
        <div className="p-2.5 border-b border-line">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-surface text-muted text-[12px] border border-transparent focus-within:border-line focus-within:bg-white transition-colors">
            <Search size={14} className="shrink-0" />
            <input
              type="text"
              placeholder="Search Direct Messages"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-transparent border-0 outline-none w-full text-ink placeholder:text-muted"
            />
          </div>
        </div>
      </div>
    </div>
  );
}