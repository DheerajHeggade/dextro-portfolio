import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

/* =========================================================
   FONTS
========================================================= */

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


/* =========================================================
   SITE METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://dextro.vercel.app"
  ),

  title: {
    default:
      "DEXTRO — Cinematic Editor • Motion Designer • Visual Storyteller",

    template:
      "%s — DEXTRO",
  },

  description:
    "DEXTRO is the creative portfolio of Dheeraj Heggade — cinematic editing, motion design, visual storytelling, color and creative visual production.",

  keywords: [
    "DEXTRO",
    "Dheeraj Heggade",
    "video editor",
    "cinematic editor",
    "motion designer",
    "visual storyteller",
    "video editing portfolio",
    "motion graphics",
    "Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "color grading",
    "cinematic editing",
    "documentary editing",
    "AI-assisted visual production",
  ],

  authors: [
    {
      name: "Dheeraj Heggade",
    },
  ],

  creator:
    "Dheeraj Heggade",

  publisher:
    "DEXTRO",

  applicationName:
    "DEXTRO",

  category:
    "Portfolio",

  classification:
    "Creative Portfolio",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-video-preview":
        -1,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,
    },
  },


  /* =======================================================
     OPEN GRAPH
  ======================================================= */

  openGraph: {
    type: "website",

    locale:
      "en_IN",

    url:
      "https://dextro.vercel.app",

    siteName:
      "DEXTRO",

    title:
      "DEXTRO — Cinematic Editor • Motion Designer • Visual Storyteller",

    description:
      "Premium creative portfolio featuring cinematic editing, motion design, visual storytelling and creative visual production.",

    images: [
      {
        url:
          "/Images/dextro-og.jpg",

        width:
          1200,

        height:
          630,

        alt:
          "DEXTRO — Cinematic Editor and Motion Designer",
      },
    ],
  },


  /* =======================================================
     TWITTER / SOCIAL PREVIEW
  ======================================================= */

  twitter: {
    card:
      "summary_large_image",

    title:
      "DEXTRO — Cinematic Editor • Motion Designer",

    description:
      "Cinematic editing, motion design and visual storytelling by DEXTRO.",

    images: [
      "/Images/dextro-og.jpg",
    ],
  },


  /* =======================================================
     ICONS
  ======================================================= */

  icons: {
    icon: [
      {
        url:
          "/favicon.ico",

        sizes:
          "any",
      },

      {
        url:
          "/icon.png",

        type:
          "image/png",

        sizes:
          "32x32",
      },
    ],

    apple: [
      {
        url:
          "/apple-touch-icon.png",

        sizes:
          "180x180",

        type:
          "image/png",
      },
    ],
  },


  /* =======================================================
     MANIFEST
  ======================================================= */

  manifest:
    "/manifest.webmanifest",


  /* =======================================================
     ALTERNATE
  ======================================================= */

  alternates: {
    canonical:
      "https://dextro.vercel.app",
  },


  /* =======================================================
     OTHER
  ======================================================= */

  other: {
    "theme-color":
      "#050505",

    "color-scheme":
      "dark",
  },
};


/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width:
    "device-width",

  initialScale:
    1,

  maximumScale:
    1,

  viewportFit:
    "cover",

  themeColor:
    "#050505",

  colorScheme:
    "dark",
};


/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <body
        className={`${geist.variable} ${geistMono.variable}`}
      >
        {children}
      </body>

    </html>
  );
}