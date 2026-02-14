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

  // Theme logic (defaulting to dark for this premium aesthetic)
  const isDark = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        isScrolled
          ? "top-6 left-1/2 -translate-x-1/2 max-w-fit px-4"
          : "top-0 left-0 px-6 pt-6"
      )}
    >
      <nav
        className={cn(
          "relative flex items-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
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
            "flex h-auto flex-col items-start justify-center rounded-full transition-all duration-700",
            isScrolled ? "px-4 h-10 items-center" : "px-0"
          )}
        >
          <div className="relative">
            <Image
              src={!isScrolled || isDark ? "/logo/main logo.png" : "/logo/main logo 2.png"}
              alt="Nextlex"
              height={28}
              width={140}
              className={cn(
                "w-auto object-contain transition-all duration-700",
                isScrolled ? "h-5" : "h-7"
              )}
              priority
            />
          </div>
          <span
            className={cn(
              "text-[9px] font-medium tracking-[0.2em] text-white/50 uppercase leading-none mt-1 transition-all duration-700",
              isScrolled ? "opacity-0 h-0 overflow-hidden mt-0" : "opacity-100 h-auto"
            )}
          >
            The next of everything law
          </span>
        </a>

        {/* Divider - Only visible in Pill mode */}
        <div
          className={cn(
            "h-4 w-px bg-white/10 transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-0 hidden"
          )}
          aria-hidden="true"
        />

        {/* Desktop Links */}
        <div className={cn(
          "hidden items-center md:flex transition-all duration-700",
          isScrolled
            ? "gap-1 relative border border-transparent p-0"
            : "absolute left-1/2 -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm shadow-lg"
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
                // Scrolled colors
                isScrolled && isDark && "text-white/70 hover:text-white hover:bg-white/10",
                isScrolled && !isDark && "text-black/70 hover:text-black hover:bg-black/5",
                // Hero state colors
                !isScrolled && "text-white/80 hover:text-white hover:bg-white/10"
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

        {/* CTA Button */}
        <a
          href="/request-access"
          className={cn(
            "ml-auto flex items-center rounded-full font-medium transition-all duration-300 hover:opacity-90",
            isScrolled ? "ml-2 h-10 px-6 text-sm" : "h-11 px-8 text-base",
            "bg-white text-[#1C1F26] hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          )}
        >
          Request a Demo
        </a>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "absolute top-[calc(100%+8px)] left-0 w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d12]/90 backdrop-blur-xl transition-all duration-300 md:hidden",
            mobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col p-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex h-12 w-full items-center justify-center rounded-full text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
