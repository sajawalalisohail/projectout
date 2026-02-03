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
    descriptor: "Business Law • New York",
    logo: "/trust/umina.jpg",
  },
  {
    name: "Jim Leach LC",
    descriptor: "Trial Attorneys • Iowa",
    logo: "/trust/jr-law-logo.png",
  },
  {
    name: "Desai Law",
    descriptor: "Immigration Law • Texas",
    logo: "/trust/thedesaifirm.svg",
  },
  {
    name: "Sterling & Associates",
    descriptor: "Corporate Litigation • Chicago",
  },
  {
    name: "Hartwell Partners",
    descriptor: "Real Estate Law • Boston",
  },
  {
    name: "Meridian Legal Group",
    descriptor: "Intellectual Property • San Francisco",
  },
  {
    name: "Crawford Law Firm",
    descriptor: "Family Law • Atlanta",
  },
];

// Duplicate array for seamless infinite scroll
const duplicatedFirms = [...firms, ...firms];

export function TrustBar() {
  return (
    <section className="py-16 overflow-hidden">
      <Container>
        <p className="mb-12 text-center text-xs uppercase tracking-widest text-[#6B7280]">
          Trusted by forward-thinking firms
        </p>
      </Container>

      {/* Carousel wrapper */}
      <div className="relative">
        {/* Gradient masks for fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

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
    <div className="group flex w-[280px] shrink-0 flex-col items-center gap-4 rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] px-8 py-6 transition-all duration-300 hover:border-[#D1D5DB] hover:bg-[#F3F4F6]">
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1C1F26]/5 text-lg font-semibold text-[#6B7280] transition-colors duration-300 group-hover:bg-[#1C1F26]/10 group-hover:text-[#1C1F26]">
            {firm.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Firm info */}
      <div className="text-center">
        <p className="text-sm font-medium text-[#1C1F26]/80 transition-colors duration-300 group-hover:text-[#1C1F26]">
          {firm.name}
        </p>
        <p className="mt-1 text-xs text-[#6B7280] transition-colors duration-300 group-hover:text-[#3D4149]">
          {firm.descriptor}
        </p>
      </div>
    </div>
  );
}
