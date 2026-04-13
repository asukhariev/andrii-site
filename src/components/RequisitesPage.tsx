"use client";

import Link from "next/link";
import { FOP_DATA } from "@/lib/fop-data";

type Lang = "uk" | "en";

const bankAddressUk = "вул. Андріївська, 2/12, Київ, 04070, Україна";

const T = {
  uk: {
    back: "Назад",
    download: "Завантажити",
    heroTitle: "Платіжні реквізити",
    heroSub: "ФОП Сухарєв Андрій Андрійович",
    taxGroup: FOP_DATA.taxGroup,
    vatStatus: FOP_DATA.isVAT ? "Платник ПДВ" : "Не платник ПДВ",
    createdLabel: "Сформовано",
    uah: {
      langLabel: "UAH / Українська",
      title: "Платіжні реквізити в гривні",
      subtitle: "Для локальних переказів у гривні в межах України",
      beneficiary: "Отримувач",
      name: "Найменування",
      nameValue: FOP_DATA.nameUk,
      fullName: "ПІБ",
      fullNameValue: FOP_DATA.nameUk,
      taxId: "ІПН",
      regDate: "Дата реєстрації",
      taxGroupLabel: "Група оподаткування",
      vatLabel: "Статус ПДВ",
      address: "Адреса",
      addressValue: FOP_DATA.addressUk,
      kved: "КВЕД",
      kvedValue: FOP_DATA.kved,
      bankSection: "Банківські реквізити",
      bank: "Банк",
      bankValue: FOP_DATA.bank.nameUk,
      mfo: "МФО",
      bankAddress: "Адреса банку",
      bankAddressValue: bankAddressUk,
      iban: "IBAN UAH",
    },
    usd: {
      langLabel: "USD / Долар США",
      title: "Платіжні реквізити в доларах",
      subtitle: "Для міжнародних переказів у доларах США",
      beneficiary: "Отримувач",
      name: "Найменування",
      nameValue: "ФОП Сухарєв Андрій",
      fullName: "ПІБ",
      fullNameValue: FOP_DATA.fullNameEn,
      taxId: "ІПН",
      regDate: "Дата реєстрації",
      taxGroupLabel: "Група оподаткування",
      vatLabel: "Статус ПДВ",
      address: "Адреса",
      addressValue: FOP_DATA.addressEn,
      bankSection: "Банківські реквізити",
      bank: "Банк",
      bankValue: FOP_DATA.bank.name,
      bankAddress: "Адреса банку",
      bankAddressValue: FOP_DATA.bank.address,
      iban: "IBAN USD",
    },
    eur: {
      langLabel: "EUR / Євро",
      title: "Платіжні реквізити в євро",
      subtitle: "Для міжнародних переказів у євро",
      beneficiary: "Отримувач",
      name: "Найменування",
      nameValue: "ФОП Сухарєв Андрій",
      fullName: "ПІБ",
      fullNameValue: FOP_DATA.fullNameEn,
      taxId: "ІПН",
      regDate: "Дата реєстрації",
      taxGroupLabel: "Група оподаткування",
      vatLabel: "Статус ПДВ",
      address: "Адреса",
      addressValue: FOP_DATA.addressEn,
      bankSection: "Банківські реквізити",
      bank: "Банк",
      bankValue: FOP_DATA.bank.name,
      bankAddress: "Адреса банку",
      bankAddressValue: FOP_DATA.bank.address,
      iban: "IBAN EUR",
    },
  },
  en: {
    back: "Back",
    download: "Download",
    heroTitle: "Payment details",
    heroSub: "PE Andrii Sukhariev",
    taxGroup: FOP_DATA.taxGroup.includes("3")
      ? "Group 3 single tax, 5% + 1% military levy"
      : FOP_DATA.taxGroup,
    vatStatus: FOP_DATA.isVAT ? "VAT payer" : "Non-VAT payer",
    createdLabel: "Created on",
    uah: {
      langLabel: "UAH / Ukrainian hryvnia",
      title: "UAH payment details",
      subtitle: "For local transfers in Ukrainian hryvnia",
      beneficiary: "Beneficiary",
      name: "Beneficiary name",
      nameValue: FOP_DATA.nameUk,
      fullName: "Full name",
      fullNameValue: FOP_DATA.nameUk,
      taxId: "Tax ID",
      regDate: "Registration date",
      taxGroupLabel: "Tax group",
      vatLabel: "VAT status",
      address: "Address",
      addressValue: FOP_DATA.addressUk,
      kved: "KVED",
      kvedValue: FOP_DATA.kved,
      bankSection: "Bank details",
      bank: "Bank",
      bankValue: FOP_DATA.bank.nameUk,
      mfo: "MFO",
      bankAddress: "Bank address",
      bankAddressValue: bankAddressUk,
      iban: "UAH IBAN",
    },
    usd: {
      langLabel: "USD / US dollar",
      title: "USD payment details",
      subtitle: "For international transfers in US dollars",
      beneficiary: "Beneficiary",
      name: "Beneficiary name",
      nameValue: "PE Andrii Sukhariev",
      fullName: "Full name",
      fullNameValue: FOP_DATA.fullNameEn,
      taxId: "Tax ID",
      regDate: "Registration date",
      taxGroupLabel: "Tax group",
      vatLabel: "VAT status",
      address: "Address",
      addressValue: FOP_DATA.addressEn,
      bankSection: "Bank details",
      bank: "Bank",
      bankValue: FOP_DATA.bank.name,
      bankAddress: "Bank address",
      bankAddressValue: FOP_DATA.bank.address,
      iban: "USD IBAN",
    },
    eur: {
      langLabel: "EUR / Euro",
      title: "EUR payment details",
      subtitle: "For international transfers in euro",
      beneficiary: "Beneficiary",
      name: "Beneficiary name",
      nameValue: "PE Andrii Sukhariev",
      fullName: "Full name",
      fullNameValue: FOP_DATA.fullNameEn,
      taxId: "Tax ID",
      regDate: "Registration date",
      taxGroupLabel: "Tax group",
      vatLabel: "VAT status",
      address: "Address",
      addressValue: FOP_DATA.addressEn,
      bankSection: "Bank details",
      bank: "Bank",
      bankValue: FOP_DATA.bank.name,
      bankAddress: "Bank address",
      bankAddressValue: FOP_DATA.bank.address,
      iban: "EUR IBAN",
    },
  },
} as const;

type LangT = (typeof T)[Lang];
type CurrencySection = LangT["uah"] | LangT["usd"] | LangT["eur"];

function PaymentSection({
  t,
  parent,
  symbol,
  iban,
  isPageBreak,
}: {
  t: CurrencySection;
  parent: LangT;
  symbol: string;
  iban: string;
  isPageBreak?: boolean;
}) {
  return (
    <section className={`document-language-block${isPageBreak ? " document-page-break" : ""}`}>
      <div className="document-currency-mark" aria-hidden="true">{symbol}</div>
      <div className="document-meta-row">
        <div className="document-language">{t.langLabel}</div>
      </div>
      <div className="document-stack">
        <div className="document-sheet-title">{t.title}</div>
        <div className="document-sheet-subtitle">{t.subtitle}</div>

        <div className="document-section-title">{t.beneficiary}</div>
        <div className="document-list">
          <div className="document-item">
            <div className="document-key">{t.name}</div>
            <div className="document-value">{t.nameValue}</div>
          </div>
          <div className="document-item">
            <div className="document-key">{t.fullName}</div>
            <div className="document-value">{t.fullNameValue}</div>
          </div>
          <div className="document-item">
            <div className="document-key">{t.taxId}</div>
            <div className="document-value">{FOP_DATA.ipn}</div>
          </div>
          <div className="document-item">
            <div className="document-key">{t.regDate}</div>
            <div className="document-value">{FOP_DATA.registrationDate}</div>
          </div>
          <div className="document-item">
            <div className="document-key">{t.taxGroupLabel}</div>
            <div className="document-value">{parent.taxGroup}</div>
          </div>
          <div className="document-item">
            <div className="document-key">{t.vatLabel}</div>
            <div className="document-value">{parent.vatStatus}</div>
          </div>
          <div className="document-item">
            <div className="document-key">{t.address}</div>
            <div className="document-value">{t.addressValue}</div>
          </div>
          {"kved" in t && (
            <div className="document-item">
              <div className="document-key">{(t as typeof T["uk"]["uah"]).kved}</div>
              <div className="document-value">{(t as typeof T["uk"]["uah"]).kvedValue}</div>
            </div>
          )}
        </div>

        <div className="document-section-title">{t.bankSection}</div>
        <div className="document-list">
          <div className="document-item">
            <div className="document-key">{t.bank}</div>
            <div className="document-value">{t.bankValue}</div>
          </div>
          {"mfo" in t && (
            <div className="document-item">
              <div className="document-key">МФО</div>
              <div className="document-value">{FOP_DATA.bank.mfo}</div>
            </div>
          )}
          <div className="document-item">
            <div className="document-key">{t.bankAddress}</div>
            <div className="document-value">{t.bankAddressValue}</div>
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
            <div className="document-key">{t.iban}</div>
            <div className="document-value document-mono">{iban}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RequisitesPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const prefix = lang === "en" ? "/en" : "";

  return (
    <div className="document-page">
      <header className="site-header">
        <Link href={prefix || "/"} className="site-header-back">
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
          <Link
            href="/requisites"
            className={`home-lang-button ${lang === "uk" ? "active" : ""}`}
            role="tab"
            aria-selected={lang === "uk"}
          >
            UA
          </Link>
          <Link
            href="/en/requisites"
            className={`home-lang-button ${lang === "en" ? "active" : ""}`}
            role="tab"
            aria-selected={lang === "en"}
          >
            EN
          </Link>
        </div>
      </header>

      <div className="requisites-hero">
        <h1 className="requisites-title">{t.heroTitle}</h1>
        <p className="requisites-subtitle">{t.heroSub}</p>
      </div>

      <PaymentSection t={t.uah} parent={t} symbol="₴" iban={FOP_DATA.bank.accounts.UAH} />
      <PaymentSection t={t.usd} parent={t} symbol="$" iban={FOP_DATA.bank.accounts.USD} isPageBreak />
      <PaymentSection t={t.eur} parent={t} symbol="€" iban={FOP_DATA.bank.accounts.EUR} isPageBreak />
    </div>
  );
}
