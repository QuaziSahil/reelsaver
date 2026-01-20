import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReelSaver - Free Instagram Reels & Stories Downloader",
  description: "Download Instagram Reels, Stories, and Posts for free. Fast, easy, and no login required. Save your favorite Instagram videos in HD quality.",
  keywords: "instagram downloader, reels downloader, stories downloader, instagram video download, save instagram reels, download instagram stories",
  authors: [{ name: "ReelSaver" }],
  creator: "ReelSaver",
  publisher: "ReelSaver",
  robots: "index, follow",
  openGraph: {
    title: "ReelSaver - Free Instagram Reels & Stories Downloader",
    description: "Download Instagram Reels, Stories, and Posts for free. Fast, easy, and no login required.",
    url: "https://reelsaver.netlify.app",
    siteName: "ReelSaver",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelSaver - Free Instagram Reels & Stories Downloader",
    description: "Download Instagram Reels, Stories, and Posts for free. Fast, easy, and no login required.",
  },
  alternates: {
    canonical: "https://reelsaver.netlify.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8144222817767750"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
