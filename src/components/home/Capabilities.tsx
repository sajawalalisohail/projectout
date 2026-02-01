"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const capabilities = [
  {
    title: "Legal Research",
    description: "Surface relevant precedents and statutes in seconds, not hours.",
  },
  {
    title: "Citation Management",
    description: "Organize, format, and update citations across all your documents.",
  },
  {
    title: "Citation Validation",
    description: "Automatically verify that every citation is accurate and current.",
  },
  {
    title: "AI Drafting",
    description: "Generate first drafts grounded in your firm's style and precedents.",
  },
  {
    title: "Document Processing",
    description: "Extract key clauses and data points from any contract or filing.",
  },
  {
    title: "Research Memos",
    description: "Turn complex questions into structured, cite-checked memoranda.",
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

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="capabilities" className="scroll-mt-20 py-20 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Workflows"
          title="Capabilities that compound."
          description="Legal intelligence designed for high-trust environments."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr,320px] lg:gap-16">
          {/* Typographic List */}
          <ul className="space-y-2 md:space-y-3">
            {capabilities.map((cap, index) => (
              <li key={cap.title}>
                <button
                  className="w-full text-left text-3xl font-semibold tracking-tight transition-colors duration-200 md:text-5xl"
                  style={{
                    color: activeIndex === index ? "var(--color-fg)" : "rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                >
                  {cap.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Description Panel (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div
                className="min-h-[120px] rounded-xl border border-black/5 bg-black/[0.02] p-6 transition-opacity duration-200"
                style={{ opacity: activeIndex !== null ? 1 : 0 }}
              >
                {activeIndex !== null && (
                  <>
                    <p className="text-xs uppercase tracking-widest text-muted">
                      {capabilities[activeIndex].title}
                    </p>
                    <p className="mt-3 text-base text-fg/80">
                      {capabilities[activeIndex].description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
