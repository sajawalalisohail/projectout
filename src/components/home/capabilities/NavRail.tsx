"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Pillar } from "./capabilitiesData";

interface NavRailProps {
  pillars: Pillar[];
  expandedPillarIndex: number;
  activePillarIndex: number;
  activeScreenshotIndex: number;
  onPillarExpand: (index: number) => void;
  onScreenshotSelect: (pillarIndex: number, screenshotIndex: number) => void;
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-200",
        isOpen && "rotate-180"
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function NavRail({
  pillars,
  expandedPillarIndex,
  activePillarIndex,
  activeScreenshotIndex,
  onPillarExpand,
  onScreenshotSelect,
}: NavRailProps) {
  const handlePillarClick = useCallback(
    (index: number) => {
      onPillarExpand(index);
      // Also select first screenshot of this pillar
      onScreenshotSelect(index, 0);
    },
    [onPillarExpand, onScreenshotSelect]
  );

  return (
    <nav className="lg:w-[280px] xl:w-[320px] shrink-0" aria-label="Platform capabilities">
      <div className="space-y-1">
        {pillars.map((pillar, pillarIndex) => {
          const isExpanded = pillarIndex === expandedPillarIndex;
          const isActivePillar = pillarIndex === activePillarIndex;

          return (
            <div key={pillar.title}>
              {/* Pillar header */}
              <button
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left transition-all duration-200",
                  isExpanded
                    ? "text-[#1C1F26]"
                    : "text-[#1C1F26]/50 hover:text-[#1C1F26]/80 hover:bg-black/[0.02]"
                )}
                onClick={() => handlePillarClick(pillarIndex)}
                aria-expanded={isExpanded}
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
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
                <ChevronIcon isOpen={isExpanded} />
              </button>

              {/* Subcategories */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-2 pl-3">
                      {pillar.screenshots.map((screenshot, ssIndex) => {
                        const isActive =
                          isActivePillar && ssIndex === activeScreenshotIndex;

                        return (
                          <button
                            key={screenshot.title}
                            className={cn(
                              "relative flex w-full items-center rounded-md py-2 pl-4 pr-3 text-left text-sm transition-all duration-200",
                              isActive
                                ? "text-[#1C1F26] font-medium"
                                : "text-[#3D4149]/70 hover:text-[#3D4149]"
                            )}
                            onClick={() =>
                              onScreenshotSelect(pillarIndex, ssIndex)
                            }
                          >
                            {/* Active accent line */}
                            {isActive && (
                              <span
                                className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                                style={{
                                  background:
                                    "linear-gradient(180deg, #519DFD 0%, #8712F7 100%)",
                                }}
                                aria-hidden="true"
                              />
                            )}
                            {screenshot.title}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
