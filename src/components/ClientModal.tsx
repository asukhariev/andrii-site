"use client";

import { useState } from "react";

interface ClientForm {
  id?: string;
  name: string;
  email: string;
  country: string;
  address: string;
  taxId: string;
  currency: string;
  notes: string;
}

export default function ClientModal({
  client,
  onSave,
  onClose,
}: {
  client?: ClientForm | null;
  onSave: (data: ClientForm) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ClientForm>(
    client || { name: "", email: "", country: "", address: "", taxId: "", currency: "USD", notes: "" }
  );
  const set = (k: keyof ClientForm, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">{client ? "Редагувати клієнта" : "Новий клієнт"}</div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Назва компанії / Ім&apos;я *</label>
            <input className="form-input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Acme Corp" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="billing@acme.com" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Країна</label>
            <input className="form-input" value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="USA" />
          </div>
          <div className="form-group">
            <label className="form-label">Валюта за замовч.</label>
            <select className="form-select" value={form.currency} onChange={(e) => set("currency", e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Адреса</label>
          <input className="form-input" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="123 Main St, New York" />
        </div>
        <div className="form-group">
          <label className="form-label">Tax ID / VAT</label>
          <input className="form-input" value={form.taxId} onChange={(e) => set("taxId", e.target.value)} placeholder="EIN / VAT number" />
        </div>
        <div className="form-group">
          <label className="form-label">Нотатки</label>
          <textarea className="form-textarea" value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Контактна особа, умови оплати..." />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Скасувати</button>
          <button className="btn btn-primary" onClick={() => { if (form.name.trim()) onSave(form); }} disabled={!form.name.trim()}>
            {client ? "Зберегти" : "Додати клієнта"}
          </button>
        </div>
      </div>
    </div>
  );
}
