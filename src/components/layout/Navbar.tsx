"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Security", href: "/security" },
  { label: "Company", href: "/company" },
];

const productDropdownItems = [
  { label: "Overview", href: "/product" },
  { label: "Workflows", href: "/product#workflows" },
  { label: "Capabilities", href: "/product#capabilities" },
  { label: "Integrations", href: "/product#integrations" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOnHero, setIsOnHero] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.8;
      const onHero = currentScrollY < heroThreshold;
      const scrollingUp = currentScrollY < lastScrollY.current;

      setIsOnHero(onHero);

      if (onHero) {
        setIsVisible(true);
      } else {
        setIsVisible(scrollingUp);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-transform duration-200",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isOnHero ? "bg-transparent" : "bg-white"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className={cn(
              "text-lg font-semibold tracking-tight transition-colors duration-200",
              isOnHero ? "text-white" : "text-[#1C1F26]"
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
              onMouseEnter={() => setProductDropdownOpen(true)}
              onMouseLeave={() => setProductDropdownOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors duration-200",
                  isOnHero
                    ? "text-white/70 hover:text-white"
                    : "text-[#1C1F26]/70 hover:text-[#1C1F26]"
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

              {/* Dropdown Menu */}
              <div
                className={cn(
                  "absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all duration-200",
                  productDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                )}
              >
                <div className="min-w-[180px] rounded-lg bg-[#1C1F26] py-2 shadow-lg">
                  {productDropdownItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  isOnHero
                    ? "text-white/70 hover:text-white"
                    : "text-[#1C1F26]/70 hover:text-[#1C1F26]"
                )}
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
                isOnHero
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
              isOnHero
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

        {/* Mobile Menu */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 md:hidden",
            mobileMenuOpen ? "max-h-80 pb-6" : "max-h-0",
            mobileMenuOpen && (isOnHero ? "bg-[#1C1F26] rounded-lg mt-2 px-4" : "")
          )}
        >
          <div className="flex flex-col gap-4 pt-4">
            {/* Mobile Product Section */}
            <div className="flex flex-col gap-2">
              <span
                className={cn(
                  "text-sm font-medium",
                  isOnHero ? "text-white" : "text-[#1C1F26]"
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
                      isOnHero
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
                  isOnHero
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
                isOnHero
                  ? "bg-white text-[#1C1F26] hover:bg-white/90"
                  : ""
              )}
            >
              <a href="/request-access">Request Access</a>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
