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
      <Hero />
      <TrustBar />
      <ValueSection />
      <Capabilities />
      <Metrics />
      <Security />
      <Testimonial />
      <FinalCTA />
    </>
  );
}
