"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function CreatePostBox({ onPostCreated }) {
  const { addPost } = useApp();
  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const typedTags = (content.match(/#[\wığüşöçİĞÜŞÖÇ]+/g) || []).map((t) =>
      t.replace("#", "")
    );
    const finalTags = Array.from(new Set([selectedCategory, ...typedTags]));
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
      createdAt: new Date().toISOString(),
      tags: finalTags,
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

    setContent("");
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