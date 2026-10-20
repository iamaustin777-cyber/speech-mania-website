import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://speech-mania-website.vercel.app"),
  title: {
    default: "Speech Mania — Find Your Voice",
    template: "Speech Mania | %s",
  },
  description:
    "Speech Mania empowers students across Thailand and Southeast Asia through public speaking competitions, workshops, and national team management.",
  openGraph: {
    title: "Speech Mania — Find Your Voice",
    description: "Youth-led public speaking and leadership programs across Thailand and Southeast Asia.",
    images: ["/images/event-40.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>
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
