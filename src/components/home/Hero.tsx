"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const heroImages = [
  "/hero-pics/hero-1.jpg",
  "/hero-pics/hero-2.jpg",
  "/hero-pics/hero-3.jpg",
  "/hero-pics/hero-4.jpg",
  "/hero-pics/hero-5.jpg",
];

const CYCLE_INTERVAL = 6000;
const CROSSFADE_DURATION = 0.5;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Preload images and track which ones loaded successfully
  useEffect(() => {
    const loadStates: boolean[] = [];
    let mounted = true;

    heroImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        if (mounted) {
          loadStates[index] = true;
          setImagesLoaded([...loadStates]);
        }
      };
      img.onerror = () => {
        if (mounted) {
          loadStates[index] = false;
          setImagesLoaded([...loadStates]);
        }
      };
      img.src = src;
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Cycle through images (only if motion allowed and images exist)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const availableImages = imagesLoaded.filter(Boolean);
    if (availableImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Find next available image
        let next = (prev + 1) % heroImages.length;
        let attempts = 0;
        while (!imagesLoaded[next] && attempts < heroImages.length) {
          next = (next + 1) % heroImages.length;
          attempts++;
        }
        return next;
      });
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, imagesLoaded]);

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
        };

  const currentImage = imagesLoaded[currentIndex]
    ? heroImages[currentIndex]
    : null;

  return (
    <section data-nav-theme="dark" className="relative min-h-screen overflow-hidden pt-40 md:pt-52">
      {/* Background images with short crossfade */}
      <AnimatePresence mode="sync">
        {currentImage && (
          <motion.div
            key={currentImage}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentImage})` }}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: CROSSFADE_DURATION, ease: "easeInOut" }
            }
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Dark overlay for text legibility */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/35"
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

          {/* Subtitle */}
          <motion.p
            className="mt-6 max-w-lg text-xl text-white/80 md:text-2xl"
            {...fadeUp(0.2)}
          >
            Built by lawyers for lawyers-secure, precise, and designed to give
            your firm back its time.
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
