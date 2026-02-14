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
    descriptor: "Business Law",
    logo: "/trust/umina.jpg",
  },
  {
    name: "Jim Leach LC",
    descriptor: "Trial Attorneys",
    logo: "/trust/jr-law-logo.png",
  },
  {
    name: "Desai Law",
    descriptor: "Immigration Law",
    logo: "/trust/thedesaifirm.svg",
  },
  {
    name: "Sterling & Associates",
    descriptor: "Corporate Litigation",
  },
  {
    name: "Hartwell Partners",
    descriptor: "Real Estate Law",
  },
  {
    name: "Meridian Legal Group",
    descriptor: "Intellectual Property",
  },
  {
    name: "Crawford Law Firm",
    descriptor: "Family Law",
  },
];

// Duplicate array for seamless infinite scroll
const duplicatedFirms = [...firms, ...firms];

export function TrustBar() {
  return (
    <section className="py-8 md:py-12 overflow-hidden">
      <Container>
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-widest text-[#6B7280]">
            Our clients
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1C1F26] md:text-4xl">
            Trusted by forward-thinking firms
          </h2>
        </div>
      </Container>

      {/* Premium container with visible border and subtle shadow */}
      <div className="relative mx-auto max-w-5xl px-4">
        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(135, 18, 247, 0.04) 0%, transparent 70%)'
          }}
          aria-hidden="true"
        />

        {/* Carousel wrapper with premium border treatment */}
        <div className="relative rounded-xl border border-[rgba(28,31,38,0.08)] bg-gradient-to-b from-[#FAFAFA] to-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          {/* Subtle gradient accent line at top */}
          <div
            className="absolute top-0 left-6 right-6 h-px opacity-25"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #8712F7 50%, transparent 100%)' }}
            aria-hidden="true"
          />

          {/* Inner carousel container */}
          <div className="relative overflow-hidden rounded-lg">
            {/* Gradient masks for fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

            {/* Scrolling track */}
            <div
              className="flex gap-4 animate-trust-scroll py-1"
              style={{ width: "max-content" }}
            >
              {duplicatedFirms.map((firm, index) => (
                <FirmCard key={`${firm.name}-${index}`} firm={firm} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FirmCard({ firm }: { firm: Firm }) {
  return (
    <div className="group relative flex w-[200px] shrink-0 flex-col items-center gap-3 rounded-lg border border-[rgba(28,31,38,0.06)] bg-white px-4 py-4 transition-all duration-300 hover:border-[rgba(135,18,247,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
      {/* Subtle hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(135, 18, 247, 0.03) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      {/* Logo area - Larger */}
      <div className="relative flex h-12 w-full items-center justify-center">
        {firm.logo ? (
          <div className="relative h-11 w-24 grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
            <Image
              src={firm.logo}
              alt={`${firm.name} logo`}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1C1F26]/5 text-lg font-semibold text-[#6B7280] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[rgba(81,157,253,0.1)] group-hover:to-[rgba(135,18,247,0.1)] group-hover:text-[#1C1F26]">
            {firm.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Firm info */}
      <div className="relative text-center">
        <p className="text-sm font-medium text-[#1C1F26]/80 transition-colors duration-300 group-hover:text-[#1C1F26]">
          {firm.name}
        </p>
        <p className="mt-0.5 text-xs text-[#6B7280] transition-colors duration-300 group-hover:text-[#3D4149]">
          {firm.descriptor}
        </p>
      </div>
    </div>
  );
}
