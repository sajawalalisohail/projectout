"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Product", href: "/product" },
  { label: "Security", href: "/security" },
  { label: "Company", href: "/company" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Theme logic: Dark on homepage (/), Light on others
  const isDark = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Threshold 800px to pass hero section
      setIsScrolled(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed z-50 w-full transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]",
        isScrolled
          ? "top-6 left-1/2 -translate-x-1/2 max-w-fit px-4"
          : "top-0 left-0 px-6 pt-6"
      )}
    >
      <nav
        className={cn(
          "relative flex items-center transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isScrolled
            ? "gap-1 rounded-full border p-1 shadow-2xl backdrop-blur-xl" // Pill state
            : "w-full justify-between rounded-xl border border-transparent bg-transparent p-0 shadow-none backdrop-blur-none", // Hero state
          isScrolled && isDark
            ? "border-white/10 bg-[#0b0d12]/60 shadow-black/20"
            : "",
          isScrolled && !isDark
            ? "border-black/5 bg-white/60 shadow-black/5"
            : ""
        )}
      >
        {/* Logo Section */}
        <a
          href="/"
          className={cn(
            "flex h-auto flex-col items-start justify-center rounded-full transition-all duration-1000",
            isScrolled ? "px-4 h-10 items-center" : "px-0"
          )}
        >
          <div className="relative">
            <Image
              // Shows white logo on: Dark pages OR Scrolled Dark Pill
              // Shows dark logo on: Light pages (unscrolled) OR Scrolled Light Pill
              src={isDark || (isScrolled && isDark) ? "/logo/main logo.png" : "/logo/main logo 2.png"}
              alt="Nextlex"
              height={28}
              width={isScrolled ? 140 : 120}
              className={cn(
                "w-auto object-contain transition-all duration-1000",
                isScrolled ? "h-5" : "h-6 sm:h-7"
              )}
              priority
            />
          </div>
          <span
            className={cn(
              "text-[8px] sm:text-[9px] font-medium tracking-[0.2em] uppercase leading-none mt-1 transition-all duration-1000",
              isScrolled ? "opacity-0 h-0 overflow-hidden mt-0" : "opacity-100 h-auto",
              // Subtext color logic
              isDark ? "text-white/50" : "text-black/50"
            )}
          >
            The next of everything law
          </span>
        </a>

        {/* Divider - Only visible in Pill mode, adapt color */}
        <div
          className={cn(
            "h-4 w-px transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-0 hidden",
            isDark ? "bg-white/10" : "bg-black/10"
          )}
          aria-hidden="true"
        />

        {/* Desktop Links */}
        <div className={cn(
          "hidden items-center md:flex transition-all duration-1000",
          isScrolled
            ? "gap-1 relative border border-transparent p-0"
            : "mx-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2 gap-1 rounded-full border p-1 backdrop-blur-sm shadow-lg",
          !isScrolled && isDark ? "border-white/10 bg-white/5" : "",
          !isScrolled && !isDark ? "border-black/5 bg-black/5" : ""
        )}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "relative flex items-center rounded-full text-sm font-medium transition-all duration-300",
                isScrolled
                  ? "h-10 px-4"
                  : "h-9 px-5",
                // Scrolled colors (Dark Pill)
                isScrolled && isDark && "text-white/70 hover:text-white hover:bg-white/10",
                // Scrolled colors (Light Pill)
                isScrolled && !isDark && "text-black/70 hover:text-black hover:bg-black/5",
                // Hero state colors (Dark Page)
                !isScrolled && isDark && "text-white/80 hover:text-white hover:bg-white/10",
                // Hero state colors (Light Page)
                !isScrolled && !isDark && "text-black/80 hover:text-black hover:bg-black/5"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full md:hidden",
            !isScrolled && "ml-auto",
            isDark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* CTA Button - Desktop Only */}
        <a
          href="/request-access"
          className={cn(
            "ml-auto hidden md:flex items-center rounded-full font-medium transition-all duration-300 hover:opacity-90",
            isScrolled ? "ml-2 h-10 px-6 text-sm" : "h-11 px-8 text-base",
            // Button style - using brand gradient on dark, solid black (for contrast) on light
            isDark
              ? "bg-white text-[#1C1F26] hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              : "bg-[#1C1F26] text-white hover:bg-black/90 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
          )}
        >
          Request a Demo
        </a>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "absolute top-[calc(100%+8px)] left-0 w-full overflow-hidden rounded-3xl border backdrop-blur-2xl transition-all duration-300 md:hidden",
            isDark
              ? "border-white/10 bg-[#0b0d12]/95 shadow-2xl shadow-black/50"
              : "border-black/5 bg-white/95 shadow-2xl shadow-black/10",
            mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col p-2 gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex h-12 w-full items-center justify-center rounded-full text-base font-medium transition-colors",
                  isDark
                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                    : "text-black/70 hover:bg-black/5 hover:text-black"
                )}
              >
                {item.label}
              </a>
            ))}
            {/* Mobile CTA */}
            <a
              href="/request-access"
              className={cn(
                "mt-2 flex h-12 w-full items-center justify-center rounded-full text-base font-medium transition-all active:scale-95",
                isDark
                  ? "bg-white text-[#1C1F26]"
                  : "bg-[#1C1F26] text-white"
              )}
            >
              Request a Demo
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
