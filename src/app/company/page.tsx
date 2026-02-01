import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function CompanyPage() {
  return (
    <main className="pb-20 pt-32 md:pt-40">
      <Container>
        <SectionHeading
          eyebrow="Company"
          title="Built by lawyers, for lawyers."
        />

        <div className="mt-12 max-w-2xl space-y-8 text-lg leading-relaxed text-muted">
          <p>
            We started Nextlex because we lived the problem. Years spent
            toggling between research databases, document editors, and
            collaboration tools—each one promising to make legal work easier,
            none of them talking to each other.
          </p>

          <p>
            The result was always the same: fragmented workflows, duplicated
            effort, and a nagging sense that there had to be a better way.
          </p>

          <p>
            So we built one.
          </p>

          <p>
            Nextlex unifies the tools your firm depends on into a single,
            focused environment. Research flows into drafting. Drafting flows
            into review. Every step connected, every citation verified, every
            collaborator aligned.
          </p>

          <p>
            Our goal is simple: bring precision and calm back to legal work.
            No noise, no clutter—just the clarity your clients expect and your
            team deserves.
          </p>
        </div>

        <div className="mt-16 border-t border-black/5 pt-12">
          <p className="text-xs uppercase tracking-widest text-muted">
            San Francisco, CA
          </p>
        </div>
      </Container>
    </main>
  );
}
