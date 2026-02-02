"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const teamMembers = [
  {
    name: "Ryan J. Umina, Esq.",
    role: "CEO",
    image: "Ryan.png",
    bio: "Ryan Umina is a nationally recognized trial attorney and fintech founder who has recovered over $200 million for self-employed Americans through innovative legal and financial solutions. A Super Lawyers® Rising Star from 2020 to 2025 and a Top 40 Under 40 honoree by the National Trial Lawyers Association, Ryan is known for his fierce advocacy, deep empathy, and relentless work ethic. With years of courtroom experience and a growing reputation as a legal entrepreneur, Ryan brings both vision and discipline to Nextlex's mission of reshaping the future of law.",
  },
  {
    name: "J. Morgan Leach, Esq.",
    role: "Co-CEO",
    image: "Morgan.png",
    bio: "Morgan Leach is an accomplished litigator, entrepreneur, and public policy advocate who has handled hundreds of criminal, family, and civil matters across federal and state courts. Named a Super Lawyers® Rising Star (2023–2025) and Top 40 Under 40 by the National Trial Lawyers, Morgan brings deep legal insight and sharp product instincts to his role at Nextlex. He is a trusted voice on regulatory strategy and legal innovation, ensuring that Nextlex always builds with attorneys, and the real-world courtroom, in mind.",
  },
  {
    name: "Dr. Anna Zakowska",
    role: "Chief Scientist",
    image: "Anna.png",
    bio: "Dr. Anna Zakowska is a Ph.D.-level data scientist and AI researcher with over a decade of experience building machine learning systems in natural language processing, computer vision, and big data platforms. With an academic background spanning both engineering and business (MBA), she has led teams that deployed AI solutions across multiple sectors. At Nextlex, Anna leads the development of intelligent orchestration engines that are redefining productivity in the legal profession.",
  },
  {
    name: "Freddie Charles Mills",
    role: "President / Co-Chairman",
    image: "Freddie.jpg",
    bio: "Freddie Mills is a serial entrepreneur, visionary leader, and master of scale. With a storied career spanning publishing, telecom, energy, and fintech, Freddie has built and exited companies across multiple industries, often spotting trends long before they go mainstream. From purchasing his first home at 18 to launching and selling multiple companies before age 30—including West Coast Golfer Magazine and seven regional telephone directories—Freddie has always had a talent for identifying opportunity. He went on to build the largest subcontractor for Comcast in the U.S., managing 21 offices in 17 states, and later helped hundreds of thousands of Americans switch to lower-cost energy through one of the fastest-growing companies in the country at the time. In 2016, he expanded into solar, launching several ventures including Weathermark Roofing and Solar in Texas. Most recently, Freddie turned his attention to government-backed stimulus programs, co-founding SETC Pros, which has helped recover over $200 million in federal tax credits for self-employed Americans since 2023. Today, as President and Chairman of Nextlex™, Freddie is once again ahead of the curve—helping lead the development of a next-generation legal technology platform designed to solve one of the legal industry's most frustrating problems: disjointed software and workflow chaos. With a deep understanding of operational scale, product-market fit, and strategic execution, Freddie's leadership continues to shape the future of fintech and legal tech alike.",
  },
  {
    name: "Leo Drinkard",
    role: "COO / Ops",
    image: "Leo.jpg",
    bio: "Leo Drinkard is a fintech operations executive with a strong background in energy and SaaS operations. Formerly part of the management team at the fourth-largest energy company in the U.S., Leo has since led operational scale-up efforts for fintech platforms that recovered over $200 million for self-employed Americans. At Nextlex, he drives day-to-day execution, vendor relations, and customer experience.",
  },
  {
    name: "Craig LeBlanc",
    role: "Chief Technology Officer",
    image: "Craig.jpg",
    bio: "Craig LeBlanc is a senior systems architect with over two decades of experience building enterprise-grade infrastructure across the fintech, gaming, and legal tech sectors. He previously led the architecture of a proprietary fintech platform that helped recover over $200 million for American workers. At Nextlex, Craig oversees technical execution, platform scalability, and system security.",
  },
  {
    name: "Andrew Cartwright",
    role: "Co-Chairman",
    image: "Andrew.PNG",
    bio: "Andrew Cartwright is a serial entrepreneur and strategic investor who has built and scaled ventures across 17 industries, from real estate to technology to media. With a digital audience of over 1 million followers, he brings decades of experience in brand building, viral growth, and visionary execution. As Co-Chairman of Nextlex, Andrew helps shape the company's market presence and storytelling strategy—bridging innovation with impact. He's also an Ironman World Championship finisher, bringing the same endurance and discipline to every venture he champions.",
  },
  {
    name: "Lauren Drinkard",
    role: "Chief AI Architect",
    image: "Lauren.PNG",
    bio: "Lauren Drinkard is a three-time tech founder, AI strategist, and keynote speaker with deep expertise in transforming complex machine learning models into practical, user-focused business tools. With experience spanning healthcare, AI, and enterprise operations, and a master's degree from the University of Pennsylvania, Lauren leads the AI architecture at Nextlex, ensuring our systems deliver real value where attorneys need it most.",
  },
  {
    name: "J. Berkeley Bentley, Esq.",
    role: "Chief Biz Dev Officer",
    image: "Berkeley.png",
    bio: "Berkeley Bentley is a seasoned legal executive who has served as General Counsel to a U.S. Governor and directed strategic partnerships at a national level. Known for bridging the worlds of public policy, private sector innovation, and law, Berkeley leads business development and strategic alliances at Nextlex, bringing unmatched relationship-building skills to the table.",
  },
];

function TeamCard({ member }: { member: typeof teamMembers[0] }) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const initials = member.name
    .split(" ")
    .filter((part) => !part.includes(".") && !part.includes(","))
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  // Create a preview (first sentence or first ~120 chars)
  const previewLength = 120;
  const bioPreview = member.bio.length > previewLength
    ? member.bio.slice(0, member.bio.indexOf(" ", previewLength)) + "..."
    : member.bio;

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
      {/* Photo */}
      <div className="relative mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full bg-white/10">
        {!imageError ? (
          <Image
            src={`/team/${member.image}`}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white/40">
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-semibold text-white">{member.name}</h3>
        <p className="mt-1 text-sm text-white/60">{member.role}</p>

        {/* Bio */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.p
                key="full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-sm leading-relaxed text-white/50 text-left"
              >
                {member.bio}
              </motion.p>
            ) : (
              <motion.p
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm leading-relaxed text-white/50 text-left"
              >
                {bioPreview}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-xs font-medium text-white/40 transition-colors duration-200 hover:text-white/70"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-20 py-20 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Leadership"
          title="Meet our Management Team and Board of Directors"
          dark
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
