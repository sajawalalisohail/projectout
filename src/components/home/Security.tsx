import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const badges = ["SOC 2 Type II", "GDPR", "HIPAA", "ISO 27001"];

export function Security() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Security"
            title="Enterprise-grade protection"
            description="Your data is encrypted at rest and in transit. We meet the highest compliance standards."
            className="items-center text-center [&>p]:mx-auto"
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-muted"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
