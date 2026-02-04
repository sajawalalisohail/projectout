import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const capabilities = [
  "Legal Research",
  "Citation Management",
  "Citation Validation",
  "AI Drafting",
  "Document Processing",
  "Research Memos",
  "Court Information",
  "Secure Collaboration",
];

const features = [
  {
    title: "Unified Workspace",
    description: "Everything your team needs, in one place. No more context switching.",
  },
  {
    title: "AI-Powered Research",
    description: "Surface relevant precedents and statutes with intelligent search.",
  },
  {
    title: "Verified Citations",
    description: "Every citation automatically checked against authoritative sources.",
  },
  {
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with end-to-end encryption.",
  },
];

export default function ProductPage() {
  return (
    <main>
      {/* LIGHT SECTION - Top half */}
      <section data-nav-theme="light" className="bg-white text-[#1C1F26] pb-20 pt-32 md:pt-40">
        <Container>
          <SectionHeading
            eyebrow="Product"
            title="One platform. Every workflow."
            description="Nextlex consolidates the tools your firm relies on into a single, secure environment."
          />

          <div className="mt-12 max-w-2xl space-y-6 text-muted">
            <p>
              Legal work has always demanded precision. But too often, that precision
              is lost between disconnected systems: research in one place, drafting
              in another, collaboration scattered across email threads.
            </p>
            <p>
              Nextlex brings everything together. From initial research to final
              review, your team works in one unified space designed for the way
              lawyers actually think.
            </p>
          </div>

          <div className="mt-16">
            <h3 className="text-xs uppercase tracking-widest text-muted">
              Capabilities
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((cap) => (
                <li
                  key={cap}
                  className="rounded-lg border border-black/5 bg-black/[0.02] px-4 py-3 text-sm text-fg"
                >
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* DARK SECTION - Bottom half */}
      <section data-nav-theme="dark" className="bg-[#0b0d12] text-white py-20 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Features"
            title="Built for modern legal teams."
            description="Every feature designed to help you work smarter, not harder."
            dark
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-shadow duration-200 hover:shadow-lg"
              >
                <h3 className="font-medium text-white">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
