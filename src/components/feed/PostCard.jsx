"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { Heart, MessageCircle, Repeat2, Bookmark, MoreHorizontal, Edit2, Trash2, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

function formatRelativeTime(dateString) {
  if (!dateString) return "· 2h";
  if (typeof dateString === "string" && (dateString.startsWith("·") || dateString.includes("ago") || dateString.includes("h") || dateString.includes("m") || dateString.includes("d"))) {
    return dateString.startsWith("·") ? dateString : `· ${dateString}`;
  }
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (isNaN(diffInSeconds) || diffInSeconds < 0) return `· ${dateString}`;
  if (diffInSeconds < 60) return "· just now";
  if (diffInSeconds < 3600) return `· ${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `· ${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `· ${Math.floor(diffInSeconds / 86400)}d`;
  return `· ${Math.floor(diffInSeconds / 604800)}w`;
}

export default function PostCard({ post }) {
  const { toggleLike, toggleBookmark, toggleRepost, deletePost, editPost, currentUser } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post?.content || "");
  if (!post) return null;

  const authorId = post.authorId || post.author?.id || "u-arda";
  const isOwnPost = authorId === (currentUser?.id || "u-arda") || post.author?.handle === currentUser?.handle;
  const handleSaveEdit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!editContent || !editContent.trim()) return;
    if (editPost) {
      editPost(post.id, editContent.trim());
    }
    setIsEditing(false);
    setShowMenu(false);
  };

  const handleDelete = (e) => {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (deletePost) {
        deletePost(post.id);
      }
    }
    setShowMenu(false);
  };
  const likesCount = post.likesCount ?? post.likes ?? 0;
  const commentsCount = post.commentsCount ?? post.comments ?? 0;
  const repostsCount = post.repostsCount ?? post.reposts ?? 0;

  return (
    <>
      <article className="p-[14px_18px_16px] border-b border-line bg-white hover:bg-surface/30 transition-colors">
        {/* Yazar ve Kategori Bilgisi */}
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
                <time className="text-[12px] text-muted shrink-0">
                  {formatRelativeTime(post.createdAt || post.timestamp)}
                </time>
                {post.isEdited && (
                  <span className="text-[11px] text-muted italic">(edited)</span>
                )}
              </div>
            </div>
          </div>

          {/* 3 Nokta Menüsü */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-full hover:bg-surface text-muted hover:text-ink transition-colors cursor-pointer"
            >
              <MoreHorizontal size={17} />
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-7 w-36 bg-white rounded-[10px] shadow-lg border border-line py-1 z-30 flex flex-col">
                  {isOwnPost ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditContent(post.content);
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-semibold text-ink hover:bg-surface text-left cursor-pointer"
                      >
                        <Edit2 size={13} />
                        Edit post
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-semibold text-red-600 hover:bg-red-50 text-left cursor-pointer"
                      >
                        <Trash2 size={13} />
                        Delete post
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-semibold text-muted hover:bg-surface text-left cursor-pointer"
                    >
                      Not interested
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
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

        {/* Gönderi Görseli */}
        {(post.image || post.media) && (
          <div className="relative w-full h-[280px] sm:h-[320px] rounded-[14px] overflow-hidden mb-3 border border-line/60 bg-surface">
            <img
              src={post.image || post.media}
              alt="Post attachment"
              className="w-full h-full object-cover block"
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
      {
        isEditing && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-[16px] w-full max-w-[480px] p-5 shadow-xl border border-line">
              <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
                <h3 className="font-extrabold text-[16px] text-ink">Edit Post</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full text-muted hover:text-ink hover:bg-surface cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                <textarea
                  rows={4}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-[10px] border border-line bg-surface text-[14px] text-ink outline-none focus:border-coral focus:bg-white transition-colors resize-none"
                  placeholder="What's happening?"
                  required
                />

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 rounded-[10px] text-[13px] font-bold text-muted hover:text-ink cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="px-5 py-2 rounded-[10px] text-[13px] font-bold bg-coral text-white hover:brightness-95 cursor-pointer shadow-sm"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
}