import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { VideoSection } from "@/components/home/VideoSection";
import { ValueSection } from "@/components/home/ValueSection";
import { Capabilities } from "@/components/home/Capabilities";
import { FeatureComparison } from "@/components/home/FeatureComparison";
import { Metrics } from "@/components/home/Metrics";
import { Security } from "@/components/home/Security";
import { Testimonial } from "@/components/home/Testimonial";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      {/* Hero section - has its own dark background with images */}
      <Hero />

      {/* LIGHT SECTION - Content after hero */}
      <section data-nav-theme="light" className="light-section bg-white">
        <TrustBar />
        <div className="nx-divider-gradient mx-auto max-w-4xl" />
        <VideoSection />
        <div className="nx-divider-gradient mx-auto max-w-4xl" />
        <ValueSection />
        <div className="nx-divider-gradient mx-auto max-w-4xl" />
        <Capabilities />
      </section>

      {/* DARK SECTION - Results and beyond */}
      <section data-nav-theme="dark" className="relative bg-[#0b0d12] text-white">
        {/* Gradient accent line at top of dark section */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #519DFD 25%, #8712F7 50%, #F012E5 75%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Subtle radial accent glow at top */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(135, 18, 247, 0.05) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        {/* Subtle radial accent glow at bottom */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(135, 18, 247, 0.06) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <Metrics />
        <Security />
        <FeatureComparison />
        <Testimonial />
        <FinalCTA />
      </section>
    </>
  );
}
