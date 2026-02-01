import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Product: [
    { label: "Workflows", href: "/product#workflows" },
    { label: "Capabilities", href: "/product#capabilities" },
    { label: "Integrations", href: "/product#integrations" },
  ],
  Company: [
    { label: "About", href: "/company" },
    { label: "Security", href: "/security" },
    { label: "Careers", href: "/company#careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0b0d12] py-16">
      <div className="w-full px-6 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Logo and tagline */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/2.png"
                alt="Nextlex"
                height={28}
                width={140}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              AI-powered legal intelligence for modern law firms.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xs font-medium uppercase tracking-wider text-white/40">
                  {category}
                </h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Nextlex. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-white/40 transition-colors hover:text-white/60"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/40 transition-colors hover:text-white/60"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
