"use client";

import { useState } from "react";
import { Image as ImageIcon, Smile, MapPin } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

export default function CreatePostBox({ onPostCreated }) {
  const [content, setContent] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["General", "Parks", "Walks", "Dog Care", "Tips & Tricks", "Adoption"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);

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
      category: selectedCategory,
      createdAt: "Just now",
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
    };

    if (onPostCreated) {
      onPostCreated(newPost);
    }

    setContent("");
    setSelectedCategory("General");
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

        {/* Kategori */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-line/60 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${selectedCategory === cat
                  ? "bg-coral text-white"
                  : "bg-surface text-muted hover:text-ink hover:bg-line/40"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* İkonlar ve Post Butonu */}
        <div className="flex items-center justify-between pt-2 border-t border-line/40">
          <div className="flex items-center gap-2 text-coral">
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-coral/10 transition-colors cursor-pointer"
              title="Add Image"
            >
              <ImageIcon size={18} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-coral/10 transition-colors cursor-pointer"
              title="Add Emoji"
            >
              <Smile size={18} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-coral/10 transition-colors cursor-pointer"
              title="Add Location"
            >
              <MapPin size={18} />
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}