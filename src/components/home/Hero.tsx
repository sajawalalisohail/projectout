"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      video.src = "/video/hero-720p.MP4";
      video.load();
    }

    const onReady = () => setVideoReady(true);

    if (video.readyState >= 2) {
      onReady();
      return;
    }

    video.addEventListener("loadeddata", onReady);

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
    <section data-nav-theme="dark" className="relative min-h-screen overflow-hidden bg-black">
      {/* Background video */}
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

      <div
        className="pointer-events-none absolute inset-0 bg-black/40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-screen flex-col pt-32 md:pt-60">
        {/* Top-left: Badge, Headline, Subcopy, CTAs */}
        <div className="max-w-2xl">
          {/* Badge pill */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70 backdrop-blur-sm shadow-[0_0_16px_rgba(81,157,253,0.1),inset_0_0_8px_rgba(255,255,255,0.04)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Invite-only &middot; Early 2026
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
            {...fadeUp(0.1)}
          >
            Your Legal Command Center
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-5 text-base text-white/50 md:text-lg"
            {...fadeUp(0.15)}
          >
            The next of everything law.
          </motion.p>

          {/* Subcopy */}
          <motion.p
            className="mt-8 max-w-xl text-lg text-white/70 md:text-xl"
            {...fadeUp(0.2)}
          >
            Built by lawyers for lawyers. Unify research, drafting, review, and practice ops in one secure platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center"
            {...fadeUp(0.3)}
          >
            <a
              href="/request-access"
              className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[15px] font-medium text-[#1C1F26] transition-all duration-300 hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-70"
                style={{
                  padding: '1px',
                  background: 'linear-gradient(135deg, #519DFD 0%, #8712F7 50%, #F012E5 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30"
                style={{
                  background: 'linear-gradient(135deg, #519DFD 0%, #8712F7 50%, #F012E5 100%)',
                }}
                aria-hidden="true"
              />
              <span className="relative">Request a Demo</span>
            </a>
            <a
              href="#capabilities"
              className="text-sm text-white/50 underline underline-offset-4 decoration-white/20 transition-colors hover:text-white/80 hover:decoration-white/40"
            >
              View Workflows &rarr;
            </a>
          </motion.div>
        </div>

        {/* Bottom: Trust indicators */}
        <motion.div
          className="mt-auto w-full pb-12 md:pb-16"
          {...fadeUp(0.45)}
        >
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* SOC 2 Ready */}
            <div className="group flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-white/60 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_20px_rgba(81,157,253,0.1)]">
              <svg className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-[#519DFD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium">SOC 2 Ready</span>
            </div>

            {/* Enterprise-grade security */}
            <div className="group flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-white/60 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_20px_rgba(135,18,247,0.1)]">
              <svg className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-[#8712F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Enterprise Security</span>
            </div>

            {/* Data isolation */}
            <div className="group flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-white/60 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_20px_rgba(240,18,229,0.1)]">
              <svg className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-[#F012E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <span className="font-medium">Data Isolation</span>
            </div>

            {/* Audit-ready controls */}
            <div className="group flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-white/60 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_20px_rgba(81,157,253,0.1)]">
              <svg className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-[#519DFD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="font-medium">Audit-Ready Controls</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
