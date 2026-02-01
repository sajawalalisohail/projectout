"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const valuePoints = [
  {
    title: "Unified workflows",
    description: "Every task, document, and insight in one place.",
  },
  {
    title: "Research you can trust",
    description: "AI-assisted analysis with citations you can verify.",
  },
];

export function ValueSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Why Nextlex"
              title="Earn more. Work smarter."
              description="Reclaim the hours lost to repetitive tasks. Operate with the precision your clients expect."
            />

            <div className="mt-10 space-y-6">
              {valuePoints.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                  <div>
                    <h3 className="text-base font-medium text-fg">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Preview Card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="group rounded-2xl border border-black/5 bg-white/70 p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg md:p-8">
              {/* Card Header */}
              <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
                    <svg
                      className="h-4 w-4 text-brand"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-fg">
                    Research Memo
                  </span>
                </div>
                <span className="text-xs text-muted">Draft</span>
              </div>

              {/* Placeholder AI Output */}
              <div className="space-y-4 text-sm">
                <div className="space-y-2">
                  <div className="h-3 w-3/4 rounded bg-black/[0.06]" />
                  <div className="h-3 w-full rounded bg-black/[0.06]" />
                  <div className="h-3 w-5/6 rounded bg-black/[0.06]" />
                </div>

                <div className="rounded-lg bg-black/[0.03] p-4">
                  <p className="text-xs text-muted">
                    <span className="font-medium text-fg/70">Key Finding:</span>{" "}
                    Based on analysis of 12 precedents, the likelihood of
                    successful motion is estimated at 78%.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-black/[0.06]" />
                  <div className="h-3 w-2/3 rounded bg-black/[0.06]" />
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs text-muted">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span>3 citations attached</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
