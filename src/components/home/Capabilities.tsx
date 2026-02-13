"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NavRail } from "./capabilities/NavRail";
import { ScreenshotDisplay } from "./capabilities/ScreenshotDisplay";
import { Lightbox } from "./capabilities/Lightbox";
import { PILLARS } from "./capabilities/capabilitiesData";

export function Capabilities() {
  const [expandedPillarIndex, setExpandedPillarIndex] = useState(0);
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentPillar = PILLARS[activePillarIndex];

  const handlePillarExpand = useCallback((index: number) => {
    setExpandedPillarIndex(index);
  }, []);

  const handleScreenshotSelect = useCallback(
    (pillarIndex: number, screenshotIndex: number) => {
      setActivePillarIndex(pillarIndex);
      setActiveScreenshotIndex(screenshotIndex);
      setExpandedPillarIndex(pillarIndex);
    },
    []
  );

  const handleOpenLightbox = useCallback(() => {
    setLightboxIndex(activeScreenshotIndex);
    setLightboxOpen(true);
  }, [activeScreenshotIndex]);

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleLightboxIndexChange = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <section id="capabilities" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Platform"
          title="Explore the platform."
          description="Six integrated capabilities. One connected workspace. Click any screen to explore."
        />
      </Container>

      {/* Full-width layout below heading */}
      <div className="mx-auto mt-12 max-w-[1600px] px-6 lg:mt-16 lg:px-8">
        {/* Desktop: side-by-side */}
        <div className="hidden lg:flex lg:gap-12">
          <NavRail
            pillars={PILLARS}
            expandedPillarIndex={expandedPillarIndex}
            activePillarIndex={activePillarIndex}
            activeScreenshotIndex={activeScreenshotIndex}
            onPillarExpand={handlePillarExpand}
            onScreenshotSelect={handleScreenshotSelect}
          />
          <ScreenshotDisplay
            pillar={currentPillar}
            pillarIndex={activePillarIndex}
            activeScreenshotIndex={activeScreenshotIndex}
            onImageClick={handleOpenLightbox}
            isFirstDefault={activePillarIndex === 0}
          />
        </div>

        {/* Mobile: accordion */}
        <div className="lg:hidden">
          <MobileAccordion
            activePillarIndex={activePillarIndex}
            activeScreenshotIndex={activeScreenshotIndex}
            onScreenshotSelect={handleScreenshotSelect}
            onImageClick={(pillarIdx, ssIdx) => {
              setActivePillarIndex(pillarIdx);
              setActiveScreenshotIndex(ssIdx);
              setLightboxIndex(ssIdx);
              setLightboxOpen(true);
            }}
          />
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          screenshots={currentPillar.screenshots}
          activeIndex={lightboxIndex}
          onIndexChange={handleLightboxIndexChange}
          onClose={handleCloseLightbox}
        />
      )}
    </section>
  );
}

/* ─── Mobile Accordion ─── */

function MobileAccordion({
  activePillarIndex,
  activeScreenshotIndex,
  onScreenshotSelect,
  onImageClick,
}: {
  activePillarIndex: number;
  activeScreenshotIndex: number;
  onScreenshotSelect: (pillarIndex: number, ssIndex: number) => void;
  onImageClick: (pillarIndex: number, ssIndex: number) => void;
}) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="space-y-2">
      {PILLARS.map((pillar, pillarIndex) => {
        const isExpanded = pillarIndex === expandedIndex;

        return (
          <div
            key={pillar.title}
            className="overflow-hidden rounded-xl border border-black/[0.06]"
          >
            {/* Pillar header */}
            <button
              className="flex w-full items-center justify-between px-4 py-3.5 text-left"
              onClick={() => {
                setExpandedIndex(isExpanded ? -1 : pillarIndex);
                if (!isExpanded) {
                  onScreenshotSelect(pillarIndex, 0);
                }
              }}
              aria-expanded={isExpanded}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-[#1C1F26]">
                {pillar.title}
                {pillar.badge && (
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #519DFD 0%, #8712F7 100%)",
                    }}
                  >
                    {pillar.badge}
                  </span>
                )}
              </span>
              <svg
                className={`h-4 w-4 shrink-0 text-[#6B7280] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    {/* Subcategory pills */}
                    <div className="flex flex-wrap gap-2 pb-3">
                      {pillar.screenshots.map((ss, ssIndex) => {
                        const isActive =
                          pillarIndex === activePillarIndex &&
                          ssIndex === activeScreenshotIndex;
                        return (
                          <button
                            key={ss.title}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-[#1C1F26] text-white"
                                : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
                            }`}
                            onClick={() =>
                              onScreenshotSelect(pillarIndex, ssIndex)
                            }
                          >
                            {ss.title}
                          </button>
                        );
                      })}
                    </div>

                    {/* Screenshot */}
                    <button
                      type="button"
                      className="relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-black/[0.06]"
                      onClick={() =>
                        onImageClick(
                          pillarIndex,
                          pillarIndex === activePillarIndex
                            ? activeScreenshotIndex
                            : 0
                        )
                      }
                      aria-label={`View ${pillar.screenshots[pillarIndex === activePillarIndex ? activeScreenshotIndex : 0].title} full screen`}
                    >
                      <div
                        className="relative aspect-[16/10]"
                        style={{
                          background:
                            "linear-gradient(135deg, #F3F4F6 0%, #E5E5E5 50%, #F3F4F6 100%)",
                        }}
                      >
                        <Image
                          src={
                            pillar.screenshots[
                              pillarIndex === activePillarIndex
                                ? activeScreenshotIndex
                                : 0
                            ].src
                          }
                          alt={
                            pillar.screenshots[
                              pillarIndex === activePillarIndex
                                ? activeScreenshotIndex
                                : 0
                            ].alt
                          }
                          fill
                          className="object-contain"
                          sizes="calc(100vw - 48px)"
                        />
                      </div>
                    </button>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
