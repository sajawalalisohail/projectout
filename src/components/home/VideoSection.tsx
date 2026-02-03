"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function VideoSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
      };

  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div className="mb-8 text-center" {...fadeUp}>
          <p className="text-sm uppercase tracking-widest text-[#6B7280]">
            See it in action
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1C1F26] md:text-3xl">
            One platform. Complete clarity.
          </h2>
        </motion.div>

        {/* Premium video panel */}
        <motion.div
          className="group relative"
          {...fadeUp}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as const }
          }
        >
          {/* Outer glow effect */}
          <div
            className="pointer-events-none absolute -inset-4 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(135, 18, 247, 0.06) 0%, transparent 70%)'
            }}
            aria-hidden="true"
          />

          {/* Video container with premium border */}
          <div className="relative overflow-hidden rounded-3xl border border-[rgba(28,31,38,0.08)] bg-black shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-[rgba(135,18,247,0.15)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
            {/* Gradient accent line at top */}
            <div
              className="absolute top-0 left-0 right-0 h-px z-10 opacity-40 transition-opacity duration-300 group-hover:opacity-60"
              style={{ background: 'linear-gradient(90deg, transparent 0%, #519DFD 25%, #8712F7 50%, #F012E5 75%, transparent 100%)' }}
              aria-hidden="true"
            />

            {/* Inner glow at top */}
            <div
              className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-10 opacity-30"
              style={{
                background: 'linear-gradient(180deg, rgba(135, 18, 247, 0.08) 0%, transparent 100%)'
              }}
              aria-hidden="true"
            />

            <video
              autoPlay
              muted
              loop
              playsInline
              controls
              className="relative z-0 w-full"
            >
              <source src="/video/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
