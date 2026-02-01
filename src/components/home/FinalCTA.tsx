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
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
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
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Invest in the way your firm works.
          </h2>

          <p className="mt-6 text-white/60">
            Invite-only access for select firms.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild className="bg-white text-[#1C1F26] hover:bg-white/90">
              <a href="/request-access">Request Access</a>
            </Button>
            <Button variant="ghost" asChild className="text-white hover:bg-white/10">
              <a href="/product">Explore Product</a>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
