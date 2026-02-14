"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
      "AI-assisted analysis that surfaces relevant precedents and statutes with citations you can verify.",
    image: "/capabilities/Legal Research Page.png",
    alt: "Legal research interface with verified citations",
  },
  {
    title: "AI Drafting Aligned with Firm Standards",
    description:
      "Generate first drafts grounded in your firm's style, precedents, and templates. Every output reflects how your team actually works.",
    image:
      "/capabilities/Creating a motion from main page - drafting in action - part 2.png",
    alt: "Motion drafting in progress with AI assistance",
  },
];

interface ValueSectionProps {
  dark?: boolean;
}

export function ValueSection({ dark = false }: ValueSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = features[activeIndex];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Why Nextlex"
            title="Built for Real Legal Work."
            dark={dark}
          />
          <p
            className={`mt-4 max-w-2xl text-lg md:text-xl ${dark ? "text-white/60" : "text-[#3D4149]"
              }`}
          >
            Workflow clarity, reduced context switching, and unified operations
            - designed for how legal teams actually practice.
          </p>
        </motion.div>

        {/* Two-column layout: text left, screenshot right */}
        <motion.div
          className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Left: Active description + thumbnail selector */}
          <div className="order-2 lg:order-1">
            {/* Active feature description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h3
                  className={`text-2xl font-semibold tracking-tight ${dark ? "text-white" : "text-[#1C1F26]"
                    }`}
                >
                  {active.title}
                </h3>
                <p
                  className={`mt-3 text-base leading-relaxed ${dark ? "text-white/60" : "text-[#6B7280]"
                    }`}
                >
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail selector */}
            <div className="mt-8 flex flex-col gap-2">
              {features.map((feature, index) => (
                <button
                  key={feature.title}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative rounded-lg px-4 py-3 text-left transition-all duration-200 ${activeIndex === index
                      ? dark
                        ? "bg-white/5"
                        : "bg-black/[0.03]"
                      : dark
                        ? "hover:bg-white/[0.03]"
                        : "hover:bg-black/[0.02]"
                    }`}
                >
                  {/* Gradient left border for active */}
                  <div
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full transition-opacity duration-200"
                    style={{
                      background:
                        "linear-gradient(180deg, #519DFD 0%, #8712F7 100%)",
                      opacity: activeIndex === index ? 1 : 0,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className={`text-sm font-medium transition-colors duration-200 ${activeIndex === index
                        ? dark
                          ? "text-white"
                          : "text-[#1C1F26]"
                        : dark
                          ? "text-white/40 group-hover:text-white/60"
                          : "text-[#6B7280] group-hover:text-[#3D4149]"
                      }`}
                  >
                    {feature.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Screenshot */}
          <div className="order-1 lg:order-2">
            {/* Gradient border wrapper */}
            <div className="relative rounded-2xl p-px" style={{
              background: "linear-gradient(135deg, rgba(81,157,253,0.2) 0%, rgba(135,18,247,0.2) 50%, rgba(240,18,229,0.2) 100%)",
            }}>
              {/* Subtle glow behind */}
              <div
                className="pointer-events-none absolute -inset-4 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(135, 18, 247, 0.15) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className={`relative overflow-hidden rounded-2xl ${dark ? "bg-[#0b0d12]" : "bg-gray-50"}`}>
                <div className="relative aspect-[16/10]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={active.image}
                        alt={active.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority={activeIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
