import { Container } from "@/components/ui/Container";

const firms = ["Firm A", "Firm B", "Firm C", "Firm D", "Firm E", "Firm F"];

export function TrustBar() {
  return (
    <section className="py-16">
      <Container>
        <p className="mb-10 text-center text-xs uppercase tracking-widest text-muted">
          Trusted by forward-thinking firms
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-6">
          {firms.map((firm) => (
            <div
              key={firm}
              className="flex h-14 items-center justify-center rounded-lg border border-black/5 bg-black/[0.02] px-6 opacity-60 transition-opacity duration-200 hover:opacity-100"
            >
              <span className="text-sm font-medium text-muted">
                {firm}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
