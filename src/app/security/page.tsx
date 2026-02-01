import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const securityFeatures = [
  {
    title: "SOC 2 readiness",
    description: "Architected for compliance from day one.",
  },
  {
    title: "Data isolation",
    description: "Your data never leaves your secure environment.",
  },
  {
    title: "Audit-friendly exports",
    description: "Full activity logs, exportable on demand.",
  },
  {
    title: "Access controls",
    description: "Role-based permissions at every level.",
  },
];

export default function SecurityPage() {
  return (
    <main className="pb-20 pt-32 md:pt-40">
      <Container>
        <SectionHeading
          eyebrow="Security"
          title="Trust is the foundation."
          description="Enterprise-grade security for firms that cannot compromise."
        />

        <div className="mt-12 max-w-2xl space-y-6 text-muted">
          <p>
            Your clients trust you with their most sensitive matters. We take
            that responsibility seriously. Nextlex is built from the ground up
            with security at its core—not as an afterthought.
          </p>
          <p>
            Every feature, every integration, every line of code is designed
            with confidentiality and compliance in mind.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature) => (
            <Card key={feature.title} className="space-y-2">
              <h3 className="font-medium text-fg">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
