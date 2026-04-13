"use client";

import { FOP_DATA } from "@/lib/fop-data";

export default function SettingsPage() {
  return (
    <>
      <div className="page-title">Реквізити ФОП</div>
      <div className="page-subtitle">Дані вашого ФОП, вбудовані в додаток, тепер оформлені як компактний reference hub.</div>

      <div className="card">
        <div className="card-title">Основна інформація</div>
        <div className="info-grid">
          <div><div className="info-label">ПІБ (укр)</div><div className="info-value">{FOP_DATA.nameUk}</div></div>
          <div><div className="info-label">Name (EN)</div><div className="info-value">{FOP_DATA.nameEn}</div></div>
          <div><div className="info-label">ІПН (РНОКПП)</div><div className="info-value mono">{FOP_DATA.ipn}</div></div>
          <div><div className="info-label">Дата реєстрації</div><div className="info-value">{FOP_DATA.registrationDate}</div></div>
          <div><div className="info-label">Адреса</div><div className="info-value">{FOP_DATA.addressUk}</div></div>
          <div><div className="info-label">КВЕД</div><div className="info-value">{FOP_DATA.kved}</div></div>
          <div><div className="info-label">Група</div><div className="info-value">{FOP_DATA.taxGroup}</div></div>
          <div><div className="info-label">Платник ПДВ</div><div className="info-value">{FOP_DATA.isVAT ? "Так" : "Ні"}</div></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Банківські реквізити — {FOP_DATA.bank.nameUk}</div>
        <div className="info-grid">
          <div><div className="info-label">Банк</div><div className="info-value">{FOP_DATA.bank.name}</div></div>
          <div><div className="info-label">МФО</div><div className="info-value mono">{FOP_DATA.bank.mfo}</div></div>
          <div><div className="info-label">SWIFT</div><div className="info-value mono">{FOP_DATA.bank.swift}</div></div>
          <div><div className="info-label">Адреса банку</div><div className="info-value">{FOP_DATA.bank.address}</div></div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div className="info-label" style={{ marginBottom: 12 }}>Рахунки IBAN</div>
          {Object.entries(FOP_DATA.bank.accounts).map(([cur, iban]) => (
            <div key={cur} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span className="badge badge-currency" style={{ minWidth: 40, textAlign: "center" }}>{cur}</span>
              <span className="info-value mono">{iban}</span>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
