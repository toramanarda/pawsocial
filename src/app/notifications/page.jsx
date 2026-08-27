"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { Heart, MessageCircle, UserPlus, Sparkles, CheckCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function NotificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();

const handleNotificationClick = (notif) => {
    if (markNotificationAsRead) {
      markNotificationAsRead(notif.id);
    }

    const targetPostId = notif.postId || notif.targetPostId || (notif.type === "like" || notif.type === "mention" ? 1 : null);
    
    if (notif.type === "follow") {
      const targetUserId = notif.user?.id || notif.user?.handle?.replace("@", "") || notif.userId;
      if (targetUserId) {
        router.push(`/profile/${targetUserId}`);
        return;
      }
    }

    if (targetPostId) {
      router.push(`/post/${targetPostId}`);
      return;
    }

    const targetUserId = notif.user?.id || notif.user?.handle?.replace("@", "") || notif.userId;
    if (targetUserId) {
      router.push(`/profile/${targetUserId}`);
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === "mentions") return item.type === "mention";
    if (activeTab === "likes") return item.type === "like";
    return true;
  });

  const tabs = [
    { id: "all", label: "All" },
    { id: "mentions", label: "Mentions" },
    { id: "likes", label: "Likes" },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="text-coral fill-coral" />;
      case "follow":
        return <UserPlus size={16} className="text-blue-500" />;
      case "mention":
        return <MessageCircle size={16} className="text-green-500" />;
      default:
        return <Sparkles size={16} className="text-coral" />;
    }
  };

  return (
    <div>
      {/* Üst Başlık ve Sekmeler */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-line z-10">
        <div className="p-3 flex items-center justify-between">
          <h1 className="font-extrabold text-[16px] text-ink">Notifications</h1>
          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1 text-[12px] font-semibold text-muted hover:text-coral transition-colors cursor-pointer"
            title="Mark all as read"
          >
            <CheckCheck size={15} />
            <span>Mark all read</span>
          </button>
        </div>
        <div className="flex border-t border-line">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-3 text-center font-bold text-[13px] relative transition-colors cursor-pointer"
            >
              <span className={activeTab === tab.id ? "text-ink" : "text-muted"}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-coral rounded-full" />
              )}
            </button>
          ))}
        </div>
      </header>
      {/* Bildirim Listesi */}
      <div className="divide-y divide-line">
        {filteredNotifications.length === 0 ? (
          <div className="py-12 text-center text-muted text-[14px]">
            No notifications in this tab yet.
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-[14px_16px] flex items-start gap-3 transition-colors cursor-pointer ${notif.read || notif.isRead ? "bg-white hover:bg-surface/50" : "bg-coral/5 hover:bg-coral/10"
                }`}
            >
              {/* Tip İkonu */}
              <div className="p-2 rounded-full bg-surface shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              {/* İçerik */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/profile/${notif.user.id || notif.user.handle}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    <Avatar
                      initials={notif.user.avatar}
                      color={notif.user.avatarColor}
                      size="sm"
                    />
                    <span className="font-bold text-[13px] text-ink truncate">
                      {notif.user.name}
                    </span>
                  </Link>
                  <span className="text-[11px] text-muted shrink-0">
                    {notif.time}
                  </span>
                  {!(notif.read || notif.isRead) && (
                    <span className="w-2 h-2 rounded-full bg-coral shrink-0 ml-auto" />
                  )}
                </div>
                <p className="text-[13px] text-muted leading-snug">
                  {notif.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}