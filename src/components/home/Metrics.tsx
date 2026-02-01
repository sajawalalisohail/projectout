import { Container } from "@/components/ui/Container";

const metrics = [
  { value: "90%", label: "Faster contract review" },
  { value: "10x", label: "ROI in first year" },
  { value: "500+", label: "Enterprise customers" },
  { value: "99.9%", label: "Uptime SLA" },
];

export function Metrics() {
  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <Container>
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-4xl font-semibold tracking-tight text-fg">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-muted">{metric.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
