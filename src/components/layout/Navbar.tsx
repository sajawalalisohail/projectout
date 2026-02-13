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

const resourcesDropdownItems = [
  {
    label: "Guides",
    href: "/resources/guides",
    description: "Best practices for legal AI",
    comingSoon: true
  },
  {
    label: "Videos & Demos",
    href: "/resources/demos",
    description: "See Nextlex in action",
    comingSoon: true
  },
  {
    label: "Blog & Insights",
    href: "/resources/blog",
    description: "Thought leadership and updates",
    comingSoon: true
  },
  {
    label: "Support & Docs",
    href: "/resources/docs",
    description: "Documentation and help center",
    comingSoon: true
  },
];

type NavTheme = "light" | "dark";

export function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const companyDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close all dropdowns
  const closeAllDropdowns = useCallback(() => {
    setProductDropdownOpen(false);
    setCompanyDropdownOpen(false);
    setResourcesDropdownOpen(false);
  }, []);

  // Keyboard handler for escape key
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    closeAllDropdowns();
  }, [pathname, closeAllDropdowns]);

  // Product dropdown handlers
  const openProductDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setCompanyDropdownOpen(false);
    setResourcesDropdownOpen(false);
    setProductDropdownOpen(true);
  }, []);

  const closeProductDropdown = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductDropdownOpen(false);
    }, 150);
  }, []);

  // Company dropdown handlers
  const openCompanyDropdown = useCallback(() => {
    if (companyDropdownTimeoutRef.current) {
      clearTimeout(companyDropdownTimeoutRef.current);
      companyDropdownTimeoutRef.current = null;
    }
    setProductDropdownOpen(false);
    setResourcesDropdownOpen(false);
    setCompanyDropdownOpen(true);
  }, []);

  const closeCompanyDropdown = useCallback(() => {
    companyDropdownTimeoutRef.current = setTimeout(() => {
      setCompanyDropdownOpen(false);
    }, 150);
  }, []);

  // Resources dropdown handlers
  const openResourcesDropdown = useCallback(() => {
    if (resourcesDropdownTimeoutRef.current) {
      clearTimeout(resourcesDropdownTimeoutRef.current);
      resourcesDropdownTimeoutRef.current = null;
    }
    setProductDropdownOpen(false);
    setCompanyDropdownOpen(false);
    setResourcesDropdownOpen(true);
  }, []);

  const closeResourcesDropdown = useCallback(() => {
    resourcesDropdownTimeoutRef.current = setTimeout(() => {
      setResourcesDropdownOpen(false);
    }, 150);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      if (companyDropdownTimeoutRef.current) {
        clearTimeout(companyDropdownTimeoutRef.current);
      }
      if (resourcesDropdownTimeoutRef.current) {
        clearTimeout(resourcesDropdownTimeoutRef.current);
      }
    };
  }, []);

  // Always light theme - solid white navbar everywhere
  const effectiveTheme = "light" as NavTheme;

  const navBg = "bg-white border-b border-black/5";

  const textColorMuted = "text-[#1C1F26]/80 hover:text-[#1C1F26]";

  const logoSrc = "/logo/main logo 2.png";

  // Dropdown chevron icon
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
          {/* Logo with Tagline */}
          <a href="/" className="relative shrink-0 flex flex-col items-start">
            <Image
              src={logoSrc}
              alt="Nextlex"
              height={24}
              width={120}
              className="h-6 w-auto object-contain"
              priority
            />
            <span
              className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.15em] leading-none text-[#1C1F26]"
            >
              The next of everything law
            </span>
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
                  "flex items-center gap-1 text-[15px] font-medium tracking-wide transition-colors duration-200",
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
                "text-[15px] font-medium tracking-wide transition-colors duration-200",
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
                  "flex items-center gap-1 text-[15px] font-medium tracking-wide transition-colors duration-200",
                  textColorMuted
                )}
                aria-expanded={companyDropdownOpen}
                aria-haspopup="true"
              >
                Company
                <ChevronIcon isOpen={companyDropdownOpen} />
              </button>
            </div>

            {/* Resources Dropdown */}
            <div
              ref={resourcesDropdownRef}
              className="relative"
              onMouseEnter={openResourcesDropdown}
              onMouseLeave={closeResourcesDropdown}
            >
              <button
                className={cn(
                  "flex items-center gap-1 text-[15px] font-medium tracking-wide transition-colors duration-200",
                  textColorMuted
                )}
                aria-expanded={resourcesDropdownOpen}
                aria-haspopup="true"
              >
                Resources
                <ChevronIcon isOpen={resourcesDropdownOpen} />
              </button>
            </div>
          </div>

          {/* Right side: Request a Demo */}
          <div className="hidden items-center lg:flex">
            <a
              href="/request-access"
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200",
                effectiveTheme === "dark"
                  ? "bg-white text-[#1C1F26] hover:bg-white/90"
                  : "bg-[#1C1F26] text-white hover:bg-[#1C1F26]/90"
              )}
            >
              Request a Demo
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

      {/* MEGA DROPDOWN - Product (Desktop) */}
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
              ? "bg-[#0b0d12]/98 backdrop-blur-md border-white/10"
              : "bg-white/98 backdrop-blur-md border-black/5"
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
              ? "bg-[#0b0d12]/98 backdrop-blur-md border-white/10"
              : "bg-white/98 backdrop-blur-md border-black/5"
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

      {/* MEGA DROPDOWN - Resources (Desktop) */}
      <div
        className={cn(
          "absolute left-0 top-full w-full transition-all duration-200 hidden lg:block",
          resourcesDropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={openResourcesDropdown}
        onMouseLeave={closeResourcesDropdown}
      >
        <div
          className={cn(
            "w-full border-t transition-colors duration-200",
            effectiveTheme === "dark"
              ? "bg-[#0b0d12]/98 backdrop-blur-md border-white/10"
              : "bg-white/98 backdrop-blur-md border-black/5"
          )}
        >
          <Container>
            <div className="py-8">
              <div className="grid grid-cols-2 gap-2 max-w-2xl">
                {resourcesDropdownItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.comingSoon ? "#" : item.href}
                    className={cn(
                      "group rounded-xl px-5 py-4 transition-colors duration-150",
                      item.comingSoon && "cursor-default",
                      effectiveTheme === "dark"
                        ? "hover:bg-white/5"
                        : "hover:bg-black/[0.02]"
                    )}
                    onClick={item.comingSoon ? (e) => e.preventDefault() : undefined}
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-sm font-medium transition-colors duration-150",
                        effectiveTheme === "dark"
                          ? "text-white group-hover:text-white"
                          : "text-[#1C1F26] group-hover:text-[#1C1F26]"
                      )}>
                        {item.label}
                      </span>
                      {item.comingSoon && (
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                          effectiveTheme === "dark"
                            ? "bg-white/10 text-white/50"
                            : "bg-black/5 text-[#1C1F26]/40"
                        )}>
                          Soon
                        </span>
                      )}
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
                { label: "Resources", href: "/resources/guides" },
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
