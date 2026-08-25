"use client";

import { useState } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { Heart, MessageCircle, UserPlus, Sparkles, CheckCheck } from "lucide-react";

export default function NotificationsPage() {

  const [activeTab, setActiveTab] = useState("all");
  const [notificationsList, setNotificationsList] = useState([
    {
      id: "n1",
      type: "like",
      user: {
        id: "u-elif",
        name: "Elif Fidan",
        handle: "@eliffidan",
        avatar: "EF",
        avatarColor: "peach",
      },
      text: "liked your post about Maçka Park.",
      time: "10m ago",
      read: false,
    },
    {
      id: "n2",
      type: "follow",
      user: {
        id: "u-mnuri",
        name: "Mehmet Nuri",
        handle: "@mnuri",
        avatar: "MN",
        avatarColor: "violet",
      },
      text: "started following you.",
      time: "1h ago",
      read: false,
    },
    {
      id: "n3",
      type: "mention",
      user: {
        id: "u-ayse",
        name: "Ayşe Kaya",
        handle: "@aysekaya",
        avatar: "AK",
        avatarColor: "violet",
      },
      text: "mentioned you in a comment: '@ardatoraman hafta sonu parkta buluşuyor muyuz?'",
      time: "3h ago",
      read: true,
    },
    {
      id: "n4",
      type: "like",
      user: {
        id: "u-caner",
        name: "Caner Yılmaz",
        handle: "@canery",
        avatar: "CY",
        avatarColor: "blue",
      },
      text: "liked your training tips post.",
      time: "5h ago",
      read: true,
    },
  ]);
  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filteredNotifications = notificationsList.filter((item) => {
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
            onClick={markAllAsRead}
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
              onClick={() => markAsRead(notif.id)}
              className={`p-[14px_16px] flex items-start gap-3 transition-colors cursor-pointer ${notif.read ? "bg-white hover:bg-surface/50" : "bg-coral/5 hover:bg-coral/10"
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
                  {!notif.read && (
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