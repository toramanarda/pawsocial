"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, X, Hash } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function CreatePostBox({ onPostCreated }) {
  const { addPost } = useApp();
  const [content, setContent] = useState("");

  const [mediaPreview, setMediaPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const MAX_CHARS = 280;
  const charsCount = content.length;
  const isOverLimit = charsCount > MAX_CHARS;

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMediaPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddTopic = () => {
    setContent((prev) => (prev ? `${prev} #` : "#"));
    textareaRef.current?.focus();
  };

  const handleCancel = () => {
    setContent("");
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!content.trim() && !mediaPreview) || isSubmitting || isOverLimit) return;

    setIsSubmitting(true);

    const typedTags = (content.match(/#[\wığüşöçİĞÜŞÖÇ]+/g) || []).map((t) =>
      t.replace("#", "")
    );
    const newPost = {
      id: `p-${Date.now()}`,
      authorId: "u-arda",
      author: {
        name: "Arda Toraman",
        handle: "@ardatoraman",
        avatar: "AT",
        avatarColor: "coral",
      },
      content: content.trim(),
      tags: typedTags,
      image: mediaPreview,
      media: mediaPreview,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
      commentsList: [],

    };

    if (addPost) {
      addPost(newPost);
    }
    if (onPostCreated) {
      onPostCreated(newPost);
    }

    handleCancel();
    setIsSubmitting(false);
  };

  return (
    <div className="p-[14px_16px] border-b border-line bg-white flex gap-3">
      {/* Profil Avatarı */}
      <Avatar initials="AT" color="coral" size="md" />

      {/* Yazı Alanı */}
      <div className="flex-1 flex flex-col min-w-0">
        <textarea
          placeholder="What's happening in the dog park today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full bg-transparent border-0 outline-none text-[15px] text-ink placeholder:text-muted resize-none leading-relaxed"
        />
        {mediaPreview && (
          <div className="relative my-2 rounded-2xl overflow-hidden border border-line bg-surface max-h-[300px]">
            <img
              src={mediaPreview}
              alt="Uploaded preview"
              className="w-full h-auto max-h-[300px] object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setMediaPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute top-2 right-2 p-1.5 bg-ink/70 hover:bg-ink text-white rounded-full transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* İkonlar ve Post Butonu */}
        <div className="flex items-center justify-between pt-2 border-t border-line/40">
          <div className="flex items-center gap-1 text-coral">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-full hover:bg-coral/10 transition-colors cursor-pointer flex items-center gap-1"
              title="Add Image"
            >
              <ImageIcon size={18} />
            </button>

            <button
              type="button"
              onClick={handleAddTopic}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold text-muted hover:text-coral hover:bg-coral/10 transition-colors cursor-pointer"
            >
              <Hash size={14} />
              <span>Add topic</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-[12px] tabular-nums font-medium ${
                isOverLimit ? "text-red-500 font-bold" : "text-muted"
              }`}
            >
              {charsCount} / {MAX_CHARS}
            </span>

            {(content || mediaPreview) && (
              <button
                type="button"
                onClick={handleCancel}
                className="text-[13px] font-semibold text-muted hover:text-ink px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={(!content.trim() && !mediaPreview) || isSubmitting || isOverLimit}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}