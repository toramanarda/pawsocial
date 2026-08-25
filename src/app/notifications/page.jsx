"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { Heart, MessageCircle, UserPlus, Sparkles } from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "mentions", label: "Mentions" },
    { id: "likes", label: "Likes" },
  ];

  return (
    <div>
      {/* Üst Başlık ve Sekmeler */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line z-10">
        <div className="p-3">
          <h1 className="font-extrabold text-[16px] text-ink">Notifications</h1>
        </div>
        <div className="flex border-t border-line">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-3 text-center font-bold text-[13px] relative transition-colors cursor-pointer"
            >
              <span className={activeTab === tab.id ? "text-ink" : "text-muted"}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-coral rounded-full" />
              )}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}