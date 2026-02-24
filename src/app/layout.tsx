import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "../components/Analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Play FreeCell Online for Free | No Download Required",
  description:
    "Play FreeCell Solitaire online for free. No download, no signup. Classic Microsoft FreeCell deals, hints, undo, and more. Works on desktop and mobile.",
  keywords: [
    "freecell",
    "freecell online",
    "play freecell",
    "freecell solitaire",
    "free card game",
    "solitaire online",
    "no download",
  ],
  openGraph: {
    title: "Play FreeCell Online for Free",
    description:
      "The best free FreeCell Solitaire game on the web. Classic deals, smooth gameplay, no signup required.",
    url: "https://playfreecellonline.com",
    siteName: "PlayFreeCellOnline.com",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a3d0a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
