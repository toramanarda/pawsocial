"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import PostCard from "@/components/feed/PostCard";

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
  const [activeProfileTab, setActiveProfileTab] = useState("posts");

  const profileTabs = [
    { id: "posts", label: "Posts" },
    { id: "media", label: "Media" },
    { id: "likes", label: "Likes" },
  ];

  const userPosts = [
    {
      id: "up-1",
      authorId: user.id,
      author: {
        name: user.name,
        handle: user.handle,
        avatar: user.avatar,
        avatarColor: user.avatarColor,
      },
      content: "Caddebostan sahilinde hafta sonu köpek buluşması organize ediyoruz. Katılmak isteyenler yoruma pati bıraksın! 🐾🐕",
      category: "Events",
      tags: ["caddebostan", "dogmeetup", "istanbul"],
      createdAt: "1d ago",
      likesCount: 56,
      commentsCount: 14,
      repostsCount: 8,
    },
    {
      id: "up-2",
      authorId: user.id,
      author: {
        name: user.name,
        handle: user.handle,
        avatar: user.avatar,
        avatarColor: user.avatarColor,
      },
      content: "Köpeklerde tüy dökülme döneminde beslenmeye omega-3 takviyesi eklemek inanılmaz fark yaratıyor.",
      category: "Dog Care",
      tags: ["dogcare", "nutrition"],
      createdAt: "3d ago",
      likesCount: 38,
      commentsCount: 6,
      repostsCount: 4,
    },
  ];

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
      {/* Kapak / Banner */}
      <div className="h-32 sm:h-44 bg-gradient-to-r from-coral/20 via-coral/10 to-surface border-b border-line" />

      {/* Profil Detayları */}
      <div className="px-4 pb-4">
        {/* Avatar ve Düzenle Butonu */}
        <div className="flex items-end justify-between -mt-10 sm:-mt-12 mb-3">
          <div className="ring-4 ring-white rounded-full bg-white">
            <Avatar initials={user.avatar} color={user.avatarColor} size="lg" />
          </div>
          <Button variant="secondary" size="sm">
            Edit Profile
          </Button>
        </div>

        {/* İsim ve Handle */}
        <div className="mb-3">
          <h2 className="font-extrabold text-[18px] text-ink">{user.name}</h2>
          <span className="text-[13px] text-muted">{user.handle}</span>
        </div>

        {/* Biyografi */}
        <p className="text-[14px] text-ink leading-relaxed mb-3">{user.bio}</p>

        {/* Konum & Katılma Tarihi */}
        <div className="flex items-center gap-4 text-[12px] text-muted mb-3 flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {user.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {user.joinedDate}
          </span>
        </div>

        {/* Takipçi Sayaçları */}
        <div className="flex items-center gap-4 text-[13px]">
          <div className="flex items-center gap-1">
            <span className="font-bold text-ink">{user.followingCount}</span>
            <span className="text-muted">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-ink">{user.followersCount}</span>
            <span className="text-muted">Followers</span>
          </div>
        </div>
      </div>
      {/* Profil Sekmeleri */}
      <div className="flex border-b border-line mt-2">
        {profileTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveProfileTab(tab.id)}
            className="flex-1 py-3 text-center font-bold text-[13px] relative transition-colors cursor-pointer"
          >
            <span
              className={
                activeProfileTab === tab.id ? "text-ink" : "text-muted"
              }
            >
              {tab.label}
            </span>
            {activeProfileTab === tab.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-coral rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Kullanıcının Gönderi Akışı */}
      <div className="divide-y divide-line">
        {activeProfileTab === "posts" ? (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="py-12 text-center text-muted text-[14px]">
            No content in {activeProfileTab} yet.
          </div>
        )}
      </div>
    </div>
  );
}