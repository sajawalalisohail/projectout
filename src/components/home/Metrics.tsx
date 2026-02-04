"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

// Sparkline paths - different shapes for each metric
const sparklines = [
  // Upward trend (hours saved)
  "M0,24 L8,20 L16,22 L24,16 L32,18 L40,12 L48,14 L56,8 L64,10 L72,4 L80,6",
  // Stepped increase (2x faster)
  "M0,24 L12,24 L12,18 L28,18 L28,12 L44,12 L44,8 L60,8 L60,4 L80,4",
  // Downward trend (reduced risk)
  "M0,4 L10,6 L20,8 L30,12 L40,14 L50,16 L60,20 L70,22 L80,24",
  // Unified plateau (1 platform)
  "M0,20 L10,16 L20,12 L30,10 L40,8 L50,8 L60,8 L70,8 L80,8",
];

const trendLabels = ["trending up", "accelerating", "declining", "unified"];

const metrics = [
  { value: "20+", unit: "hours", label: "Saved per attorney monthly" },
  { value: "2x", unit: "", label: "Faster research cycles" },
  { value: "0", unit: "errors", label: "Reduced citation risk" },
  { value: "1", unit: "platform", label: "For everything legal" },
];

function Sparkline({ path, index }: { path: string; index: number }) {
  return (
    <div className="absolute bottom-4 right-4 left-4">
      {/* Glow effect behind sparkline */}
      <svg
        className="absolute inset-0 h-8 w-full"
        viewBox="0 0 80 28"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`sparklineGlow-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#519DFD" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8712F7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F012E5" stopOpacity="0.3" />
          </linearGradient>
          <filter id={`blur-${index}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <path
          d={path}
          fill="none"
          stroke={`url(#sparklineGlow-${index})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#blur-${index})`}
        />
      </svg>

      {/* Main sparkline */}
      <svg
        className="relative h-8 w-full"
        viewBox="0 0 80 28"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`sparklineGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#519DFD" />
            <stop offset="50%" stopColor="#8712F7" />
            <stop offset="100%" stopColor="#F012E5" />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill="none"
          stroke={`url(#sparklineGrad-${index})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.15"
        />
      </svg>

      {/* Trend label */}
      <span className="absolute -bottom-1 right-0 text-[10px] uppercase tracking-wider text-white/20">
        {trendLabels[index]}
      </span>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Results"
            title="Measurable impact."
            dark
          />
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 pb-16 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg"
            >
              {/* Subtle gradient glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(135, 18, 247, 0.06) 0%, transparent 70%)'
                }}
                aria-hidden="true"
              />

              <p className="relative text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {metric.value}
                {metric.unit && (
                  <span className="ml-1 text-lg font-normal text-white/60 md:text-xl">
                    {metric.unit}
                  </span>
                )}
              </p>
              <p className="relative mt-3 text-sm text-white/60">{metric.label}</p>

              {/* Sparkline */}
              <Sparkline path={sparklines[index]} index={index} />
            </div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-center text-xs text-white/40"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Projected metrics based on internal testing. Results will vary by firm size and usage.
        </motion.p>
      </Container>
    </section>
  );
}
