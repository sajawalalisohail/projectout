"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const sparklines = [
  "M0,24 L8,20 L16,22 L24,16 L32,18 L40,12 L48,14 L56,8 L64,10 L72,4 L80,6",
  "M0,24 L12,24 L12,18 L28,18 L28,12 L44,12 L44,8 L60,8 L60,4 L80,4",
  "M0,22 L10,20 L20,18 L30,16 L40,14 L50,10 L60,8 L70,6 L80,4",
  "M0,24 L10,20 L20,16 L30,12 L40,10 L50,8 L60,6 L70,5 L80,4",
];

const trendLabels = ["trending up", "accelerating", "improving", "consolidated"];

const metrics = [
  { value: "20+", unit: "hours", label: "Saved per attorney monthly" },
  { value: "2x", unit: "", label: "Faster legal research" },
  { value: "35", unit: "%", label: "Reduction in review time" },
  { value: "6", unit: "tools", label: "Replaced by one platform" },
];

const metricIcons = [
  "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75l-5.571-3m11.142 0l4.179 2.25L12 17.25 2.25 12l4.179-2.25m11.142 0l4.179 2.25L12 22.5l-9.75-5.25 4.179-2.25",
];

function Sparkline({ path, index }: { path: string; index: number }) {
  return (
    <div className="absolute bottom-4 right-4 left-4">
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
      <span className="absolute -bottom-1 right-0 text-[10px] uppercase tracking-wider text-white/20">
        {trendLabels[index]}
      </span>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="py-16 md:py-24">
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
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 pb-16 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(135, 18, 247, 0.06) 0%, transparent 70%)'
                }}
                aria-hidden="true"
              />

              <div className="relative mb-4">
                <svg className="h-6 w-6 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={metricIcons[index]} />
                </svg>
              </div>

              <p className="relative text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {metric.value}
                {metric.unit && (
                  <span className="ml-1 text-lg font-normal text-white/60 md:text-xl">
                    {metric.unit}
                  </span>
                )}
              </p>
              <p className="relative mt-3 text-sm text-white/60">{metric.label}</p>

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
