import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents mobile Safari from zooming in on the review textarea
};

export const metadata: Metadata = {
  title: "DEXTRO | Cinematic Editor & Motion Designer",
  description:
    "Premium portfolio of DEXTRO. Showcasing cinematic video editing, motion design, and visual storytelling.",
  keywords: [
    "DEXTRO",
    "Video Editor",
    "Motion Designer",
    "Visual Storytelling",
    "Portfolio",
  ],
  openGraph: {
    title: "DEXTRO | Cinematic Editor",
    description:
      "Cinematic editing, motion design and visual storytelling.",
    type: "website",
    siteName: "DEXTRO Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEXTRO | Cinematic Editor",
    description:
      "Cinematic editing, motion design and visual storytelling.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#050505] text-[#f5f5f5] antialiased overflow-x-hidden selection:bg-white/15 selection:text-white">
        {children}
      </body>
    </html>
  );
}