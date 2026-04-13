"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", icon: "Overview", label: "Dashboard" },
  { href: "/clients", icon: "Clients", label: "Клієнти" },
  { href: "/invoices", icon: "Invoices", label: "Інвойси" },
  { href: "/settings", icon: "FOP", label: "Реквізити ФОП" },
  { href: "/design-system", icon: "Tokens", label: "Design System" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDocumentPage = pathname === "/" || pathname === "/requisites";

  if (isDocumentPage) {
    return (
      <html lang="uk">
        <head>
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </head>
        <body className={pathname === "/" ? "home-body" : undefined}>{children}</body>
      </html>
    );
  }

  return (
    <html lang="uk">
      <head>
        <title>Andrii — Engineer & Entrepreneur</title>
          <meta name="description" content="AI agents and applied AI strategy, launch, architecture, design, team, legal, code — end-to-end." />
          <meta property="og:title" content="Andrii — Engineer & Entrepreneur" />
          <meta property="og:description" content="AI agents and applied AI strategy, launch, architecture, design, team, legal, code — end-to-end." />
          <meta property="og:image" content="https://andri.website/api/og" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://andri.website/api/og" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <div className="sidebar-panel">
              <div className="app-badge">A</div>
              <div>
                <div className="sidebar-logo">Andrii Site</div>
                <div className="sidebar-sub">Engineer & entrepreneur workspace</div>
              </div>
            </div>

            <nav className="nav-group" aria-label="Primary">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`nav-item ${pathname === n.href ? "active" : ""}`}
                >
                  <span className="nav-icon">{n.icon}</span>
                  <span>{n.label}</span>
                </Link>
              ))}
            </nav>

            <div className="sidebar-footer">
              <div className="sidebar-footnote">Design direction</div>
              <div className="sidebar-footvalue">Clarity, depth, hierarchy</div>
            </div>
          </aside>

          <div className="main-column">
            <header className="topbar">
              <div>
                <div className="eyebrow">Andrii Site</div>
                <div className="topbar-title">Personal site + invoicing workspace</div>
              </div>
              <div className="topbar-chip">Port 3500</div>
            </header>

            <main className="main">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
