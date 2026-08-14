"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { easeLuxe } from "@/lib/motion";

const message = `Hi ${site.name} Photography! We have a function coming up and would love to talk about dates.`;

/** Floating WhatsApp button — bottom-left, one tap to start a chat. */
export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: easeLuxe, delay: 1.6 }}
      className="fixed bottom-5 left-5 z-30 md:bottom-7 md:left-7"
    >
      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex items-center gap-0 rounded-full bg-[#25d366] text-white shadow-lg shadow-black/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/30"
      >
        <span className="relative flex h-13 w-13 items-center justify-center md:h-14 md:w-14">
          {/* soft ping ring */}
          <span
            className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30 motion-reduce:animate-none"
            style={{ animationDuration: "2.4s" }}
            aria-hidden="true"
          />
          <WhatsAppIcon className="relative h-6 w-6 md:h-7 md:w-7" />
        </span>
        {/* label unfolds on hover (desktop only) */}
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width] duration-500 ease-luxe group-hover:max-w-56 md:block">
          <span className="block pr-6 pl-1">Message us your date</span>
        </span>
      </a>
    </motion.div>
  );
}
