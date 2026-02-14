"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Feature {
  name: string;
  nextlex: boolean;
  claude: boolean;
  chatgpt: boolean;
  category?: string;
}

const features: Feature[] = [
  { name: "Built for legal teams", nextlex: true, claude: false, chatgpt: false, category: "Legal AI & Workflows" },
  { name: "Legal-specific AI workflows", nextlex: true, claude: false, chatgpt: false },
  { name: "Citation management & validation", nextlex: true, claude: false, chatgpt: false },
  { name: "AI document drafting & processing", nextlex: true, claude: true, chatgpt: true },
  { name: "Legal research tools", nextlex: true, claude: false, chatgpt: false, category: "Research & Drafting" },
  { name: "Research memo generation", nextlex: true, claude: false, chatgpt: false },
  { name: "In-house prompt library", nextlex: true, claude: false, chatgpt: false },
  { name: "Microsoft Word, Gmail & 365", nextlex: true, claude: false, chatgpt: false, category: "Integrations" },
  { name: "Clio integration", nextlex: true, claude: false, chatgpt: false },
  { name: "Phone, SMS & Zoom", nextlex: true, claude: false, chatgpt: false },
  { name: "Legal billing automation", nextlex: true, claude: false, chatgpt: false, category: "Operations" },
  { name: "Secure enterprise environment", nextlex: true, claude: false, chatgpt: false },
];

function GradientCheckIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#519DFD" />
          <stop offset="50%" stopColor="#8712F7" />
          <stop offset="100%" stopColor="#F012E5" />
        </linearGradient>
      </defs>
      <path
        fill="url(#checkGradient)"
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-white/20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FeatureComparison() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const containerAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
        transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as const },
      };

  return (
    <section ref={ref} id="comparison" className="scroll-mt-20 py-16 md:py-24">
      <div
        className="mx-auto mb-16 h-px max-w-4xl"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(135, 18, 247, 0.2) 50%, transparent 100%)' }}
        aria-hidden="true"
      />
      <Container>
        <SectionHeading
          eyebrow="Comparison"
          title="Built different. Built for legal."
          description="See how Nextlex stacks up against general-purpose AI tools."
          dark
        />

        <motion.div className="mt-16" {...containerAnimation}>
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_4px_40px_rgba(0,0,0,0.2)]">
            <div
              className="absolute top-0 left-8 right-8 h-px opacity-40"
              style={{ background: 'linear-gradient(90deg, transparent 0%, #519DFD 25%, #8712F7 50%, #F012E5 75%, transparent 100%)' }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(135, 18, 247, 0.06) 0%, transparent 70%)'
              }}
              aria-hidden="true"
            />

            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-6 py-5 text-left text-sm font-semibold text-white">
                      Features
                    </th>
                    <th className="relative px-6 py-5 text-center text-sm font-semibold text-white w-[120px]">
                      <span className="relative">
                        Nextlex
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                          style={{ background: 'linear-gradient(90deg, #519DFD 0%, #8712F7 50%, #F012E5 100%)' }}
                          aria-hidden="true"
                        />
                      </span>
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-white/50 w-[120px]">
                      Claude
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-white/50 w-[120px]">
                      ChatGPT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <>
                      {feature.category && (
                        <tr key={`cat-${feature.category}`} className="border-b border-white/5">
                          <td colSpan={4} className="px-6 pt-5 pb-2 text-xs font-semibold uppercase tracking-wider text-white/30">
                            {feature.category}
                          </td>
                        </tr>
                      )}
                      <tr
                        key={feature.name}
                        className={`border-b border-white/5 last:border-b-0 transition-colors duration-150 hover:bg-white/[0.02] ${
                          index % 2 === 1 ? "bg-white/[0.01]" : ""
                        }`}
                      >
                        <td className="px-6 py-3.5 text-sm text-white/70">
                          {feature.name}
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex justify-center">
                            {feature.nextlex ? <GradientCheckIcon /> : <XIcon />}
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex justify-center">
                            {feature.claude ? <CheckIcon /> : <XIcon />}
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex justify-center">
                            {feature.chatgpt ? <CheckIcon /> : <XIcon />}
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            Feature availability may vary by plan and configuration.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
