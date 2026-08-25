"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { initialPosts, initialUsers, initialTrends } from "@/data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);
  const [users, setUsers] = useState(initialUsers);
  const [activeCategory, setActiveCategory] = useState("all");
  const [feedTab, setFeedTab] = useState("for-you");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem("doggo_posts");
      const savedUsers = localStorage.getItem("doggo_users");
      if (savedPosts) setPosts(JSON.parse(savedPosts));
      if (savedUsers) setUsers(JSON.parse(savedUsers));
    } catch (e) {
      console.error("LocalStorage load error:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("doggo_posts", JSON.stringify(posts));
      localStorage.setItem("doggo_users", JSON.stringify(users));
    } catch (e) {
      console.error("LocalStorage save error:", e);
    }
  }, [posts, users, isLoaded]);

  // Post Beğenme
  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = p.isLiked;
          return {
            ...p,
            isLiked: !isLiked,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };
  const addComment = (postId, commentText, parentCommentId = null) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      parentId: parentCommentId,
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

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const currentComments = post.commentsList || [];
          return {
            ...post,
            commentsCount: (post.commentsCount || 0) + 1,
            commentsList: [newComment, ...currentComments],
          };
        }
        return post;
      })
    );
  };

  // Post Kaydetme 
  const toggleBookmark = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
    );
  };

  // Repost 
  const toggleRepost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isReposted = p.isReposted;
          return {
            ...p,
            isReposted: !isReposted,
            reposts: isReposted ? p.reposts - 1 : p.reposts + 1,
          };
        }
        return p;
      })
    );
  };

  // Yeni Post Ekleme
  const addPost = (newPostData) => {
    const newPost = {
      id: `p-${Date.now()}`,
      author: {
        id: "u-arda",
        name: "Arda Toraman",
        handle: "@ardatoraman",
        avatar: "AT",
        avatarColor: "coral",
      },
      content: newPostData.content,
      category: newPostData.category || "General",
      image: newPostData.image || null,
      location: newPostData.location || null,
      createdAt: "Just now",
      likes: 0,
      comments: 0,
      reposts: 0,
      isLiked: false,
      isBookmarked: false,
      isReposted: false,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  // Kullanıcı Takip Et / Bırak
  const toggleFollow = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        users,
        activeCategory,
        setActiveCategory,
        feedTab,
        setFeedTab,
        searchQuery,
        setSearchQuery,
        toggleLike,
        toggleBookmark,
        toggleRepost,
        addPost,
        toggleFollow,
        addComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}