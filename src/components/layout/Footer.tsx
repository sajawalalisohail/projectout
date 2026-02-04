"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const footerLinks = {
  Product: [
    { label: "Workflows", href: "/product#workflows" },
    { label: "Capabilities", href: "/product#capabilities" },
    { label: "Integrations", href: "/product#integrations" },
  ],
  Company: [
    { label: "About", href: "/company" },
    { label: "Security", href: "/security" },
    { label: "Contact", href: "/company#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

interface FooterProps {
  theme?: "light" | "dark";
}

export function Footer({ theme = "dark" }: FooterProps) {
  const isDark = theme === "dark";
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // Measure footer height for the spacer
  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const textColor = isDark ? "text-white" : "text-[#1C1F26]";
  const textColorMuted = isDark ? "text-white/60" : "text-[#1C1F26]/60";
  const textColorSubtle = isDark ? "text-white/40" : "text-[#1C1F26]/40";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const bgColor = isDark ? "bg-[#0b0d12]" : "bg-white";

  return (
    <>
      {/* Spacer to push content and make room for sticky footer */}
      <div style={{ height: footerHeight }} aria-hidden="true" />

      <footer
        ref={footerRef}
        className={`${bgColor} fixed bottom-0 left-0 right-0 z-0 overflow-hidden`}
      >
        {/* Gradient divider line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent 0%, rgba(135, 18, 247, 0.3) 50%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(135, 18, 247, 0.15) 50%, transparent 100%)'
          }}
          aria-hidden="true"
        />

        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(135, 18, 247, 0.06) 0%, transparent 60%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(135, 18, 247, 0.03) 0%, transparent 60%)'
          }}
          aria-hidden="true"
        />

        <div className="relative py-16">
          <Container>
            {/* Top: Logo + Social */}
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              {/* Logo with Tagline */}
              <a href="/" className="relative flex flex-col items-start">
                <Image
                  src={isDark ? "/logo/main logo.png" : "/logo/main logo 2.png"}
                  alt="Nextlex"
                  height={24}
                  width={120}
                  className="h-6 w-auto object-contain"
                />
                <span
                  className={`mt-1 text-[8px] font-medium uppercase tracking-[0.15em] leading-none ${
                    isDark ? "text-white/35" : "text-[#1C1F26]/35"
                  }`}
                >
                  The next of everything law
                </span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative transition-colors duration-200 ${
                      isDark
                        ? "text-white/40 hover:text-white"
                        : "text-[#1C1F26]/40 hover:text-[#1C1F26]"
                    }`}
                    aria-label={social.label}
                  >
                    {/* Subtle gradient hover effect */}
                    <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(135, 18, 247, 0.15) 0%, transparent 70%)'
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className={`mt-12 border-t ${borderColor} pt-12`}>
              <div className="mx-auto grid max-w-2xl grid-cols-3 gap-8 text-center">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h3 className={`text-sm font-medium ${textColor}`}>{category}</h3>
                    <ul className="mt-4 space-y-3">
                      {links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className={`group relative text-sm transition-colors duration-200 ${
                              isDark
                                ? "text-white/60 hover:text-white"
                                : "text-[#1C1F26]/60 hover:text-[#1C1F26]"
                            }`}
                          >
                            <span className="relative">
                              {link.label}
                              {/* Subtle gradient underline on hover */}
                              <span
                                className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
                                style={{
                                  background: 'linear-gradient(90deg, #519DFD 0%, #8712F7 100%)',
                                  opacity: 0.5
                                }}
                                aria-hidden="true"
                              />
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Line */}
            <div className={`mt-12 border-t ${borderColor} pt-8`}>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className={`text-sm ${textColorMuted}`}>
                  &copy; 2026 Nextlex. All rights reserved.
                </p>
                <p className={`text-xs ${textColorSubtle}`}>
                  Certain technologies used by Nextlex™ are patent pending.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
