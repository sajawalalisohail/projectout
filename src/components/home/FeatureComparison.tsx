"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  { name: "Built for legal teams", nextlex: true, claude: false, chatgpt: false },
  { name: "Legal-specific AI workflows", nextlex: true, claude: false, chatgpt: false },
  { name: "Legal research tools", nextlex: true, claude: false, chatgpt: false },
  { name: "Citation management", nextlex: true, claude: false, chatgpt: false },
  { name: "Citation validation", nextlex: true, claude: false, chatgpt: false },
  { name: "AI document drafting (legal)", nextlex: true, claude: true, chatgpt: true },
  { name: "AI document processing", nextlex: true, claude: false, chatgpt: false },
  { name: "Research memo generation", nextlex: true, claude: false, chatgpt: false },
  { name: "Court information access", nextlex: true, claude: false, chatgpt: false },
  { name: "Custom legal fields", nextlex: true, claude: false, chatgpt: false },
  { name: "In-house prompt library", nextlex: true, claude: false, chatgpt: false },
  { name: "Secure enterprise environment", nextlex: true, claude: false, chatgpt: false },
  { name: "Microsoft Word workflows", nextlex: true, claude: false, chatgpt: false },
  { name: "Gmail & Microsoft 365 integration", nextlex: true, claude: false, chatgpt: false },
  { name: "Clio integration", nextlex: true, claude: false, chatgpt: false },
  { name: "Multi-channel communications", nextlex: true, claude: false, chatgpt: false },
  { name: "Phone, SMS, Zoom integrations", nextlex: true, claude: false, chatgpt: false },
  { name: "Legal billing automation", nextlex: true, claude: false, chatgpt: false },
  { name: "Priority enterprise support", nextlex: true, claude: false, chatgpt: false },
];

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-emerald-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
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
    <svg
      className="h-5 w-5 text-gray-300"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
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
        transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] },
      };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#FAFAFA]">
      <Container>
        <SectionHeading
          eyebrow="Comparison"
          title="Built different. Built for legal."
          description="See how Nextlex stacks up against general-purpose AI tools."
        />

        <motion.div className="mt-16" {...containerAnimation}>
          {/* Card wrapper */}
          <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
            {/* Scrollable table container */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                {/* Header */}
                <thead>
                  <tr className="border-b border-black/[0.06] bg-[#FAFAFA]">
                    <th className="px-6 py-5 text-left text-sm font-semibold text-fg">
                      Features
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-fg w-[120px]">
                      Nextlex
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-muted w-[120px]">
                      Claude
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-muted w-[120px]">
                      ChatGPT
                    </th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={`border-b border-black/[0.04] last:border-b-0 ${
                        index % 2 === 1 ? "bg-[#FAFAFA]/50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-fg/80">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {feature.nextlex ? <CheckIcon /> : <XIcon />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {feature.claude ? <CheckIcon /> : <XIcon />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {feature.chatgpt ? <CheckIcon /> : <XIcon />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footnote */}
          <p className="mt-6 text-center text-xs text-muted">
            Feature availability may vary by plan and configuration.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
