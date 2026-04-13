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
  const isDocumentPage = pathname === "/" || pathname === "/fop-document";

  if (isDocumentPage) {
    return (
      <html lang="uk">
        <head>
          <title>Andrii — Engineer & Entrepreneur</title>
        </head>
        <body className={pathname === "/" ? "home-body" : undefined}>{children}</body>
      </html>
    );
  }

  return (
    <html lang="uk">
      <head>
        <title>Andrii — Engineer & Entrepreneur</title>
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
