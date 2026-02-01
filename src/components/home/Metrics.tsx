"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { fadeUp } from "@/lib/motion";

const metrics = [
  { value: "20+", unit: "hours", label: "Hours saved per month" },
  { value: "2x", unit: "", label: "Faster research cycles" },
  { value: "—", unit: "", label: "Reduced citation risk" },
  { value: "1", unit: "platform", label: "Fewer tool switches" },
];

export function Metrics() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Results"
            title="Measurable clarity."
          />
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {metrics.map((metric) => (
            <Card key={metric.label} className="text-center">
              <p className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                {metric.value}
                {metric.unit && (
                  <span className="ml-1 text-lg font-normal text-muted md:text-xl">
                    {metric.unit}
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm text-muted">{metric.label}</p>
            </Card>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-center text-xs text-muted/70"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Illustrative metrics. Final benchmarks will vary by firm and configuration.
        </motion.p>
      </Container>
    </section>
  );
}
