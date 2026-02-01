import { Container } from "@/components/ui/Container";

export function Testimonial() {
  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-medium leading-relaxed text-fg md:text-3xl">
            &ldquo;Nextlex transformed how our legal team operates. What used to
            take days now takes hours.&rdquo;
          </blockquote>
          <div className="mt-8">
            <p className="font-medium text-fg">Sarah Chen</p>
            <p className="text-sm text-muted">General Counsel, Acme Corp</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
