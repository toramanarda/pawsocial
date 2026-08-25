"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, Repeat2, Bookmark, Share, Send } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

export default function PostDetailPage({ params }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { posts, currentUser, toggleLike, toggleBookmark, toggleRepost } = useApp();

  const post = posts.find((p) => p.id === unwrappedParams.id) || posts[0];
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: "c1",
      author: {
        name: "Elif Fidan",
        handle: "@eliffidan",
        avatar: "EF",
        avatarColor: "peach",
      },
      content: "Kesinlikle katılıyorum! Bizimki de ilk zamanlar parkta çok heyecanlanıyordu 🐾",
      createdAt: "2h ago",
      likesCount: 3,
      isLiked: false,
    },
  ]);
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: {
        id: currentUser?.id || "u-arda",
        name: currentUser?.name || "Arda Toraman",
        handle: currentUser?.handle || "@ardatoraman",
        avatar: currentUser?.avatar || "AT",
        avatarColor: currentUser?.avatarColor || "coral",
      },
      content: commentText.trim(),
      createdAt: "Just now",
      likesCount: 0,
      isLiked: false,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  if (!post) {
    return <div className="p-8 text-center text-muted text-sm">Post not found.</div>;
  }

  return (
    <div>
      {/* Üst Geri Dön Başlığı */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line px-4 py-3 z-10 flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-surface text-ink transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-extrabold text-[16px] text-ink">Post</h1>
      </header>

      {/* Ana Post Kartı */}
      <div className="p-4 border-b border-line bg-white">
        {/* Yazar Bilgisi */}
        <div className="flex items-center justify-between mb-3">
          <Link
            href={`/profile/${post.authorId || post.author?.id || "ardatoraman"}`}
            className="flex items-center gap-3 group"
          >
            <Avatar
              initials={post.author?.avatar || "DG"}
              color={post.author?.avatarColor || "coral"}
              size="md"
            />
            <div>
              <h3 className="font-bold text-[14px] text-ink group-hover:underline leading-tight">
                {post.author?.name}
              </h3>
              <span className="text-[12px] text-muted leading-tight">
                {post.author?.handle}
              </span>
            </div>
          </Link>

          {post.category && (
            <Badge variant="category">{post.category}</Badge>
          )}
        </div>

        {/* Gönderi İçeriği */}
        <p className="text-[15px] text-ink leading-relaxed mb-3 font-normal select-text">
          {post.content}
        </p>

        {/* Etiketler */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-[13px] font-semibold text-coral">
                #{tag.replace("#", "")}
              </span>
            ))}
          </div>
        )}

        {/* Tarih Bilgisi */}
        <div className="py-2.5 border-y border-line text-[12px] text-muted">
          <span>{post.createdAt}</span> · <span>Doggo Web App</span>
        </div>

        {/* Etkileşim Butonları */}
        <div className="flex items-center justify-around pt-2 text-muted">
          <button
            onClick={() => toggleLike(post.id)}
            className={`p-2 rounded-full hover:bg-coral/10 hover:text-coral transition-colors flex items-center gap-1.5 cursor-pointer ${post.isLiked ? "text-coral" : ""
              }`}
          >
            <Heart size={18} className={post.isLiked ? "fill-coral" : ""} />
            <span className="text-[12px] font-bold">{post.likesCount || 0}</span>
          </button>

          <button
            onClick={() => toggleRepost(post.id)}
            className={`p-2 rounded-full hover:bg-green-50 hover:text-green-600 transition-colors flex items-center gap-1.5 cursor-pointer ${post.isReposted ? "text-green-600" : ""
              }`}
          >
            <Repeat2 size={18} />
            <span className="text-[12px] font-bold">{post.repostsCount || 0}</span>
          </button>

          <button
            onClick={() => toggleBookmark(post.id)}
            className={`p-2 rounded-full hover:bg-coral/10 hover:text-coral transition-colors flex items-center gap-1.5 cursor-pointer ${post.isBookmarked ? "text-coral" : ""
              }`}
          >
            <Bookmark size={18} className={post.isBookmarked ? "fill-coral" : ""} />
          </button>

          <button className="p-2 rounded-full hover:bg-surface text-muted hover:text-ink transition-colors cursor-pointer">
            <Share size={18} />
          </button>
        </div>
      </div>
      {/* Yorum Yazma Alanı */}
      <form
        onSubmit={handleAddComment}
        className="p-3 sm:p-4 border-b border-line flex items-start gap-3 bg-surface/30"
      >
        <Avatar
          initials={currentUser?.avatar || "AT"}
          color={currentUser?.avatarColor || "coral"}
          size="sm"
        />
        <div className="flex-1 flex items-center gap-2 bg-white border border-line rounded-[14px] px-3 py-1.5 focus-within:border-coral transition-colors">
          <input
            type="text"
            placeholder="Post your reply..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full text-[13px] text-ink outline-none placeholder:text-muted bg-transparent py-1"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-1.5 bg-coral text-white rounded-full hover:bg-coral/90 disabled:opacity-30 disabled:hover:bg-coral transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
      </form>

      {/* Yorumlar Listesi */}
      <div className="divide-y divide-line">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 flex items-start gap-3 bg-white hover:bg-surface/30 transition-colors"
          >
            <Link href={`/profile/${comment.author.id || comment.author.handle?.replace("@", "")}`}>
              <Avatar
                initials={comment.author.avatar}
                color={comment.author.avatarColor}
                size="sm"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link
                  href={`/profile/${comment.author.id || comment.author.handle?.replace("@", "")}`}
                  className="font-bold text-[13px] text-ink hover:underline truncate"
                >
                  {comment.author.name}
                </Link>
                <span className="text-[12px] text-muted truncate">
                  {comment.author.handle}
                </span>
                <span className="text-[11px] text-muted shrink-0">
                  · {comment.createdAt}
                </span>
              </div>
              <p className="text-[13px] text-ink leading-relaxed mb-2">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}