"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface Firm {
  name: string;
  descriptor: string;
  logo?: string;
}

const firms: Firm[] = [
  {
    name: "Umina Legal PLLC",
    descriptor: "Business Law \u2022 New York",
    logo: "/trust/umina.jpg",
  },
  {
    name: "Jim Leach LC",
    descriptor: "Trial Attorneys \u2022 Iowa",
    logo: "/trust/jr-law-logo.png",
  },
  {
    name: "Desai Law",
    descriptor: "Immigration Law \u2022 Texas",
    logo: "/trust/thedesaifirm.svg",
  },
  {
    name: "Sterling & Associates",
    descriptor: "Corporate Litigation \u2022 Chicago",
  },
  {
    name: "Hartwell Partners",
    descriptor: "Real Estate Law \u2022 Boston",
  },
  {
    name: "Meridian Legal Group",
    descriptor: "Intellectual Property \u2022 San Francisco",
  },
  {
    name: "Crawford Law Firm",
    descriptor: "Family Law \u2022 Atlanta",
  },
];

// Duplicate array for seamless infinite scroll
const duplicatedFirms = [...firms, ...firms];

export function TrustBar() {
  return (
    <section className="py-16 overflow-hidden">
      <Container>
        <p className="mb-12 text-center text-xs uppercase tracking-widest text-muted">
          Trusted by forward-thinking firms
        </p>
      </Container>

      {/* Carousel wrapper */}
      <div className="relative">
        {/* Gradient masks for fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-bg to-transparent" />

        {/* Scrolling track */}
        <div
          className="flex gap-8 animate-trust-scroll"
          style={{ width: "max-content" }}
        >
          {duplicatedFirms.map((firm, index) => (
            <FirmCard key={`${firm.name}-${index}`} firm={firm} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FirmCard({ firm }: { firm: Firm }) {
  return (
    <div className="group flex w-[280px] shrink-0 flex-col items-center gap-4 rounded-2xl border border-black/5 bg-black/[0.02] px-8 py-6 transition-all duration-300 hover:border-black/10 hover:bg-black/[0.03]">
      {/* Logo area */}
      <div className="flex h-12 w-full items-center justify-center">
        {firm.logo ? (
          <div className="relative h-10 w-24 grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
            <Image
              src={firm.logo}
              alt={`${firm.name} logo`}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-lg font-semibold text-muted/50 transition-colors duration-300 group-hover:bg-black/10 group-hover:text-muted">
            {firm.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Firm info */}
      <div className="text-center">
        <p className="text-sm font-medium text-fg/80 transition-colors duration-300 group-hover:text-fg">
          {firm.name}
        </p>
        <p className="mt-1 text-xs text-muted/70 transition-colors duration-300 group-hover:text-muted">
          {firm.descriptor}
        </p>
      </div>
    </div>
  );
}
