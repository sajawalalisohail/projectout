"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const features = [
  {
    title: "Unified Workspace",
    description:
      "Research, drafting, review, and practice operations consolidated into a single environment. No more switching between disconnected tools.",
  },
  {
    title: "Verified Research with Citations",
    description:
      "AI-assisted analysis that surfaces relevant precedents and statutes with citations you can verify. Patent pending.",
  },
  {
    title: "AI Drafting Aligned with Firm Standards",
    description:
      "Generate first drafts grounded in your firm's style, precedents, and templates. Every output reflects how your team actually works.",
  },
];

interface ValueSectionProps {
  dark?: boolean;
}

export function ValueSection({ dark = false }: ValueSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Why Nextlex"
            title="Built for Real Legal Work."
            dark={dark}
          />
          <p
            className={`mt-4 max-w-2xl text-lg md:text-xl ${
              dark ? "text-white/60" : "text-[#3D4149]"
            }`}
          >
            Workflow clarity, reduced context switching, and unified operations
            - designed for how legal teams actually practice.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 md:p-8 ${
                dark
                  ? "border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:border-white/[0.18]"
                  : "nx-panel-light nx-panel-light-accent"
              }`}
            >
              {/* Gradient accent line (dark mode only; light handled by nx-panel-light-accent) */}
              {dark && (
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #519DFD 25%, #8712F7 50%, #F012E5 75%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Subtle glow on hover (dark mode only; light handled by nx-panel-light::before) */}
              {dark && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(135, 18, 247, 0.08) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              )}

              <div className="relative">
                {/* Small accent line */}
                <div
                  className="mb-4 h-[2px] w-8 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #519DFD 0%, #8712F7 100%)",
                    opacity: dark ? 0.6 : 0.5,
                  }}
                  aria-hidden="true"
                />

                <h3
                  className={`text-lg font-semibold ${
                    dark ? "text-white" : "text-[#1C1F26]"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    dark ? "text-white/60" : "text-[#6B7280]"
                  }`}
                >
                  {feature.description}
                </p>

                {/* Minimal placeholder container */}
                <div
                  className={`mt-6 aspect-[16/9] rounded-lg ${
                    dark ? "bg-white/5" : "bg-[#F3F4F6]"
                  }`}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
