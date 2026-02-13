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
      {/* Screenshot container — gradient border + glow */}
      <div
        className="rounded-xl p-px shadow-[0_0_32px_rgba(81,157,253,0.06),0_0_64px_rgba(135,18,247,0.04)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(81,157,253,0.1),0_0_72px_rgba(135,18,247,0.07)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(81,157,253,0.15), rgba(135,18,247,0.15))",
        }}
      >
        <button
          type="button"
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[11px] bg-white"
          onClick={onImageClick}
          aria-label={`View ${screenshot.title} full screen`}
        >
          <div className="relative aspect-[16/10]">
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

    </div>
  );
}
