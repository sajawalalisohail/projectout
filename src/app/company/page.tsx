import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamSection } from "@/components/company/TeamSection";

const values = [
  {
    title: "Precision",
    description: "Every detail matters. We build tools that reflect the rigor legal work demands.",
  },
  {
    title: "Trust",
    description: "Security and confidentiality are non-negotiable. Your clients' data is sacred.",
  },
  {
    title: "Simplicity",
    description: "Complex problems deserve elegant solutions. We remove friction, not add features.",
  },
  {
    title: "Partnership",
    description: "We succeed when you succeed. Your feedback shapes our roadmap.",
  },
];

export default function CompanyPage() {
  return (
    <main>
      {/* LIGHT SECTION - Top half */}
      <section data-nav-theme="light" className="bg-white text-[#1C1F26] pb-20 pt-32 md:pt-40">
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
          </div>
        </Container>
      </section>

      {/* DARK SECTION - Bottom half */}
      <section data-nav-theme="dark" className="bg-[#0b0d12] text-white py-20 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title="What drives us."
            dark
          />

          <div className="mt-12 max-w-2xl space-y-8 text-lg leading-relaxed text-white/70">
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

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-shadow duration-200 hover:shadow-lg"
              >
                <h3 className="font-medium text-white">{value.title}</h3>
                <p className="text-sm text-white/60">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-white/10 pt-12">
            <p className="text-xs uppercase tracking-widest text-white/40">
              San Francisco, CA
            </p>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section data-nav-theme="dark" className="bg-[#0b0d12] text-white border-t border-white/5">
        <TeamSection />
      </section>
    </main>
  );
}
