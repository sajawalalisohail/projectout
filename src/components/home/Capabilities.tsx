"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const capabilities = [
  {
    title: "Legal Research",
    description: "Surface relevant precedents and statutes in seconds, not hours. AI-powered search with verified citations.",
  },
  {
    title: "Citation Management",
    description: "Organize, format, and update citations across all your documents automatically.",
  },
  {
    title: "Citation Validation",
    description: "Verify that every citation is accurate and current—catch errors before they cost you.",
  },
  {
    title: "AI Drafting",
    description: "Generate first drafts grounded in your firm's style, precedents, and best practices.",
  },
  {
    title: "Document Processing",
    description: "Extract key clauses and data points from any contract, filing, or legal document.",
  },
  {
    title: "Research Memos",
    description: "Turn complex questions into structured, cite-checked memoranda in minutes.",
  },
  {
    title: "Court Information",
    description: "Access filing requirements, deadlines, and judge preferences instantly.",
  },
  {
    title: "Secure Collaboration",
    description: "Share work product with clients and colleagues under enterprise-grade security.",
  },
];

const AUTO_CYCLE_INTERVAL = 3000;

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-cycle through capabilities when in view and not hovering
  useEffect(() => {
    if (!isInView || isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % capabilities.length);
    }, AUTO_CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView, isHovering]);

  // Intersection observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="scroll-mt-20 py-20 md:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Workflows"
          title="Capabilities that compound."
          description="Legal intelligence designed for high-trust environments. Patent pending."
        />

        <div className="mt-16 flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-20">
          {/* Typographic List */}
          <ul
            className="flex-1 space-y-1"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {capabilities.map((cap, index) => (
              <li key={cap.title}>
                <button
                  className="group flex w-full items-center gap-4 py-2 text-left transition-all duration-300"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  {/* Progress indicator */}
                  <div className="relative h-[2px] w-8 overflow-hidden rounded-full bg-[#1C1F26]/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#1C1F26]"
                      initial={{ width: 0 }}
                      animate={{
                        width: activeIndex === index ? "100%" : "0%",
                      }}
                      transition={{
                        duration: activeIndex === index && !isHovering ? AUTO_CYCLE_INTERVAL / 1000 : 0.3,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Title */}
                  <span
                    className="text-2xl font-semibold tracking-tight transition-colors duration-300 md:text-3xl lg:text-4xl"
                    style={{
                      color: activeIndex === index ? "#1C1F26" : "rgba(28, 31, 38, 0.2)",
                    }}
                  >
                    {cap.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Description Panel */}
          <div className="w-full md:w-[400px] lg:w-[480px] xl:w-[520px] md:pt-2 shrink-0">
            <div className="sticky top-32">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#E5E5E5] bg-gradient-to-br from-[#FAFAFA] to-white p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#6B7280]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1F26]/5 text-[10px] font-semibold text-[#1C1F26]">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  {capabilities[activeIndex].title}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-[#3D4149] lg:text-xl lg:mt-6">
                  {capabilities[activeIndex].description}
                </p>

                {/* Visual placeholder */}
                <div className="mt-8 aspect-[4/3] rounded-xl bg-gradient-to-br from-[#F3F4F6] to-[#E5E5E5] lg:mt-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
