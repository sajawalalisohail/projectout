"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const features = [
  {
    title: "Unified Workspace",
    description:
      "Research, drafting, review, and practice operations consolidated into a single environment. No more switching between disconnected tools.",
    image: "/capabilities/Dashboard View.png",
    alt: "Dashboard overview showing unified workspace",
  },
  {
    title: "Verified Research with Citations",
    description:
      "AI-assisted analysis that surfaces relevant precedents and statutes with citations you can verify.",
    image: "/capabilities/Legal Research Page.png",
    alt: "Legal research interface with verified citations",
  },
  {
    title: "AI Drafting Aligned with Firm Standards",
    description:
      "Generate first drafts grounded in your firm's style, precedents, and templates. Every output reflects how your team actually works.",
    image:
      "/capabilities/Creating a motion from main page - drafting in action - part 2.png",
    alt: "Motion drafting in progress with AI assistance",
  },
];

interface ValueSectionProps {
  dark?: boolean;
}

export function ValueSection({ dark = false }: ValueSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const touchStartRef = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, features.length - itemsPerView);

  // Clamp currentIndex when itemsPerView changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [prev, next]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = touchStartRef.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        if (delta > 0) next();
        else prev();
      }
    },
    [prev, next]
  );

  const showArrows = maxIndex > 0;
  const totalDots = maxIndex + 1;

  // Calculate card width percentage based on items per view with gap consideration
  const gapRem = 1.5; // gap-6 = 1.5rem
  const cardWidthCalc = `calc((100% - ${(itemsPerView - 1) * gapRem}rem) / ${itemsPerView})`;
  const translateCalc = `calc(-${currentIndex} * (${cardWidthCalc} + ${gapRem}rem))`;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Why Nextlex"
            title="Built for Real Legal Work."
            dark={dark}
          />
          <p
            className={`mt-4 max-w-2xl text-lg md:text-xl ${
              dark ? "text-white/60" : "text-[#3D4149]"
            }`}
          >
            Workflow clarity, reduced context switching, and unified operations
            - designed for how legal teams actually practice.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div className="mt-16" {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
          <div
            ref={carouselRef}
            className="relative"
            role="region"
            aria-label="Why Nextlex features"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Arrow buttons */}
            {showArrows && (
              <>
                <button
                  onClick={prev}
                  disabled={currentIndex === 0}
                  aria-label="Previous"
                  className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white p-2.5 shadow-sm transition-all duration-200 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed md:-left-5"
                >
                  <svg className="h-4 w-4 text-[#1C1F26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  disabled={currentIndex === maxIndex}
                  aria-label="Next"
                  className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white p-2.5 shadow-sm transition-all duration-200 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed md:-right-5"
                >
                  <svg className="h-4 w-4 text-[#1C1F26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Track */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: translateCalc }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="shrink-0"
                    style={{ width: cardWidthCalc }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${features.length}`}
                  >
                    <div className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-all duration-300 hover:border-black/10 hover:shadow-lg">
                      {/* Screenshot */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                        <Image
                          src={feature.image}
                          alt={feature.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes={
                            itemsPerView === 1
                              ? "100vw"
                              : itemsPerView === 2
                                ? "50vw"
                                : "33vw"
                          }
                        />
                      </div>

                      {/* Text content */}
                      <div className="p-6">
                        <div
                          className="mb-3 h-[2px] w-8 rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, #519DFD 0%, #8712F7 100%)",
                            opacity: dark ? 0.6 : 0.5,
                          }}
                          aria-hidden="true"
                        />
                        <h3
                          className={`text-lg font-semibold tracking-tight ${
                            dark ? "text-white" : "text-[#1C1F26]"
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={`mt-2 text-sm leading-relaxed ${
                            dark ? "text-white/60" : "text-[#6B7280]"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Dots */}
          {totalDots > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Carousel navigation">
              {Array.from({ length: totalDots }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  role="tab"
                  aria-selected={currentIndex === i}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-2 rounded-full transition-all duration-300"
                  style={{
                    width: currentIndex === i ? "1.5rem" : "0.5rem",
                    background:
                      currentIndex === i
                        ? "linear-gradient(90deg, #519DFD 0%, #8712F7 50%, #F012E5 100%)"
                        : "rgba(28, 31, 38, 0.15)",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
