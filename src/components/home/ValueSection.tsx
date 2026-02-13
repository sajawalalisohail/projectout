"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const features = [
  {
    title: "Unified Workspace",
    description:
      "Research, drafting, review, and practice operations consolidated into a single environment. No more switching between disconnected tools.",
    image: "/capabilities/Dashboard View.png",
    alt: "Dashboard overview showing unified workspace",
  },
  {
    title: "Verified Research with Citations",
    description:
      "AI-assisted analysis that surfaces relevant precedents and statutes with citations you can verify. Patent pending.",
    image: "/capabilities/Legal Research Page.png",
    alt: "Legal research interface with verified citations",
  },
  {
    title: "AI Drafting Aligned with Firm Standards",
    description:
      "Generate first drafts grounded in your firm's style, precedents, and templates. Every output reflects how your team actually works.",
    image:
      "/capabilities/Drafting Canvas In Action - Drafting a Motion to Supress for a case.png",
    alt: "AI drafting canvas generating a motion",
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

        <div className="mt-16 space-y-20 lg:space-y-28">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16"
              {...fadeUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Text */}
              <div className="flex-1 lg:max-w-md">
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
                  className={`text-2xl font-semibold tracking-tight md:text-3xl ${
                    dark ? "text-white" : "text-[#1C1F26]"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`mt-3 text-base leading-relaxed md:text-lg ${
                    dark ? "text-white/60" : "text-[#6B7280]"
                  }`}
                >
                  {feature.description}
                </p>
              </div>

              {/* Screenshot - floating, no border */}
              <div className="relative flex-1 min-w-0 w-full lg:w-auto">
                {/* Subtle glow */}
                <div
                  className="pointer-events-none absolute -inset-4 rounded-2xl opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(135, 18, 247, 0.06) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
