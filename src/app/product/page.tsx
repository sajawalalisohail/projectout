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

export default function ProductPage() {
  return (
    <main className="pb-20 pt-32 md:pt-40">
      <Container>
        <SectionHeading
          eyebrow="Product"
          title="One platform. Every workflow."
          description="Nextlex consolidates the tools your firm relies on into a single, secure environment."
        />

        <div className="mt-12 max-w-2xl space-y-6 text-muted">
          <p>
            Legal work has always demanded precision. But too often, that precision
            is lost between disconnected systems—research in one place, drafting
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
    </main>
  );
}
