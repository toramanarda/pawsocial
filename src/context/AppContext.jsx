"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { initialPosts, initialUsers, initialTrends, initialNotifications } from "@/data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);
  const [users, setUsers] = useState(initialUsers);
  const [notifications, setNotifications] = useState(initialNotifications || []);
  const defaultCurrentUser = {
    id: "u-arda",
    name: "Arda Toraman",
    handle: "@ardatoraman",
    avatar: "AT",
    avatarColor: "coral",
    bio: "Golden Retriever & Samoyed dad 🐕 Full-stack software developer exploring pet tech & local dog parks in Istanbul 🐾",
    location: "Istanbul, Turkey",
    joinedDate: "Joined March 2024",
  };

  const [currentUser, setCurrentUser] = useState(defaultCurrentUser);
  const [activeCategory, setActiveCategory] = useState("all");
  const [feedTab, setFeedTab] = useState("for-you");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem("doggo_posts");
      const savedUsers = localStorage.getItem("doggo_users");
      const savedNotifications = localStorage.getItem("doggo_notifications");
      const savedCurrentUser = localStorage.getItem("doggo_current_user");
      if (savedPosts) setPosts(JSON.parse(savedPosts));
      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
      if (savedCurrentUser) setCurrentUser(JSON.parse(savedCurrentUser));
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
      localStorage.setItem("doggo_notifications", JSON.stringify(notifications));
      localStorage.setItem("doggo_current_user", JSON.stringify(currentUser));
    } catch (e) {
      console.error("LocalStorage save error:", e);
    }
  }, [posts, users, isLoaded, notifications, currentUser]);

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
        id: "u-arda",
        name: "Arda Toraman",
        handle: "@ardatoraman",
        avatar: "AT",
        avatarColor: "coral",
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

  const toggleCommentLike = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedComments = (post.commentsList || []).map((comment) => {
            if (comment.id === commentId) {
              const isLiked = !comment.isLiked;
              return {
                ...comment,
                isLiked,
                likesCount: (comment.likesCount || 0) + (isLiked ? 1 : -1),
              };
            }
            return comment;
          });
          return { ...post, commentsList: updatedComments };
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
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      reposts: 0,
      isLiked: false,
      isBookmarked: false,
      isReposted: false,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  // Post Düzenleme
  const editPost = (postId, newContent) => {
    setPosts((prev) => {
      const updated = prev.map((p) =>
        String(p.id) === String(postId)
          ? {
            ...p,
            content: newContent,
            isEdited: true,
          }
          : p
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("doggo_posts", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Post Silme
  const deletePost = (postId) => {
    setPosts((prev) => {
      const updated = prev.filter((p) => String(p.id) !== String(postId));
      if (typeof window !== "undefined") {
        localStorage.setItem("doggo_posts", JSON.stringify(updated));
      }
      return updated;
    });
  };
  const toggleFollow = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
      )
    );
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, isRead: true, read: true } : n
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("doggo_notifications", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, isRead: true, read: true }));
      if (typeof window !== "undefined") {
        localStorage.setItem("doggo_notifications", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead && !n.read).length;
  const updateCurrentUser = (updatedData) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...updatedData };
      if (typeof window !== "undefined") {
        localStorage.setItem("doggo_current_user", JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        users,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        activeCategory,
        currentUser,
        updateCurrentUser,
        setActiveCategory,
        feedTab,
        setFeedTab,
        searchQuery,
        setSearchQuery,
        toggleLike,
        toggleBookmark,
        toggleRepost,
        addPost,
        deletePost,
        editPost,
        toggleFollow,
        addComment,
        toggleCommentLike,
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