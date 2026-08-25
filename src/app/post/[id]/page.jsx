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
  const { posts, currentUser, toggleLike, toggleBookmark, toggleRepost, addComment } = useApp();

  const post = posts.find((p) => p.id === unwrappedParams.id) || posts[0];
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  if (!post) {
    return <div className="p-8 text-center text-muted text-sm">Post not found.</div>;
  }

  // Posta ait yorumlar (AppContext'ten gelen kalıcı liste)
  const comments = post.commentsList || [];

  const handleAddMainComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText("");
  };

  const handleAddReply = (e, parentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addComment(post.id, replyText, parentId);
    setReplyText("");
    setReplyingTo(null);
  };

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
        onSubmit={handleAddMainComment}
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
        {comments.length === 0 ? (
          <div className="py-12 text-center text-muted text-[14px]">
            No replies yet. Be the first to reply!
          </div>
        ) : (
          comments
            .filter((c) => !c.parentId)
            .map((comment) => {
              const replies = comments.filter((r) => r.parentId === comment.id);

              return (
                <div key={comment.id} className="p-4 bg-white hover:bg-surface/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <Link href={`/profile/${comment.author?.id || comment.author?.handle?.replace("@", "")}`}>
                      <Avatar
                        initials={comment.author?.avatar || "DG"}
                        color={comment.author?.avatarColor || "coral"}
                        size="sm"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Link
                          href={`/profile/${comment.author?.id || comment.author?.handle?.replace("@", "")}`}
                          className="font-bold text-[13px] text-ink hover:underline truncate"
                        >
                          {comment.author?.name}
                        </Link>
                        <span className="text-[12px] text-muted truncate">
                          {comment.author?.handle}
                        </span>
                        <span className="text-[11px] text-muted shrink-0">
                          · {comment.createdAt}
                        </span>
                      </div>
                      <p className="text-[13px] text-ink leading-relaxed mb-2">
                        {comment.content}
                      </p>
                      <button
                        onClick={() =>
                          setReplyingTo(replyingTo === comment.id ? null : comment.id)
                        }
                        className="text-[12px] font-semibold text-muted hover:text-coral transition-colors cursor-pointer"
                      >
                        {replyingTo === comment.id ? "Cancel" : "Reply"}
                      </button>
                    </div>
                  </div>

                  {replyingTo === comment.id && (
                    <form
                      onSubmit={(e) => handleAddReply(e, comment.id)}
                      className="mt-3 ml-10 flex items-center gap-2 bg-surface/60 border border-line rounded-[12px] px-3 py-1"
                    >
                      <input
                        type="text"
                        autoFocus
                        placeholder={`Replying to ${comment.author?.handle}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full text-[12px] text-ink outline-none placeholder:text-muted bg-transparent py-1"
                      />
                      <button
                        type="submit"
                        disabled={!replyText.trim()}
                        className="p-1 bg-coral text-white rounded-full hover:bg-coral/90 disabled:opacity-30 transition-all cursor-pointer shrink-0"
                      >
                        <Send size={12} />
                      </button>
                    </form>
                  )}

                  {replies.length > 0 && (
                    <div className="mt-3 ml-10 pl-3 border-l-2 border-line space-y-3">
                      {replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2.5 pt-1">
                          <Link href={`/profile/${reply.author?.id || reply.author?.handle?.replace("@", "")}`}>
                            <Avatar
                              initials={reply.author?.avatar || "DG"}
                              color={reply.author?.avatarColor || "violet"}
                              size="xs"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-bold text-[12px] text-ink truncate">
                                {reply.author?.name}
                              </span>
                              <span className="text-[11px] text-muted truncate">
                                {reply.author?.handle}
                              </span>
                              <span className="text-[10px] text-muted shrink-0">
                                · {reply.createdAt}
                              </span>
                            </div>
                            <p className="text-[12px] text-ink leading-snug">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
        )}
      </div>
    </div>
  );

}