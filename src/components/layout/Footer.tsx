"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const footerLinks = {
  Product: [
    { label: "Workflows", href: "/product#workflows" },
    { label: "Capabilities", href: "/product#capabilities" },
    { label: "Integrations", href: "/product#integrations" },
    { label: "Security", href: "/security" },
  ],
  Company: [
    { label: "About", href: "/company" },
    { label: "Careers", href: "/company#careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/company#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

interface FooterProps {
  theme?: "light" | "dark";
}

export function Footer({ theme = "dark" }: FooterProps) {
  const isDark = theme === "dark";
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

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

  return (
    <>
      {/* Spacer */}
      <div style={{ height: footerHeight }} aria-hidden="true" />

      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-0 bg-[#0b0d12] text-white"
      >
        {/* Top Border */}
        <div className="h-px w-full bg-white/10" />

        <Container className="py-20 md:py-32">
          {/* Main CTA Section */}
          <div className="mb-24 flex flex-col md:mb-32">
            <a href="/request-access" className="group block w-fit">
              <h2 className="mb-8 text-6xl font-medium tracking-tight transition-opacity duration-300 md:text-[8rem] md:leading-[0.9] group-hover:opacity-80">
                Request
                <br />
                <span className="text-[#8712F7]">a Demo</span>
              </h2>
            </a>

            <div className="h-px w-full bg-white/20 my-8" />
          </div>

          {/* Footer Bottom Grid */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            {/* Column 1: Info (Left) */}
            <div className="flex flex-col gap-6 text-sm font-medium text-white/50 md:col-span-4">
              <a href="/" className="block">
                <Image
                  src="/logo/main logo.png"
                  alt="Nextlex"
                  height={32}
                  width={160}
                  className="h-8 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
                />
              </a>
              <p>NEXTLEX &copy; 2026</p>
              <p suppressHydrationWarning>
                {/* Simple time placeholder, hydration aware */}
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
              </p>
            </div>

            {/* Column 2: Links (Center/Right) */}
            <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-3">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col gap-4">
                  <h3 className="text-sm font-medium text-white">{category}</h3>
                  <ul className="flex flex-col gap-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-white/50 transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Column 3: Social (Right) */}
            <div className="flex flex-col gap-4 md:col-span-2">
              <h3 className="text-sm font-medium text-white">Social</h3>
              <ul className="flex flex-col gap-2">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {social.label}
                      <span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
