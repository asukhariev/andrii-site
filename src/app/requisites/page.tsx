"use client";

import { useState } from "react";
import Link from "next/link";
import { FOP_DATA } from "@/lib/fop-data";

type Lang = "uk" | "en";

const taxGroupLabel = FOP_DATA.taxGroup.includes("3")
  ? "Group 3 single tax, 5% + 1% military levy"
  : FOP_DATA.taxGroup;

const vatLabel = FOP_DATA.isVAT ? "VAT payer" : "Non-VAT payer";
const vatLabelUk = FOP_DATA.isVAT ? "Платник ПДВ" : "Не платник ПДВ";
const bankAddressUk = "вул. Андріївська, 2/12, Київ, 04070, Україна";

const COPY = {
  uk: {
    back: "Назад",
    download: "Завантажити",
    heroTitle: "Платіжні реквізити",
    heroSub: "ФОП Сухарєв Андрій Андрійович",
  },
  en: {
    back: "Back",
    download: "Download",
    heroTitle: "Payment details",
    heroSub: "PE Andrii Sukhariev",
  },
} as const;

export default function FopDocumentPage() {
  const [lang, setLang] = useState<Lang>("uk");
  const t = COPY[lang];

  const createdAtEn = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const createdAtUk = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="document-page">
      <header className="site-header">
        <Link href="/" className="site-header-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t.back}
        </Link>
        <div className="site-header-center">
          <button className="site-header-download" onClick={() => window.print()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span className="hide-mobile">{t.download}</span>
          </button>
        </div>
        <div className="home-lang-switch" role="tablist" aria-label="Language switch">
          <button
            className={`home-lang-button ${lang === "uk" ? "active" : ""}`}
            onClick={() => setLang("uk")}
            type="button"
            role="tab"
            aria-selected={lang === "uk"}
          >
            UA
          </button>
          <button
            className={`home-lang-button ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
            type="button"
            role="tab"
            aria-selected={lang === "en"}
          >
            EN
          </button>
        </div>
      </header>

      <div className="requisites-hero">
        <h1 className="requisites-title">{t.heroTitle}</h1>
        <p className="requisites-subtitle">{t.heroSub}</p>
      </div>

      <section className="document-language-block">
        <div className="document-currency-mark" aria-hidden="true">₴</div>
        <div className="document-meta-row">
          <div className="document-language">UAH / Українська</div>
          <div className="document-created-at">Сформовано {createdAtUk}</div>
        </div>
        <div className="document-stack">
          <div className="document-sheet-title">Платіжні реквізити в гривні</div>
          <div className="document-sheet-subtitle">Для локальних переказів у гривні в межах України</div>

          <div className="document-section-title">Отримувач</div>
          <div className="document-list">
            <div className="document-item">
              <div className="document-key">Найменування</div>
              <div className="document-value">{FOP_DATA.nameUk}</div>
            </div>
            <div className="document-item">
              <div className="document-key">ПІБ</div>
              <div className="document-value">{FOP_DATA.nameUk}</div>
            </div>
            <div className="document-item">
              <div className="document-key">ІПН</div>
              <div className="document-value">{FOP_DATA.ipn}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Дата реєстрації</div>
              <div className="document-value">{FOP_DATA.registrationDate}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Група оподаткування</div>
              <div className="document-value">{FOP_DATA.taxGroup}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Статус ПДВ</div>
              <div className="document-value">{vatLabelUk}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Адреса</div>
              <div className="document-value">{FOP_DATA.addressUk}</div>
            </div>
            <div className="document-item">
              <div className="document-key">КВЕД</div>
              <div className="document-value">{FOP_DATA.kved}</div>
            </div>
          </div>

          <div className="document-section-title">Банківські реквізити</div>
          <div className="document-list">
            <div className="document-item">
              <div className="document-key">Банк</div>
              <div className="document-value">{FOP_DATA.bank.nameUk}</div>
            </div>
            <div className="document-item">
              <div className="document-key">МФО</div>
              <div className="document-value">{FOP_DATA.bank.mfo}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Адреса банку</div>
              <div className="document-value">{bankAddressUk}</div>
            </div>
            <div className="document-item">
              <div className="document-key">SWIFT</div>
              <div className="document-value">{FOP_DATA.bank.swift}</div>
            </div>
            <div className="document-item">
              <div className="document-key">IBAN UAH</div>
              <div className="document-value document-mono">{FOP_DATA.bank.accounts.UAH}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="document-language-block document-page-break">
        <div className="document-currency-mark" aria-hidden="true">$</div>
        <div className="document-meta-row">
          <div className="document-language">USD / English</div>
          <div className="document-created-at">Created on {createdAtEn}</div>
        </div>
        <div className="document-stack">
          <div className="document-sheet-title">USD payment details</div>
          <div className="document-sheet-subtitle">For international transfers in US dollars</div>

          <div className="document-section-title">Beneficiary</div>
          <div className="document-list">
            <div className="document-item">
              <div className="document-key">Beneficiary name</div>
              <div className="document-value">PE Andrii Sukhariev</div>
            </div>
            <div className="document-item">
              <div className="document-key">Full name</div>
              <div className="document-value">{FOP_DATA.fullNameEn}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Tax ID</div>
              <div className="document-value">{FOP_DATA.ipn}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Registration date</div>
              <div className="document-value">{FOP_DATA.registrationDate}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Tax group</div>
              <div className="document-value">{taxGroupLabel}</div>
            </div>
            <div className="document-item">
              <div className="document-key">VAT status</div>
              <div className="document-value">{vatLabel}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Address</div>
              <div className="document-value">{FOP_DATA.addressEn}</div>
            </div>
          </div>

          <div className="document-section-title">Bank</div>
          <div className="document-list">
            <div className="document-item">
              <div className="document-key">Bank</div>
              <div className="document-value">{FOP_DATA.bank.name}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Bank address</div>
              <div className="document-value">{FOP_DATA.bank.address}</div>
            </div>
            <div className="document-item">
              <div className="document-key">SWIFT</div>
              <div className="document-value">{FOP_DATA.bank.swift}</div>
            </div>
            <div className="document-item">
              <div className="document-key">MFO</div>
              <div className="document-value">{FOP_DATA.bank.mfo}</div>
            </div>
            <div className="document-item">
              <div className="document-key">USD IBAN</div>
              <div className="document-value document-mono">{FOP_DATA.bank.accounts.USD}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="document-language-block document-page-break">
        <div className="document-currency-mark" aria-hidden="true">€</div>
        <div className="document-meta-row">
          <div className="document-language">EUR / English</div>
          <div className="document-created-at">Created on {createdAtEn}</div>
        </div>
        <div className="document-stack">
          <div className="document-sheet-title">EUR payment details</div>
          <div className="document-sheet-subtitle">For international transfers in euro</div>

          <div className="document-section-title">Beneficiary</div>
          <div className="document-list">
            <div className="document-item">
              <div className="document-key">Beneficiary name</div>
              <div className="document-value">PE Andrii Sukhariev</div>
            </div>
            <div className="document-item">
              <div className="document-key">Full name</div>
              <div className="document-value">{FOP_DATA.fullNameEn}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Tax ID</div>
              <div className="document-value">{FOP_DATA.ipn}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Registration date</div>
              <div className="document-value">{FOP_DATA.registrationDate}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Tax group</div>
              <div className="document-value">{taxGroupLabel}</div>
            </div>
            <div className="document-item">
              <div className="document-key">VAT status</div>
              <div className="document-value">{vatLabel}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Address</div>
              <div className="document-value">{FOP_DATA.addressEn}</div>
            </div>
          </div>

          <div className="document-section-title">Bank</div>
          <div className="document-list">
            <div className="document-item">
              <div className="document-key">Bank</div>
              <div className="document-value">{FOP_DATA.bank.name}</div>
            </div>
            <div className="document-item">
              <div className="document-key">Bank address</div>
              <div className="document-value">{FOP_DATA.bank.address}</div>
            </div>
            <div className="document-item">
              <div className="document-key">SWIFT</div>
              <div className="document-value">{FOP_DATA.bank.swift}</div>
            </div>
            <div className="document-item">
              <div className="document-key">MFO</div>
              <div className="document-value">{FOP_DATA.bank.mfo}</div>
            </div>
            <div className="document-item">
              <div className="document-key">EUR IBAN</div>
              <div className="document-value document-mono">{FOP_DATA.bank.accounts.EUR}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
