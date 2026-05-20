"use client";

import { Phone, CalendarCheck } from "lucide-react";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 md:hidden flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <a 
        href="https://wa.me/918000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-medium shadow-sm active:scale-95 transition-transform"
      >
        <Phone size={18} />
        <span>WhatsApp</span>
      </a>
      <a 
        href="#pickup"
        className="flex-[1.5] flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-medium shadow-sm active:scale-95 transition-transform"
      >
        <CalendarCheck size={18} />
        <span>Book Pickup</span>
      </a>
    </div>
  );
}
