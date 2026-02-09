"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // Swap to 720p on mobile (overrides <source> children)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      video.src = "/video/hero-720p.MP4";
      video.load();
    }

    // Mark ready once first frame is available
    const onReady = () => setVideoReady(true);

    // Check if already loaded (event fired before React hydration)
    if (video.readyState >= 2) {
      onReady();
      return;
    }

    video.addEventListener("loadeddata", onReady);

    // Safety fallback: poll readyState in case event was missed
    const fallback = setInterval(() => {
      if (video.readyState >= 2 || !video.paused) {
        onReady();
        clearInterval(fallback);
      }
    }, 250);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      clearInterval(fallback);
    };
  }, [prefersReducedMotion]);

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section data-nav-theme="dark" className="relative min-h-screen overflow-hidden bg-black pt-40 md:pt-52">
      {/* Background video — sources are static so browser starts loading from SSR HTML */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: videoReady ? 1 : 0 }}
          aria-hidden="true"
        >
          <source src="/video/hero-1080p.webm" type="video/webm" />
          <source src="/video/hero-1080p.MP4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay for text legibility */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/40"
        aria-hidden="true"
      />

      {/* Bottom gradient for extra text readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <Container className="relative">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            className="text-base uppercase tracking-widest text-white/70 md:text-lg"
            {...fadeUp(0)}
          >
            Invite-only &bull; Early 2026
          </motion.p>

          {/* Title */}
          <motion.h1
            className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
            {...fadeUp(0.1)}
          >
            Your Legal Command Center
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-lg text-white/60 md:text-xl"
            {...fadeUp(0.15)}
          >
            The next of everything law.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="mt-6 max-w-lg text-xl text-white/80 md:text-2xl"
            {...fadeUp(0.2)}
          >
            Built by lawyers for lawyers. Unify research, drafting, review, and practice ops in one secure platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            {...fadeUp(0.3)}
          >
            <Button asChild>
              <a href="/request-access">Request a Demo</a>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <a href="#capabilities">View Workflows</a>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
