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
        <VideoSection />
        <ValueSection />
        <Capabilities />
      </section>

      {/* DARK SECTION - Results and beyond */}
      <section data-nav-theme="dark" className="bg-[#0b0d12] text-white">
        <Metrics />
        <Security />
        <FeatureComparison />
        <Testimonial />
        <FinalCTA />
      </section>
    </>
  );
}
