"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

export function FinalCTA() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Thin divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container className="relative">
        <motion.div {...fadeUp}>
          {/* Premium bordered panel */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-10 md:p-16 lg:p-20">
            {/* Subtle gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 0%, var(--brand-purple) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="text-xs uppercase tracking-widest text-white/50">
                Early Access
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
                Invest in the way your firm works.
              </h2>

              <p className="mt-6 text-lg text-white/60 md:text-xl">
                Invite-only access for select firms. Join us in early 2026.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild className="bg-white text-[#1C1F26] hover:bg-white/90">
                  <a href="/request-access">Request a Demo</a>
                </Button>
                <Button variant="ghost" asChild className="text-white hover:bg-white/10 border border-white/10">
                  <a href="/product">Explore Product</a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-white/40">
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Enterprise-grade security
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Enterprise Security
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
