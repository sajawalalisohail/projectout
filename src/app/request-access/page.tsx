"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const benefits = [
  {
    title: "Priority access",
    description: "Be among the first to experience Nextlex when we launch.",
  },
  {
    title: "Direct feedback channel",
    description: "Shape the product with your input during beta.",
  },
  {
    title: "Dedicated onboarding",
    description: "Personal setup assistance from our team.",
  },
  {
    title: "Founding member pricing",
    description: "Lock in special rates available only to early adopters.",
  },
];

export default function RequestAccessPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      {/* LIGHT SECTION - Top half with form */}
      <section data-nav-theme="light" className="bg-white text-[#1C1F26] pb-20 pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-lg">
            <SectionHeading
              eyebrow="Early Access"
              title="Request an invitation."
              description="Nextlex is currently invite-only. Leave your email and we'll be in touch."
              className="text-center [&>*]:mx-auto"
            />

            <div className="mt-12">
              {status === "success" ? (
                <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                    <svg
                      className="h-6 w-6 text-brand"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-fg">You&apos;re on the list.</p>
                  <p className="mt-2 text-sm text-muted">
                    We&apos;ll reach out when it&apos;s your turn.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="you@yourfirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    disabled={status === "loading"}
                    required
                  />

                  {status === "error" && errorMessage && (
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Submitting..." : "Request Access"}
                  </Button>

                  <p className="text-center text-xs text-muted">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* DARK SECTION - Bottom half with benefits */}
      <section data-nav-theme="dark" className="bg-[#0b0d12] text-white py-20 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Why join early?"
            title="Benefits of early access."
            description="Get ahead of the curve with exclusive perks for founding members."
            dark
            className="text-center [&>*]:mx-auto"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-shadow duration-200 hover:shadow-lg"
              >
                <h3 className="font-medium text-white">{benefit.title}</h3>
                <p className="text-sm text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
