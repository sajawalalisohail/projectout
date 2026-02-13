"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const testimonials = [
  {
    quote: "Nextlex brought calm back to our workflow. Research, drafting, and review finally feel unified.",
    name: "Sarah Mitchell",
    title: "Managing Partner",
    firm: "Mitchell & Associates LLP",
  },
  {
    quote: "We cut research time in half while improving accuracy. The citation validation alone has saved us from costly errors.",
    name: "David Chen",
    title: "Senior Partner",
    firm: "Chen Legal Group",
  },
  {
    quote: "Finally, a legal AI tool that understands how we actually work. The integration with our existing tools was seamless.",
    name: "Rebecca Torres",
    title: "Practice Director",
    firm: "Torres Williams PC",
  },
];

const AUTO_ROTATE_INTERVAL = 7000; // 7 seconds

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(goToNext, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, goToNext, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Calculate card positions for stacking effect
  const getCardStyles = (index: number) => {
    const diff = (index - activeIndex + testimonials.length) % testimonials.length;

    if (diff === 0) {
      // Active card (front) - fully visible
      return {
        zIndex: 30,
        scale: 1,
        y: 0,
        opacity: 1,
      };
    } else if (diff === 1) {
      // Second card (behind) - heavily subdued
      return {
        zIndex: 20,
        scale: 0.92,
        y: 20,
        opacity: 0.15,
      };
    } else {
      // Third card (back) - almost invisible
      return {
        zIndex: 10,
        scale: 0.85,
        y: 40,
        opacity: 0.05,
      };
    }
  };

  return (
    <section className="py-16 md:py-24">
      {/* Section divider */}
      <div
        className="mx-auto mb-16 h-px max-w-4xl"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(135, 18, 247, 0.2) 50%, transparent 100%)' }}
        aria-hidden="true"
      />
      <Container>
        <div
          ref={containerRef}
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(e) => {
            if (!containerRef.current?.contains(e.relatedTarget as Node)) {
              setIsPaused(false);
            }
          }}
        >
          {/* Stacked Cards Container */}
          <div
            className="relative h-[360px] sm:h-[320px] md:h-[300px]"
            role="region"
            aria-label="Testimonials"
            aria-live="polite"
          >
            {testimonials.map((testimonial, index) => {
              const styles = getCardStyles(index);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={testimonial.name}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    zIndex: styles.zIndex,
                    scale: styles.scale,
                    y: styles.y,
                    opacity: styles.opacity,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                >
                  <div
                    className={`relative h-full overflow-hidden rounded-2xl p-8 text-center md:p-10 ${
                      isActive
                        ? "border border-transparent bg-[#0b0d12]"
                        : "border border-white/5 bg-[#0b0d12]"
                    }`}
                  >
                    {/* Gradient border for active card */}
                    {isActive && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        style={{
                          padding: "1px",
                          background: "linear-gradient(135deg, #519DFD 0%, #8712F7 50%, #F012E5 100%)",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                          opacity: 0.4,
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Subtle glow on active card */}
                    {isActive && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-20"
                        style={{
                          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(135, 18, 247, 0.2) 0%, transparent 70%)"
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Portrait Placeholder */}
                    <div className="relative mx-auto mb-8 h-14 w-14 overflow-hidden rounded-full bg-white/10">
                      {isActive && (
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: "linear-gradient(135deg, rgba(81,157,253,0.4) 0%, rgba(135,18,247,0.4) 100%)"
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Quote */}
                    <blockquote className="relative text-xl font-medium leading-relaxed tracking-tight text-white md:text-2xl lg:text-3xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Attribution */}
                    <div className="relative mt-5 space-y-1">
                      {/* Subtle accent divider */}
                      <div
                        className="mx-auto mb-3 h-px w-8"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(135, 18, 247, 0.3) 50%, transparent 100%)',
                        }}
                        aria-hidden="true"
                      />
                      <p className="text-sm font-semibold text-white/80">{testimonial.name}</p>
                      <p className="text-xs text-white/40">
                        {testimonial.title}, {testimonial.firm}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls - Minimal */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {/* Previous Button */}
            <button
              onClick={goToPrev}
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-transparent transition-all duration-200 hover:border-white/20 hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/20"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-4 w-4 text-white/40 transition-colors group-hover:text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots Indicator - Smaller */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                    index === activeIndex
                      ? "w-5"
                      : "w-1.5 bg-white/15 hover:bg-white/25"
                  }`}
                  style={
                    index === activeIndex
                      ? { background: "linear-gradient(90deg, #519DFD 0%, #8712F7 50%, #F012E5 100%)" }
                      : undefined
                  }
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-transparent transition-all duration-200 hover:border-white/20 hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/20"
              aria-label="Next testimonial"
            >
              <svg
                className="h-4 w-4 text-white/40 transition-colors group-hover:text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
