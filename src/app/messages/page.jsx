"use client";

import { useState } from "react";
import { Search, SquarePen } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export default function MessagesPage() {
  const [searchVal, setSearchVal] = useState("");
  const [selectedChatId, setSelectedChatId] = useState("c1");

  const conversations = [
    {
      id: "c1",
      user: {
        name: "Elif Fidan",
        handle: "@eliffidan",
        avatar: "EF",
        avatarColor: "peach",
      },
      lastMessage: "Harika! Hafta sonu Maçka Parkı'nda buluşalım o zaman 🐾",
      time: "15m",
      unread: 1,
    },
    {
      id: "c2",
      user: {
        name: "Mehmet Nuri",
        handle: "@mnuri",
        avatar: "MN",
        avatarColor: "violet",
      },
      lastMessage: "Eğitim ödül mamasının linkini gönderdim, bakabildin mi?",
      time: "2h",
      unread: 0,
    },
    {
      id: "c3",
      user: {
        name: "Ayşe Kaya",
        handle: "@aysekaya",
        avatar: "AK",
        avatarColor: "violet",
      },
      lastMessage: "Veteriner kliniği önerin için çok teşekkürler!",
      time: "1d",
      unread: 0,
    },
  ];

  const filteredConversations = conversations.filter(
    (c) =>
      c.user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      c.user.handle.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-60px)] md:h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Sohbet Listesi */}
      <div className="w-full md:w-[320px] lg:w-[360px] border-r border-line flex flex-col shrink-0 h-full">
        {/* Üst Başlık & Yeni Mesaj Butonu */}
        <div className="p-3.5 border-b border-line flex items-center justify-between">
          <h1 className="font-extrabold text-[16px] text-ink">Messages</h1>
          <button
            className="p-2 rounded-full hover:bg-surface text-ink transition-colors cursor-pointer"
            title="New message"
          >
            <SquarePen size={18} />
          </button>
        </div>

        {/* Mesaj İçi Arama */}
        <div className="p-2.5 border-b border-line">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-surface text-muted text-[12px] border border-transparent focus-within:border-line focus-within:bg-white transition-colors">
            <Search size={14} className="shrink-0" />
            <input
              type="text"
              placeholder="Search Direct Messages"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-transparent border-0 outline-none w-full text-ink placeholder:text-muted"
            />
          </div>
        </div>
        {/* Sohbet Listesi Akışı */}
        <div className="flex-1 overflow-y-auto divide-y divide-line/60">
          {filteredConversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`w-full p-3 flex items-start gap-3 text-left transition-colors cursor-pointer ${selectedChatId === chat.id
                  ? "bg-surface"
                  : "hover:bg-surface/50 bg-white"
                }`}
            >
              <Avatar
                initials={chat.user.avatar}
                color={chat.user.avatarColor}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-bold text-[13px] text-ink truncate">
                    {chat.user.name}
                  </span>
                  <span className="text-[11px] text-muted shrink-0">
                    {chat.time}
                  </span>
                </div>
                <p className="text-[12px] text-muted truncate leading-snug">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <span className="w-2 h-2 rounded-full bg-coral shrink-0 mt-2" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}