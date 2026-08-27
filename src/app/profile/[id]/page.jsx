"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, X } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import PostCard from "@/components/feed/PostCard";
import { useApp } from "@/context/AppContext";

export default function ProfilePage({ params }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { posts, users, currentUser, toggleFollow, updateCurrentUser } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    bio: "",
    location: "",
  });

  const handleOpenEditModal = () => {
    setEditFormData({
      name: user.name,
      bio: user.bio,
      location: user.location,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (updateCurrentUser) {
      updateCurrentUser(editFormData);
    }
    setIsEditModalOpen(false);
  };

  const profileId = unwrappedParams.id || "u-arda";
  const isOwnProfile = profileId === (currentUser?.id || "u-arda") || profileId === (currentUser?.handle?.replace("@", "") || "ardatoraman");

  // Kullanıcıyı bul veya varsayılan olarak currentUser'ı al
  const matchedUser = users.find(
    (u) => u.id === profileId || u.handle === `@${profileId}` || u.handle === profileId
  );

  const user = isOwnProfile
    ? {
      id: currentUser?.id || "u-arda",
      name: currentUser?.name || "Arda Toraman",
      handle: currentUser?.handle || "@ardatoraman",
      avatar: currentUser?.avatar || "AT",
      avatarColor: currentUser?.avatarColor || "coral",
      bio: currentUser?.bio ?? "Golden Retriever & Samoyed dad 🐕 ",
      location: currentUser?.location ?? "Istanbul, Turkey",
      joinedDate: "Joined March 2024",
      followingCount: users.filter((u) => u.isFollowing).length,
      followersCount: 890,
    }
    : {
      id: matchedUser?.id || profileId,
      name: matchedUser?.name || profileId,
      handle: matchedUser?.handle || `@${profileId}`,
      avatar: matchedUser?.avatar || profileId.slice(0, 2).toUpperCase(),
      avatarColor: matchedUser?.avatarColor || "blue",
      bio: matchedUser?.bio || "Pati sever Doggo kullanıcısı 🐾",
      location: matchedUser?.location || "Istanbul, Turkey",
      joinedDate: "Joined 2024",
      followingCount: 45,
      followersCount: matchedUser?.isFollowing ? 121 : 120,
      isFollowing: matchedUser?.isFollowing || false,
    };
  const [activeProfileTab, setActiveProfileTab] = useState("posts");

  const profileTabs = [
    { id: "posts", label: "Posts" },
    { id: "media", label: "Media" },
    { id: "likes", label: "Likes" },
  ];

  const userPosts = posts.filter((p) => {
    const isAuthor = p.author?.id === user.id || p.authorId === user.id;
    if (activeProfileTab === "posts") return isAuthor;
    if (activeProfileTab === "media") return isAuthor && p.image;
    if (activeProfileTab === "likes") return p.isLiked;
    return false;
  });

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
          <span className="text-[12px] text-muted">{user.handle}</span>
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
          {isOwnProfile ? (
            <Button
              type="button"
              onClick={handleOpenEditModal}
              className="px-3.5 py-1.5 rounded-[8px] text-[13px] font-bold border border-coral !text-coral !bg-white hover:!bg-coral hover:!text-white transition-colors cursor-pointer"
              style={{ color: "var(--color-coral, #ff6a3d)" }}
            >
              Edit Profile
            </Button>
          ) : (
            <button
              onClick={() => toggleFollow(user.id)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${user.isFollowing
                ? "bg-surface border border-line text-ink hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                : "bg-ink text-white hover:bg-ink/85"
                }`}
            >
              {user.isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>

        {/* İsim ve Handle */}
        <div className="mb-3">
          <h2 suppressHydrationWarning className="font-extrabold text-[18px] text-ink">{user.name}</h2>
          <span className="text-[13px] text-muted">{user.handle}</span>
        </div>

        {/* Biyografi */}
        <p suppressHydrationWarning className="text-[14px] text-ink leading-relaxed mb-3">{user.bio}</p>

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
        {userPosts.length === 0 ? (
          <div className="py-12 text-center text-muted text-[14px]">
            No {activeProfileTab} yet.
          </div>
        ) : (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
      {
        isEditModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-[16px] w-full max-w-[480px] p-5 shadow-xl border border-line">
              <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
                <h3 className="font-extrabold text-[16px] text-ink">Edit Profile</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-full text-muted hover:text-ink hover:bg-surface cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-ink mb-1">Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-[10px] border border-line bg-surface text-[13px] text-ink outline-none focus:border-coral focus:bg-white transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-ink mb-1">Bio</label>
                  <textarea
                    rows={3}
                    value={editFormData.bio}
                    onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-[10px] border border-line bg-surface text-[13px] text-ink outline-none focus:border-coral focus:bg-white transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-ink mb-1">Location</label>
                  <input
                    type="text"
                    value={editFormData.location}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-[10px] border border-line bg-surface text-[13px] text-ink outline-none focus:border-coral focus:bg-white transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 rounded-[10px] text-[13px] font-bold text-muted hover:text-ink cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-[10px] text-[13px] font-bold bg-coral text-white hover:brightness-95 cursor-pointer shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div >
  );
}