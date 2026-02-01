"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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

  // IntersectionObserver to detect which section is at the top
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Update tracked intersecting sections
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSections.current.add(entry.target);
          } else {
            intersectingSections.current.delete(entry.target);
          }
        });

        // Find the section currently "under" the navbar from ALL intersecting sections
        let topSection: Element | null = null;
        let maxTop = -Infinity;

        intersectingSections.current.forEach((section) => {
          const rect = section.getBoundingClientRect();
          // Section spans the navbar position (64px): top <= 64 and bottom > 64
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
        // Check near the top of viewport (navbar height is 64px)
        rootMargin: "-64px 0px -80% 0px",
        threshold: [0, 0.1, 0.5],
      }
    );

    // Observe all theme sections
    const observeSections = () => {
      const sections = document.querySelectorAll("[data-nav-theme]");
      sections.forEach((section) => observer.observe(section));
    };

    // Initial observation
    observeSections();

    // Re-observe when DOM changes
    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      intersectingSections.current.clear();
    };
  }, []);

  // Scroll-based visibility and hero detection (homepage only)
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

  const openDropdown = useCallback(() => setProductDropdownOpen(true), []);
  const closeDropdown = useCallback(() => setProductDropdownOpen(false), []);

  // Determine navbar appearance based on context
  // Home hero: transparent bg (unless dropdown is open)
  // Theme always follows navTheme from IntersectionObserver
  const isHeroTransparent = isHomePage && isOnHero && !productDropdownOpen && !mobileMenuOpen;
  const effectiveTheme: NavTheme = navTheme;

  // Navbar background
  const navBg = isHeroTransparent
    ? "bg-transparent"
    : effectiveTheme === "dark"
    ? "bg-[#0b0d12]"
    : "bg-white";

  // Text colors
  const textColor = effectiveTheme === "dark" ? "text-white" : "text-[#1C1F26]";
  const textColorMuted =
    effectiveTheme === "dark"
      ? "text-white/70 hover:text-white"
      : "text-[#1C1F26]/70 hover:text-[#1C1F26]";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-200",
        isVisible ? "translate-y-0" : "-translate-y-full",
        navBg
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className={cn(
              "text-lg font-semibold tracking-tight transition-colors duration-200",
              textColor
            )}
          >
            Nextle
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              x
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors duration-200",
                  textColorMuted
                )}
              >
                Product
                <svg
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
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
                className={cn("text-sm transition-colors duration-200", textColorMuted)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              asChild
              className={cn(
                "transition-colors duration-200",
                effectiveTheme === "dark"
                  ? "bg-white text-[#1C1F26] hover:bg-white/90"
                  : ""
              )}
            >
              <a href="/request-access">Request Access</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 md:hidden",
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
      </Container>

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
              ? "bg-[#0b0d12] border-white/10"
              : "bg-white border-black/5"
          )}
        >
          <Container>
            <div className="py-6">
              <div className="grid grid-cols-3 gap-4 max-w-xl">
                {productDropdownItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-150",
                      effectiveTheme === "dark"
                        ? "text-white/80 hover:bg-white/10 hover:text-white"
                        : "text-[#1C1F26]/80 hover:bg-black/5 hover:text-[#1C1F26]"
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
          mobileMenuOpen ? "max-h-96" : "max-h-0"
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
          <Container>
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
                          ? "text-white/70 hover:text-white"
                          : "text-[#1C1F26]/70 hover:text-[#1C1F26]"
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
                      ? "text-white/70 hover:text-white"
                      : "text-[#1C1F26]/70 hover:text-[#1C1F26]"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className={cn(
                  "mt-2 w-full",
                  effectiveTheme === "dark"
                    ? "bg-white text-[#1C1F26] hover:bg-white/90"
                    : ""
                )}
              >
                <a href="/request-access">Request Access</a>
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
