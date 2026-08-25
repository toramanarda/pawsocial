"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

export default function ProfilePage({ params }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const user = {
    id: unwrappedParams.id || "u-arda",
    name: "Arda Toraman",
    handle: `@${unwrappedParams.id || "ardatoraman"}`,
    avatar: "AT",
    avatarColor: "coral",
    bio: "Golden Retriever & Samoyed dad 🐕 Full-stack software developer exploring pet tech & local dog parks in Istanbul 🐾",
    location: "Istanbul, Turkey",
    joinedDate: "Joined March 2024",
    followingCount: 142,
    followersCount: 890,
  };

  return (
    <div>
      {/* Geri Dön Başlığı */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line px-4 py-2.5 z-10 flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-surface text-ink transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-extrabold text-[16px] text-ink leading-tight">
            Profile
          </h1>
          <span className="text-[12px] text-muted">@{unwrappedParams.id}</span>
        </div>
      </header>
    </div>
  );
}