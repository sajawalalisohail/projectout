"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  dark = false,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
      };

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      {eyebrow && (
        <motion.p
          className={cn(
            "text-sm uppercase tracking-widest",
            dark ? "text-white/60" : "text-[#6B7280]"
          )}
          {...animationProps}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className={cn(
          "text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl",
          dark ? "text-white" : "text-[#1C1F26]"
        )}
        {...animationProps}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as const }
        }
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={cn(
            "max-w-2xl text-lg md:text-xl",
            dark ? "text-white/60" : "text-[#3D4149]"
          )}
          {...animationProps}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as const }
          }
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
