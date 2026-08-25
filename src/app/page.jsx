"use client";

import { useState } from "react";
import CreatePostBox from "@/components/feed/CreatePostBox";
import PostCard from "@/components/feed/PostCard";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("forYou");

  const [posts, setPosts] = useState([
    {
      id: "p1",
      authorId: "u-elif",
      author: {
        name: "Elif Fidan",
        handle: "@eliffidan",
        avatar: "EF",
        avatarColor: "peach",
      },
      content: "Sabah Maçka Parkı yürüyüşünde harika dostlarla karşılaştık! 🐾 Havalar ısınırken sabah serinliğini kaçırmayın.",
      category: "Walks",
      tags: ["mackaparki", "morningwalk", "dogs"],
      createdAt: "2h ago",
      likesCount: 24,
      commentsCount: 5,
      repostsCount: 2,
    },
    {
      id: "p2",
      authorId: "u-mnuri",
      author: {
        name: "Mehmet Nuri",
        handle: "@mnuri",
        avatar: "MN",
        avatarColor: "violet",
      },
      content: "Yavru köpeklerde temel itaat eğitimi için ilk 3 ay çok kritik. Sabır ve bolca ödül maması işin sırrı!",
      category: "Tips & Tricks",
      tags: ["dogtraining", "puppylife"],
      createdAt: "4h ago",
      likesCount: 42,
      commentsCount: 11,
      repostsCount: 6,
    },
  ]);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div>
      {/* Üst Başlık ve Sekmeler */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line z-10">
        <div className="flex border-b border-line">
          <button
            onClick={() => setActiveTab("forYou")}
            className="flex-1 py-3 text-center font-bold text-[14px] relative transition-colors cursor-pointer"
          >
            <span className={activeTab === "forYou" ? "text-ink" : "text-muted"}>
              For you
            </span>
            {activeTab === "forYou" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-coral rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("following")}
            className="flex-1 py-3 text-center font-bold text-[14px] relative transition-colors cursor-pointer"
          >
            <span className={activeTab === "following" ? "text-ink" : "text-muted"}>
              Following
            </span>
            {activeTab === "following" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-coral rounded-full" />
            )}
          </button>
        </div>
      </header>

      {/* Post Oluşturma */}
      <CreatePostBox onPostCreated={handleNewPost} />

      {/* Gönderi Akışı Listesi */}
      <div className="divide-y divide-line">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}