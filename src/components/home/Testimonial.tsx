"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeUp } from "@/lib/motion";

export function Testimonial() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          {...fadeUp}
        >
          {/* Portrait Placeholder */}
          <div className="mx-auto mb-10 h-16 w-16 rounded-full bg-black/[0.06]" />

          {/* Quote */}
          <blockquote className="text-2xl font-medium leading-relaxed tracking-tight text-fg md:text-3xl lg:text-4xl">
            &ldquo;Nextlex brought calm back to our workflow—research, drafting, and review finally feel unified.&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="mt-10 space-y-1">
            <p className="text-sm text-muted">Partner Name</p>
            <p className="text-xs text-muted/60">Managing Partner, Firm Name LLP</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
