"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const valuePoints = [
  {
    title: "Unified workflows",
    description: "Research, drafting, review, and practice operations in one place.",
  },
  {
    title: "Research you can trust",
    description: "AI-assisted analysis with citations you can verify. Patent pending.",
  },
  {
    title: "Time back in your day",
    description: "Earn more. Work smarter. Reclaim hours lost to repetitive tasks.",
  },
];

interface ValueSectionProps {
  dark?: boolean;
}

export function ValueSection({ dark = false }: ValueSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Why Nextlex"
              title="Earn more. Work smarter. Get time back."
              description="Operate with the precision your clients expect. Built by lawyers, for lawyers."
              dark={dark}
            />

            <div className="mt-10 space-y-6">
              {valuePoints.map((point, index) => (
                <div key={point.title} className="group flex gap-4">
                  {/* Gradient dot indicator */}
                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full transition-all duration-300"
                    style={{
                      background: dark
                        ? `linear-gradient(135deg, rgba(81,157,253,${0.4 + index * 0.1}) 0%, rgba(135,18,247,${0.4 + index * 0.1}) 100%)`
                        : `linear-gradient(135deg, #519DFD 0%, #8712F7 100%)`,
                      opacity: dark ? 1 : 0.7
                    }}
                  />
                  <div>
                    <h3 className={`text-base font-medium transition-colors duration-200 ${dark ? "text-white" : "text-[#1C1F26]"}`}>
                      {point.title}
                    </h3>
                    <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-[#6B7280]"}`}>
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Preview Card with Premium Styling */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={`group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 md:p-8 ${
              dark
                ? "border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
                : "border border-[rgba(28,31,38,0.08)] bg-gradient-to-b from-[#FAFAFA] to-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            }`}>
              {/* Gradient accent line at top */}
              <div
                className={`absolute top-0 left-6 right-6 h-px transition-opacity duration-300 ${dark ? "opacity-40" : "opacity-25"} group-hover:opacity-60`}
                style={{ background: 'linear-gradient(90deg, transparent 0%, #519DFD 25%, #8712F7 50%, #F012E5 75%, transparent 100%)' }}
                aria-hidden="true"
              />

              {/* Subtle glow effect */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: dark
                    ? 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(135, 18, 247, 0.08) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(135, 18, 247, 0.04) 0%, transparent 70%)'
                }}
                aria-hidden="true"
              />

              {/* Card Header */}
              <div className={`relative mb-6 flex items-center justify-between border-b pb-4 ${
                dark ? "border-white/10" : "border-[#E5E5E5]"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    dark
                      ? "bg-gradient-to-br from-white/10 to-white/5"
                      : "bg-gradient-to-br from-[rgba(81,157,253,0.1)] to-[rgba(135,18,247,0.1)]"
                  }`}>
                    <svg
                      className={`h-4 w-4 ${dark ? "text-white/70" : "text-[#8712F7]"}`}
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
                  <span className={`text-sm font-medium ${dark ? "text-white" : "text-[#1C1F26]"}`}>
                    Research Memo
                  </span>
                </div>
                <span className={`text-xs ${dark ? "text-white/60" : "text-[#6B7280]"}`}>Draft</span>
              </div>

              {/* Placeholder AI Output */}
              <div className="relative space-y-4 text-sm">
                <div className="space-y-2">
                  <div className={`h-3 w-3/4 rounded ${dark ? "bg-white/10" : "bg-[#1C1F26]/[0.08]"}`} />
                  <div className={`h-3 w-full rounded ${dark ? "bg-white/10" : "bg-[#1C1F26]/[0.08]"}`} />
                  <div className={`h-3 w-5/6 rounded ${dark ? "bg-white/10" : "bg-[#1C1F26]/[0.08]"}`} />
                </div>

                {/* Key Finding card with subtle accent */}
                <div className={`relative overflow-hidden rounded-lg p-4 ${
                  dark
                    ? "bg-white/5 border border-white/5"
                    : "bg-white border border-[#E5E5E5]"
                }`}>
                  {/* Tiny gradient accent on left */}
                  <div
                    className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
                    style={{ background: 'linear-gradient(180deg, #519DFD 0%, #8712F7 100%)', opacity: 0.6 }}
                    aria-hidden="true"
                  />
                  <p className={`pl-3 text-xs ${dark ? "text-white/60" : "text-[#6B7280]"}`}>
                    <span className={`font-medium ${dark ? "text-white/80" : "text-[#1C1F26]"}`}>Key Finding:</span>{" "}
                    Based on analysis of 12 precedents, the likelihood of
                    successful motion is estimated at 78%.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className={`h-3 w-full rounded ${dark ? "bg-white/10" : "bg-[#1C1F26]/[0.08]"}`} />
                  <div className={`h-3 w-2/3 rounded ${dark ? "bg-white/10" : "bg-[#1C1F26]/[0.08]"}`} />
                </div>

                <div className={`flex items-center gap-2 pt-2 text-xs ${dark ? "text-white/60" : "text-[#6B7280]"}`}>
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
