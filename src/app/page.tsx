import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ValueSection } from "@/components/home/ValueSection";
import { Capabilities } from "@/components/home/Capabilities";
import { Metrics } from "@/components/home/Metrics";
import { Security } from "@/components/home/Security";
import { Testimonial } from "@/components/home/Testimonial";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      {/* Hero section - has its own dark background with images */}
      <Hero />

      {/* LIGHT SECTION - Top half of content after hero */}
      <section data-nav-theme="light" className="bg-white text-[#1C1F26]">
        <TrustBar />
        <ValueSection />
        <Capabilities />
      </section>

      {/* DARK SECTION - Bottom half of content */}
      <section data-nav-theme="dark" className="bg-[#0b0d12] text-white">
        <Metrics />
        <Security />
        <Testimonial />
        <FinalCTA />
      </section>
    </>
  );
}
