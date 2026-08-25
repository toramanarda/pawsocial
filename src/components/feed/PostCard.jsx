"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Image from "next/image";
import { Heart, MessageCircle, Repeat2, Bookmark } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function PostCard({ post }) {
  if (!post) return null;

  return (
    <article className="p-[14px_18px_16px] border-b border-line bg-white hover:bg-surface/30 transition-colors">
      {/* Üst Alan: Yazar ve Kategori Bilgisi */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link href={`/profile/${post.authorId || post.author?.id || "u-demo"}`}>
            <Avatar
              initials={post.author?.avatar || "DG"}
              color={post.author?.avatarColor || "peach"}
              size="md"
            />
          </Link>
          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={`/profile/${post.authorId || post.author?.id || "u-demo"}`}
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
        {post.content}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-[13px] font-semibold text-coral hover:underline cursor-pointer">
                {tag.startsWith("#") ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Gönderi Görseli */}
      {post.image && (
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-[14px] overflow-hidden mb-3 border border-line/60 bg-surface">
          <Image
            src={post.image}
            alt="Post attachment"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}
    </article>
  );
}