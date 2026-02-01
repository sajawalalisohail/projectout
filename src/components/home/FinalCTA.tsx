"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Subtle brand gradient haze */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, var(--color-brand) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          {...fadeUp}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl lg:text-5xl">
            Invest in the way your firm works.
          </h2>

          <p className="mt-6 text-muted">
            Invite-only access for select firms.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild>
              <a href="/request-access">Request Access</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="/product">Explore Product</a>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
