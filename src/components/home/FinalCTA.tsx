import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-muted">
            Join the waitlist for early access to Nextlex.
          </p>
          <form className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Input
              type="email"
              placeholder="Enter your work email"
              className="w-full sm:w-72"
            />
            <Button type="submit">Request Access</Button>
          </form>
          <p className="mt-4 text-xs text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}
