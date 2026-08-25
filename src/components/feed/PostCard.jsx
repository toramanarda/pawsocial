"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
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
    </article>
  );
}