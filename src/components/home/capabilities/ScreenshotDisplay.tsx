"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Pillar } from "./capabilitiesData";

interface ScreenshotDisplayProps {
  pillar: Pillar;
  pillarIndex: number;
  activeScreenshotIndex: number;
  onImageClick: () => void;
  isFirstDefault: boolean;
}

export function ScreenshotDisplay({
  pillar,
  pillarIndex,
  activeScreenshotIndex,
  onImageClick,
  isFirstDefault,
}: ScreenshotDisplayProps) {
  const screenshot = pillar.screenshots[activeScreenshotIndex];

  return (
    <div className="flex-1 min-w-0">
      {/* Screenshot container */}
      <button
        type="button"
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
        onClick={onImageClick}
        aria-label={`View ${screenshot.title} full screen`}
      >
        <div
          className="relative aspect-[16/10]"
          style={{
            background:
              "linear-gradient(135deg, #F3F4F6 0%, #E5E5E5 50%, #F3F4F6 100%)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${pillarIndex}-${activeScreenshotIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority={isFirstDefault && activeScreenshotIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/5">
            <span className="rounded-full bg-white/0 p-3 opacity-0 shadow-lg transition-all duration-200 group-hover:bg-white/90 group-hover:opacity-100">
              <svg
                className="h-5 w-5 text-[#1C1F26]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </span>
          </div>
        </div>
      </button>

    </div>
  );
}
