"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { Heart, MessageCircle, UserPlus, Sparkles } from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "mentions", label: "Mentions" },
    { id: "likes", label: "Likes" },
  ];

  const notifications = [
    {
      id: "n1",
      type: "like",
      user: {
        name: "Elif Fidan",
        handle: "@eliffidan",
        avatar: "EF",
        avatarColor: "peach",
      },
      text: "liked your post about Maçka Park.",
      time: "10m ago",
    },
    {
      id: "n2",
      type: "follow",
      user: {
        name: "Mehmet Nuri",
        handle: "@mnuri",
        avatar: "MN",
        avatarColor: "violet",
      },
      text: "started following you.",
      time: "1h ago",
    },
    {
      id: "n3",
      type: "mention",
      user: {
        name: "Ayşe Kaya",
        handle: "@aysekaya",
        avatar: "AK",
        avatarColor: "violet",
      },
      text: "mentioned you in a comment: '@ardatoraman hafta sonu parkta buluşuyor muyuz?'",
      time: "3h ago",
    },
    {
      id: "n4",
      type: "like",
      user: {
        name: "Caner Yılmaz",
        handle: "@canery",
        avatar: "CY",
        avatarColor: "blue",
      },
      text: "liked your training tips post.",
      time: "5h ago",
    },
  ];

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === "mentions") return item.type === "mention";
    if (activeTab === "likes") return item.type === "like";
    return true; // 'all' sekmesi
  });

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
        <div className="p-3">
          <h1 className="font-extrabold text-[16px] text-ink">Notifications</h1>
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
              className="p-[14px_16px] flex items-start gap-3 hover:bg-surface/50 transition-colors cursor-pointer"
            >
              {/* Tip İkonu */}
              <div className="p-2 rounded-full bg-surface shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              {/* İçerik */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar
                    initials={notif.user.avatar}
                    color={notif.user.avatarColor}
                    size="sm"
                  />
                  <span className="font-bold text-[13px] text-ink truncate">
                    {notif.user.name}
                  </span>
                  <span className="text-[11px] text-muted shrink-0">
                    {notif.time}
                  </span>
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