"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";

export default function CreatePostBox({ onPostCreated }) {
  const [content, setContent] = useState("");

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
      </div>
    </div>
  );
}