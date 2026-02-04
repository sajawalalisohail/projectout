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

const complianceFeatures = [
  {
    title: "End-to-end encryption",
    description: "All data encrypted in transit and at rest using AES-256.",
  },
  {
    title: "Regular penetration testing",
    description: "Third-party security assessments conducted quarterly.",
  },
  {
    title: "Disaster recovery",
    description: "Multi-region backups with 99.99% uptime SLA.",
  },
  {
    title: "Privacy by design",
    description: "GDPR and CCPA compliant data handling practices.",
  },
];

export default function SecurityPage() {
  return (
    <main>
      {/* LIGHT SECTION - Top half */}
      <section data-nav-theme="light" className="bg-white text-[#1C1F26] pb-20 pt-32 md:pt-40">
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
              with security at its core, not as an afterthought.
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
      </section>

      {/* DARK SECTION - Bottom half */}
      <section data-nav-theme="dark" className="bg-[#0b0d12] text-white py-20 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Compliance"
            title="Enterprise-ready from day one."
            description="Meeting the highest standards for data protection and privacy."
            dark
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {complianceFeatures.map((feature) => (
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
