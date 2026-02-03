"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const metrics = [
  { value: "20+", unit: "hours", label: "Saved per attorney monthly" },
  { value: "2x", unit: "", label: "Faster research cycles" },
  { value: "—", unit: "", label: "Reduced citation risk" },
  { value: "1", unit: "platform", label: "For everything legal" },
];

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
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-shadow duration-200 hover:shadow-lg"
            >
              <p className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {metric.value}
                {metric.unit && (
                  <span className="ml-1 text-lg font-normal text-white/60 md:text-xl">
                    {metric.unit}
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm text-white/60">{metric.label}</p>
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
