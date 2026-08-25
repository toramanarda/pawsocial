"use client";

import { X } from "lucide-react";

export default function PostModal({ isOpen, onClose, onPostCreated }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-ink/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      {/* Modal Kutusu */}
      <div className="w-full max-w-[560px] bg-white rounded-[20px] shadow-2xl border border-line overflow-hidden">
        {/* Kapatma Çubuğu */}
        <div className="p-3 border-b border-line flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface text-ink transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
          <span className="text-[13px] font-bold text-muted">Draft</span>
        </div>
      </div>
    </div>
  );
}