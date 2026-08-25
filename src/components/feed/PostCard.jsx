"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Image from "next/image";
import { Heart, MessageCircle, Repeat2, Bookmark } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

export default function PostCard({ post }) {
  const { toggleLike, toggleBookmark, toggleRepost } = useApp();
  if (!post) return null;

  const authorId = post.authorId || post.author?.id || "u-arda";
  const likesCount = post.likesCount ?? post.likes ?? 0;
  const commentsCount = post.commentsCount ?? post.comments ?? 0;
  const repostsCount = post.repostsCount ?? post.reposts ?? 0;

  return (
    <article className="p-[14px_18px_16px] border-b border-line bg-white hover:bg-surface/30 transition-colors">
      {/* Üst Alan: Yazar ve Kategori Bilgisi */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link href={`/profile/${authorId}`}>
            <Avatar
              initials={post.author?.avatar || "DG"}
              color={post.author?.avatarColor || "peach"}
              size="md"
            />
          </Link>
          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={`/profile/${authorId}`}
                className="font-bold text-[14px] text-ink hover:underline truncate"
              >
                {post.author?.name || "Anonymous Doggo"}
              </Link>
              <span className="text-[12px] text-muted truncate">
                {post.author?.handle || "@doggo"}
              </span>
              <span className="text-muted text-[12px]">•</span>
              <span className="text-[12px] text-muted shrink-0">
                {post.createdAt || "Just now"}
              </span>
            </div>
          </div>
        </div>

        {/* Kategori Rozeti */}
        {post.category && (
          <Badge variant="category">{post.category}</Badge>
        )}
      </div>
      {/* 2. Gönderi Metni ve Etiketler */}
      <div className="text-[14px] text-ink leading-relaxed whitespace-pre-line mb-3">
        <Link href={`/post/${post.id}`} className="block hover:opacity-90 transition-opacity">
          {post.content}
        </Link>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map((tag, idx) => (
              <Link
                key={idx}
                href={`/discovery?q=${encodeURIComponent(tag.replace("#", ""))}`}
                className="text-[13px] font-semibold text-coral hover:underline cursor-pointer">
                {tag.startsWith("#") ? tag : `#${tag}`}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 3. Gönderi Görseli */}
      {
        post.image && (
          <div className="relative w-full h-[280px] sm:h-[320px] rounded-[14px] overflow-hidden mb-3 border border-line/60 bg-surface">
            <Image
              src={post.image}
              alt="Post attachment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        )
      }
      {/* Etkileşim Butonları */}
      <div className="flex items-center justify-between text-muted text-[13px] pt-1 max-w-[420px]">
        {/* Yorum Butonu */}
        <Link
          href={`/post/${post.id}`}
          className="flex items-center gap-1.5 hover:text-coral transition-colors cursor-pointer group"
        >
          <span className="p-1.5 rounded-full group-hover:bg-coral/10 transition-colors">
            <MessageCircle size={16} />
          </span>
          <span>{commentsCount}</span>
        </Link>
        {/* Repost Butonu */}
        <button onClick={() => toggleRepost(post.id)} className="flex items-center gap-1.5 hover:text-green-600 transition-colors cursor-pointer group ">
          <span className="p-1.5 rounded-full group-hover:bg-green-500/10 transition-colors">
            <Repeat2 size={17} />
          </span>
          <span>{repostsCount ?? 0}</span>
        </button>

        {/* Beğeni Butonu */}
        <button
          onClick={() => toggleLike(post.id)}
          className={`flex items-center gap-1.5 transition-colors cursor-pointer group ${post.isLiked ? "text-coral font-bold" : "hover:text-coral"
            }`}
        >
          <span className="p-1.5 rounded-full group-hover:bg-coral/10 transition-colors">
            <Heart
              size={16}
              className={post.isLiked ? "fill-coral text-coral" : ""}
            />
          </span>
          <span>{likesCount}</span>
        </button>

        {/* Kaydet Butonu */}
        <button
          onClick={() => toggleBookmark(post.id)}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${post.isBookmarked ? "text-coral bg-coral/10" : "hover:bg-surface hover:text-ink"
            }`}
        >
          <Bookmark
            size={16}
            className={post.isBookmarked ? "fill-coral text-coral" : ""}
          />
        </button>
      </div>
    </article >
  );
}