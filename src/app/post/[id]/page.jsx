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

  if (!post) {
    return <div className="p-8 text-center text-muted text-sm">Post not found.</div>;
  }

}