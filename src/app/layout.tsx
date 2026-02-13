import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const duplet = localFont({
  src: [
    {
      path: "./assets/fonts/duplet/Duplet-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/duplet/Duplet-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/duplet/Duplet-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./assets/fonts/duplet/Duplet-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-duplet",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL in your environment for production
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nextlex.ai"
  ),
  title: {
    default: "Nextlex - Your Legal Command Center",
    template: "%s | Nextlex",
  },
  description:
    "Built by lawyers for lawyers. Unify research, drafting, review, and practice ops in one secure platform.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Nextlex - Your Legal Command Center",
    description:
      "Built by lawyers for lawyers. Unify research, drafting, review, and practice ops in one secure platform.",
    url: "/",
    siteName: "Nextlex",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nextlex - Your Legal Command Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nextlex - Your Legal Command Center",
    description:
      "Built by lawyers for lawyers. Unify research, drafting, review, and practice ops in one secure platform.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${duplet.variable} ${geistMono.variable} font-sans bg-bg text-fg antialiased`}
      >
        <Navbar />
        <main className="relative z-10 min-h-screen bg-bg shadow-[0_8px_30px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.15)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
