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
          <p className="text-sm uppercase tracking-widest text-muted">
            See it in action
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg md:text-3xl">
            One platform. Complete clarity.
          </h2>
        </motion.div>
        <motion.div
          className="overflow-hidden rounded-2xl bg-black"
          {...fadeUp}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as const }
          }
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full"
          >
            <source src="/video/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </Container>
    </section>
  );
}
