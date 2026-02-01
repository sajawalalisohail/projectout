"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Security", href: "/security" },
  { label: "Company", href: "/company" },
];

const productDropdownItems = [
  { label: "Workflows", href: "/product#workflows" },
  { label: "Capabilities", href: "/product#capabilities" },
  { label: "Integrations", href: "/product#integrations" },
];

type NavTheme = "light" | "dark";

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOnHero, setIsOnHero] = useState(isHomePage);
  const [navTheme, setNavTheme] = useState<NavTheme>(isHomePage ? "dark" : "light");
  const lastScrollY = useRef(0);
  const intersectingSections = useRef<Set<Element>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // IntersectionObserver to detect which section is at the top
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSections.current.add(entry.target);
          } else {
            intersectingSections.current.delete(entry.target);
          }
        });

        let topSection: Element | null = null;
        let maxTop = -Infinity;

        intersectingSections.current.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 64 && rect.bottom > 64 && rect.top > maxTop) {
            maxTop = rect.top;
            topSection = section;
          }
        });

        if (topSection !== null) {
          const theme = topSection.getAttribute("data-nav-theme") as NavTheme;
          if (theme) {
            setNavTheme(theme);
          }
        }
      },
      {
        rootMargin: "-64px 0px -80% 0px",
        threshold: [0, 0.1, 0.5],
      }
    );

    const observeSections = () => {
      const sections = document.querySelectorAll("[data-nav-theme]");
      sections.forEach((section) => observer.observe(section));
    };

    observeSections();

    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      intersectingSections.current.clear();
    };
  }, []);

  // Scroll-based visibility and hero detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isHomePage) {
        const heroThreshold = window.innerHeight * 0.8;
        const onHero = currentScrollY < heroThreshold;
        setIsOnHero(onHero);

        if (onHero) {
          setIsVisible(true);
        } else {
          const scrollingUp = currentScrollY < lastScrollY.current;
          setIsVisible(scrollingUp || currentScrollY < 100);
        }
      } else {
        setIsOnHero(false);
        const scrollingUp = currentScrollY < lastScrollY.current;
        setIsVisible(scrollingUp || currentScrollY < 100);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductDropdownOpen(false);
  }, [pathname]);

  // Dropdown handlers with delay to prevent scroll-close
  const openDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setProductDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductDropdownOpen(false);
    }, 150);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const isHeroTransparent = isHomePage && isOnHero && !productDropdownOpen && !mobileMenuOpen;
  const effectiveTheme: NavTheme = navTheme;

  const navBg = isHeroTransparent
    ? "bg-transparent"
    : effectiveTheme === "dark"
    ? "bg-[#0b0d12]/95 backdrop-blur-md"
    : "bg-white/95 backdrop-blur-md";

  const textColorMuted =
    effectiveTheme === "dark"
      ? "text-white/60 hover:text-white"
      : "text-[#1C1F26]/60 hover:text-[#1C1F26]";

  const logoSrc = effectiveTheme === "dark" || isHeroTransparent
    ? "/logo/main logo.png"
    : "/logo/main logo 2.png";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
        navBg
      )}
    >
      <div className="w-full px-6 lg:px-10">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="relative h-6 w-auto shrink-0">
            <Image
              src={logoSrc}
              alt="Nextlex"
              height={24}
              width={120}
              className="h-6 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Links - Center */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Product Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                className={cn(
                  "flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200",
                  textColorMuted
                )}
              >
                Product
                <svg
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    productDropdownOpen && "rotate-180"
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
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-200",
                  textColorMuted
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Request Access */}
          <a
            href="/request-access"
            className={cn(
              "hidden text-sm font-medium tracking-wide transition-colors duration-200 md:block",
              textColorMuted
            )}
          >
            Request Access
          </a>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 md:hidden",
              effectiveTheme === "dark"
                ? "text-white hover:bg-white/10"
                : "text-[#1C1F26] hover:bg-black/5"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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

      {/* Full-width Product Dropdown (Desktop) */}
      <div
        className={cn(
          "absolute left-0 top-full w-full transition-all duration-200 hidden md:block",
          productDropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
      >
        <div
          className={cn(
            "w-full border-t transition-colors duration-200",
            effectiveTheme === "dark"
              ? "bg-[#0b0d12]/95 backdrop-blur-md border-white/10"
              : "bg-white/95 backdrop-blur-md border-black/5"
          )}
        >
          <Container>
            <div className="py-5">
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {productDropdownItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                      effectiveTheme === "dark"
                        ? "text-white/70 hover:bg-white/10 hover:text-white"
                        : "text-[#1C1F26]/70 hover:bg-black/5 hover:text-[#1C1F26]"
                    )}
                  >
                    {item.label}
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
          "overflow-hidden transition-all duration-200 md:hidden",
          mobileMenuOpen ? "max-h-[400px]" : "max-h-0"
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
              {/* Mobile Product Section */}
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    effectiveTheme === "dark" ? "text-white" : "text-[#1C1F26]"
                  )}
                >
                  Product
                </span>
                <div className="flex flex-col gap-2 pl-3">
                  {productDropdownItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "text-sm transition-colors",
                        effectiveTheme === "dark"
                          ? "text-white/60 hover:text-white"
                          : "text-[#1C1F26]/60 hover:text-[#1C1F26]"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors",
                    effectiveTheme === "dark"
                      ? "text-white/60 hover:text-white"
                      : "text-[#1C1F26]/60 hover:text-[#1C1F26]"
                  )}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/request-access"
                className={cn(
                  "mt-2 text-[13px] transition-colors",
                  effectiveTheme === "dark"
                    ? "text-white/60 hover:text-white"
                    : "text-[#1C1F26]/60 hover:text-[#1C1F26]"
                )}
              >
                Request Access
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
