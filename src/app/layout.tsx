import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Auditorium } from "@/components/Auditorium";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://speech-mania-website.vercel.app"),
  title: {
    default: "Speech Mania — Find Your Voice",
    template: "Speech Mania | %s",
  },
  description:
    "Speech Mania runs public speaking competitions, workshops and Thailand's national team for students across Thailand and Southeast Asia.",
  openGraph: {
    title: "Speech Mania — Find Your Voice",
    description: "Youth-led public speaking and leadership programs across Thailand and Southeast Asia.",
    images: ["/images/event-40.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Sans isn't in next/font's list yet, so it loads from Google Fonts directly. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap" />
      </head>
      <body>
        <Auditorium />
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
