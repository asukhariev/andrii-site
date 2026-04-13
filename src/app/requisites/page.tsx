"use client";

import { FOP_DATA } from "@/lib/fop-data";

const taxGroupLabel = FOP_DATA.taxGroup.includes("3")
  ? "Group 3 single tax, 5% + 1% military levy"
  : FOP_DATA.taxGroup;

const vatLabel = FOP_DATA.isVAT ? "VAT payer" : "Non-VAT payer";
const vatLabelUk = FOP_DATA.isVAT ? "Платник ПДВ" : "Не платник ПДВ";
const bankAddressUk = "вул. Андріївська, 2/12, Київ, 04070, Україна";

export default function FopDocumentPage() {
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

      <div className="document-actions">
        <button className="document-download-button" onClick={() => window.print()}>
          Завантажити
        </button>
      </div>
    </div>
  );
}
