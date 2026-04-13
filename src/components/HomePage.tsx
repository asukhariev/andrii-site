"use client";

import Link from "next/link";

type Lang = "uk" | "en";

const COPY = {
  uk: {
    title: <>Від ідеї до компанії.</>,
    sub: "Я Андрій. AI-агенти та стратегія штучного інтелекту, запуск, архітектура, дизайн, команда, юридичка, код — закриваю end-to-end. Одна людина замість цілого відділу. Напиши — обговоримо.",
    email: "Написати",
    pay: "Реквізити",
    ogTitle: "Андрій — Інженер та підприємець",
    ogDesc: "AI-агенти та стратегія штучного інтелекту, запуск, архітектура, дизайн, команда, юридичка, код — end-to-end.",
  },
  en: {
    title: <>From idea to company.</>,
    sub: "I'm Andrii. AI agents and applied AI strategy, launch, architecture, design, team, legal, code — I close it all end-to-end. One person instead of a whole department. Reach out and let's talk.",
    email: "Email me",
    pay: "Pay me",
    ogTitle: "Andrii — Engineer & Entrepreneur",
    ogDesc: "AI agents and applied AI strategy, launch, architecture, design, team, legal, code — end-to-end.",
  },
} as const;

export default function HomePage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const prefix = lang === "en" ? "/en" : "";

  return (
    <>
    <head>
      <title>{t.ogTitle}</title>
      <meta property="og:title" content={t.ogTitle} />
      <meta property="og:description" content={t.ogDesc} />
      <meta property="og:image" content={`https://andri.website/api/og?lang=${lang}`} />
      <meta name="description" content={t.ogDesc} />
      <meta name="twitter:image" content={`https://andri.website/api/og?lang=${lang}`} />
    </head>
    <main className="home-landing">
      <div className="home-float home-float--figma" aria-hidden title="Figma">
        <svg viewBox="0 0 100 100" aria-hidden>
          <defs>
            <radialGradient id="figBg" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <filter id="figGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
          <rect width="100" height="100" rx="22" fill="url(#figBg)" />
          <g filter="url(#figGlow)" opacity="0.5">
            <rect x="33" y="18" width="34" height="18" rx="9" fill="#ff4d4d" />
            <rect x="50" y="18" width="17" height="18" rx="9" fill="#ff7a2a" />
            <circle cx="41" cy="50" r="9" fill="#a259ff" />
            <circle cx="58" cy="50" r="9" fill="#1abcfe" />
            <circle cx="41" cy="67" r="9" fill="#0acf83" />
          </g>
          <rect x="33" y="18" width="34" height="18" rx="9" fill="#ff4d4d" />
          <rect x="50" y="18" width="17" height="18" rx="9" fill="#ff7a2a" />
          <circle cx="41" cy="50" r="9" fill="#a259ff" />
          <circle cx="58" cy="50" r="9" fill="#1abcfe" />
          <circle cx="41" cy="67" r="9" fill="#0acf83" />
        </svg>
      </div>
      <div className="home-float home-float--claude" aria-hidden title="Claude">
        <img src="/icons/claude-new.svg" alt="" />
      </div>
      <div className="home-float home-float--chatgpt" aria-hidden title="ChatGPT">
        <img src="/icons/chatgpt.svg" alt="" />
      </div>
      <div className="home-float home-float--gemini" aria-hidden title="Gemini">
        <img src="/icons/gemini.svg" alt="" />
      </div>
      <div className="home-float home-float--vercel" aria-hidden title="Vercel">
        <img src="/icons/vercel.svg" alt="" />
      </div>
      <div className="home-float home-float--n8n" aria-hidden title="n8n">
        <svg viewBox="0 0 100 100" aria-hidden>
          <g fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round">
            <path d="M26 50 H44" />
            <path d="M56 50 C 62 50, 62 38, 68 38 H78" />
            <path d="M56 50 C 62 50, 62 62, 68 62 H78" />
          </g>
          <g fill="#ea4b71" stroke="#fff" strokeWidth="7">
            <circle cx="26" cy="50" r="8" />
            <circle cx="50" cy="50" r="8" />
            <circle cx="82" cy="38" r="8" />
            <circle cx="82" cy="62" r="8" />
          </g>
        </svg>
      </div>

      <div className="home-lang-switch" role="tablist" aria-label="Language switch">
        <Link
          href="/"
          className={`home-lang-button ${lang === "uk" ? "active" : ""}`}
          role="tab"
          aria-selected={lang === "uk"}
        >
          UA
        </Link>
        <Link
          href="/en"
          className={`home-lang-button ${lang === "en" ? "active" : ""}`}
          role="tab"
          aria-selected={lang === "en"}
        >
          EN
        </Link>
      </div>

      <div className="home-stage">
        <div className="home-avatar" aria-hidden>
          <video
            src="/avatar.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>

        <h1 className="home-title">{t.title}</h1>
        <p className="home-sub">{t.sub}</p>

        <div className="home-actions">
          <a className="home-btn home-btn--dark" href="mailto:sukhariev.andrii@gmail.com">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 6h16v12H4z" />
              <path d="M4 6l8 7 8-7" />
            </svg>
            {t.email}
          </a>
        </div>

        <nav className="home-links" aria-label="Links">
          <Link href={`${prefix}/requisites`} className="home-linkitem home-linkitem--active">
            {t.pay}
          </Link>
          <a href="https://www.linkedin.com/in/andrii-sukhariev-011a03b3/" target="_blank" rel="noopener noreferrer" className="home-linkitem">LinkedIn</a>
          <a href="https://github.com/asukhariev" target="_blank" rel="noopener noreferrer" className="home-linkitem">GitHub</a>
        </nav>
      </div>

      <a href="#top" className="home-up" aria-label="Back to top">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>
    </main>
    </>
  );
}
