"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const productDropdownItems = [
  {
    label: "Overview",
    href: "/product",
    description: "See everything Nextlex has to offer"
  },
  {
    label: "Workflows",
    href: "/product#workflows",
    description: "End-to-end legal automation"
  },
  {
    label: "Integrations",
    href: "/product#integrations",
    description: "Connect your existing tools"
  },
  {
    label: "AI Assistants",
    href: "/product#ai",
    description: "Lexi & Voice for legal teams"
  },
  {
    label: "Compare",
    href: "/#comparison",
    description: "See how we stack up"
  },
];

const companyDropdownItems = [
  {
    label: "About",
    href: "/company",
    description: "Our story and mission"
  },
  {
    label: "Leadership",
    href: "/company#team",
    description: "Meet the team building Nextlex"
  },
  {
    label: "Newsroom",
    href: "/company#news",
    description: "Latest updates and press"
  },
  {
    label: "Careers",
    href: "/company#careers",
    description: "Join us in transforming legal"
  },
  {
    label: "Contact",
    href: "/request-access",
    description: "Get in touch with our team"
  },
];

type NavTheme = "light" | "dark";

export function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const companyDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeAllDropdowns = useCallback(() => {
    setProductDropdownOpen(false);
    setCompanyDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAllDropdowns();
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeAllDropdowns]);

  useEffect(() => {
    setMobileMenuOpen(false);
    closeAllDropdowns();
  }, [pathname, closeAllDropdowns]);

  const openProductDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setCompanyDropdownOpen(false);
    setProductDropdownOpen(true);
  }, []);

  const closeProductDropdown = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductDropdownOpen(false);
    }, 150);
  }, []);

  const openCompanyDropdown = useCallback(() => {
    if (companyDropdownTimeoutRef.current) {
      clearTimeout(companyDropdownTimeoutRef.current);
      companyDropdownTimeoutRef.current = null;
    }
    setProductDropdownOpen(false);
    setCompanyDropdownOpen(true);
  }, []);

  const closeCompanyDropdown = useCallback(() => {
    companyDropdownTimeoutRef.current = setTimeout(() => {
      setCompanyDropdownOpen(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      if (companyDropdownTimeoutRef.current) {
        clearTimeout(companyDropdownTimeoutRef.current);
      }
    };
  }, []);

  const effectiveTheme = "light" as NavTheme;

  const navBg = "bg-white/80 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.02)]";

  const textColorMuted = "text-[#1C1F26]/80 hover:text-[#1C1F26]";

  const logoSrc = "/logo/main logo 2.png";

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={cn(
        "h-3.5 w-3.5 transition-transform duration-200",
        isOpen && "rotate-180"
      )}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full",
        navBg
      )}
    >
      <div className="w-full px-6 lg:px-10">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="relative shrink-0">
            <Image
              src={logoSrc}
              alt="Nextlex"
              height={28}
              width={140}
              className="h-7 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Links - Center */}
          <div className="hidden items-center gap-8 lg:flex">
            {/* Product Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openProductDropdown}
              onMouseLeave={closeProductDropdown}
            >
              <button
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-full text-[14px] font-medium tracking-tight transition-all duration-200 hover:bg-black/[0.04]",
                  textColorMuted
                )}
                aria-expanded={productDropdownOpen}
                aria-haspopup="true"
              >
                Product
                <ChevronIcon isOpen={productDropdownOpen} />
              </button>
            </div>

            {/* Security Link */}
            <a
              href="/security"
              className={cn(
                "px-3 py-2 rounded-full text-[14px] font-medium tracking-tight transition-all duration-200 hover:bg-black/[0.04]",
                textColorMuted
              )}
            >
              Security
            </a>

            {/* Company Dropdown */}
            <div
              ref={companyDropdownRef}
              className="relative"
              onMouseEnter={openCompanyDropdown}
              onMouseLeave={closeCompanyDropdown}
            >
              <button
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-full text-[14px] font-medium tracking-tight transition-all duration-200 hover:bg-black/[0.04]",
                  textColorMuted
                )}
                aria-expanded={companyDropdownOpen}
                aria-haspopup="true"
              >
                Company
                <ChevronIcon isOpen={companyDropdownOpen} />
              </button>
            </div>
          </div>

          {/* Right side: Request a Demo */}
          <div className="hidden items-center lg:flex">
            <a
              href="/request-access"
              className={cn(
                "relative overflow-hidden rounded-full px-5 py-2.5 text-[14px] font-medium tracking-tight transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-0.5",
                effectiveTheme === "dark"
                  ? "bg-white text-[#1C1F26]"
                  : "bg-[#1C1F26] text-white"
              )}
            >
              {/* Subtle gradient border/inner glow effect */}
              <div
                className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(81,157,253,0.5) 0%, rgba(135,18,247,0.5) 100%)",
                  maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px"
                }}
              />
              <span className="relative z-10">Request a Demo</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
              effectiveTheme === "dark"
                ? "text-white hover:bg-white/10"
                : "text-[#1C1F26] hover:bg-black/5"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </div>
      <div
        className={cn(
          "absolute left-0 top-full w-full transition-all duration-200 hidden lg:block",
          productDropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={openProductDropdown}
        onMouseLeave={closeProductDropdown}
      >
        <div
          className={cn(
            "w-full border-t transition-colors duration-200",
            effectiveTheme === "dark"
              ? "bg-[#0b0d12]/95 backdrop-blur-xl border-white/10"
              : "bg-white/90 backdrop-blur-xl border-black/5 shadow-lg"
          )}
        >
          <Container>
            <div className="py-8">
              <div className="grid grid-cols-3 gap-2 max-w-3xl">
                {productDropdownItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "group rounded-xl px-5 py-4 transition-colors duration-150",
                      effectiveTheme === "dark"
                        ? "hover:bg-white/5"
                        : "hover:bg-black/[0.02]"
                    )}
                  >
                    <div className={cn(
                      "text-sm font-medium transition-colors duration-150",
                      effectiveTheme === "dark"
                        ? "text-white group-hover:text-white"
                        : "text-[#1C1F26] group-hover:text-[#1C1F26]"
                    )}>
                      {item.label}
                    </div>
                    <div className={cn(
                      "mt-1 text-sm transition-colors duration-150",
                      effectiveTheme === "dark"
                        ? "text-white/50 group-hover:text-white/70"
                        : "text-[#1C1F26]/50 group-hover:text-[#1C1F26]/70"
                    )}>
                      {item.description}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* MEGA DROPDOWN - Company (Desktop) */}
      <div
        className={cn(
          "absolute left-0 top-full w-full transition-all duration-200 hidden lg:block",
          companyDropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={openCompanyDropdown}
        onMouseLeave={closeCompanyDropdown}
      >
        <div
          className={cn(
            "w-full border-t transition-colors duration-200",
            effectiveTheme === "dark"
              ? "bg-[#0b0d12]/95 backdrop-blur-xl border-white/10"
              : "bg-white/90 backdrop-blur-xl border-black/5 shadow-lg"
          )}
        >
          <Container>
            <div className="py-8">
              <div className="grid grid-cols-3 gap-2 max-w-3xl">
                {companyDropdownItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "group rounded-xl px-5 py-4 transition-colors duration-150",
                      effectiveTheme === "dark"
                        ? "hover:bg-white/5"
                        : "hover:bg-black/[0.02]"
                    )}
                  >
                    <div className={cn(
                      "text-sm font-medium transition-colors duration-150",
                      effectiveTheme === "dark"
                        ? "text-white group-hover:text-white"
                        : "text-[#1C1F26] group-hover:text-[#1C1F26]"
                    )}>
                      {item.label}
                    </div>
                    <div className={cn(
                      "mt-1 text-sm transition-colors duration-150",
                      effectiveTheme === "dark"
                        ? "text-white/50 group-hover:text-white/70"
                        : "text-[#1C1F26]/50 group-hover:text-[#1C1F26]/70"
                    )}>
                      {item.description}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 lg:hidden",
          mobileMenuOpen ? "max-h-[600px]" : "max-h-0"
        )}
      >
        <div
          className={cn(
            "border-t transition-colors duration-200",
            effectiveTheme === "dark"
              ? "bg-[#0b0d12] border-white/10"
              : "bg-white border-black/5"
          )}
        >
          <div className="w-full px-6">
            <div className="flex flex-col gap-4 py-6">
              {[
                { label: "Product", href: "/product" },
                { label: "Security", href: "/security" },
                { label: "Company", href: "/company" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[#1C1F26]/80 transition-colors hover:text-[#1C1F26]"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile CTA */}
              <div className="mt-4">
                <a
                  href="/request-access"
                  className="block rounded-full bg-[#1C1F26] px-5 py-2.5 text-sm font-medium text-center text-white transition-all duration-200 hover:bg-[#1C1F26]/90"
                >
                  Request a Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
