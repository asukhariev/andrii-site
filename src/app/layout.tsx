"use client";

import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const isHome = pathname === "/" || pathname === "/en";

  return (
    <html lang={isEn ? "en" : "uk"}>
      <head>
        <link rel="preload" href="/fonts/Zlam-Book.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Zlam-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Zlam-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Zlam-Medium.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={isHome ? "home-body" : undefined}>{children}</body>
    </html>
  );
}
