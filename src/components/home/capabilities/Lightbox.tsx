"use client";

import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { PillarScreenshot } from "./capabilitiesData";

interface LightboxProps {
  screenshots: PillarScreenshot[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous image" : "Next image"}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {direction === "left" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        )}
      </svg>
    </button>
  );
}

export function Lightbox({
  screenshots,
  activeIndex,
  onIndexChange,
  onClose,
}: LightboxProps) {
  const triggerRef = useRef<Element | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    triggerRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, []);

  const goNext = useCallback(() => {
    onIndexChange((activeIndex + 1) % screenshots.length);
  }, [activeIndex, screenshots.length, onIndexChange]);

  const goPrev = useCallback(() => {
    onIndexChange(
      (activeIndex - 1 + screenshots.length) % screenshots.length
    );
  }, [activeIndex, screenshots.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  const screenshot = screenshots[activeIndex];

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label={`Image viewer: ${screenshot.title}`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Close button */}
        <button
          ref={closeBtnRef}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Left arrow */}
        {screenshots.length > 1 && (
          <div className="absolute left-4 z-20">
            <ArrowButton direction="left" onClick={goPrev} />
          </div>
        )}

        {/* Image - centered */}
        <div
          className="relative z-10 w-full max-w-[90vw]"
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-[16/10] w-full"
            >
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        {screenshots.length > 1 && (
          <div className="absolute right-4 z-20">
            <ArrowButton direction="right" onClick={goNext} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
