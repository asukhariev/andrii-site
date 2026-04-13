"use client";

import { useState, useEffect } from "react";

interface Item {
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

interface InvoiceForm {
  id?: string;
  number: string;
  clientId: string;
  date: string;
  dueDate: string;
  currency: string;
  type: string;
  items: Item[];
  notes: string;
  status: string;
  total: number;
}

interface Client {
  id: string;
  name: string;
  currency: string;
}

export default function InvoiceModal({
  invoice,
  clients,
  nextNum,
  onSave,
  onClose,
}: {
  invoice?: InvoiceForm | null;
  clients: Client[];
  nextNum: number;
  onSave: (data: InvoiceForm) => void;
  onClose: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const due = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);

  const [form, setForm] = useState<InvoiceForm>(
    invoice || {
      number: String(nextNum).padStart(4, "0"),
      clientId: clients[0]?.id || "",
      date: today,
      dueDate: due,
      currency: "USD",
      type: "hourly",
      items: [{ description: "Software development services", qty: 160, rate: 0, amount: 0 }],
      notes: "Thank you for your business!",
      status: "pending",
      total: 0,
    }
  );

  const selectedClient = clients.find((c) => c.id === form.clientId);

  useEffect(() => {
    if (selectedClient && !invoice) {
      setForm((f) => ({ ...f, currency: selectedClient.currency || "USD" }));
    }
  }, [form.clientId, selectedClient, invoice]);

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const updateItem = (idx: number, field: string, val: string | number) => {
    const items = [...form.items];
    items[idx] = { ...items[idx], [field]: val };
    if (field === "qty" || field === "rate") {
      items[idx].amount = (Number(items[idx].qty) || 0) * (Number(items[idx].rate) || 0);
    }
    setForm({ ...form, items });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { description: "", qty: 1, rate: 0, amount: 0 }] });
  const removeItem = (idx: number) => setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });
  const total = form.items.reduce((s, i) => s + (Number(i.amount) || 0), 0);

  const currSymbol: Record<string, string> = { USD: "$", EUR: "€", UAH: "₴" };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">{invoice ? "Редагувати інвойс" : "Новий інвойс"}</div>

        <div className="form-row-3">
          <div className="form-group">
            <label className="form-label">Номер інвойсу</label>
            <input className="form-input" value={form.number} onChange={(e) => set("number", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Дата</label>
            <input className="form-input" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Дата оплати</label>
            <input className="form-input" type="date" value={form.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
          </div>
        </div>

        <div className="form-row-3">
          <div className="form-group">
            <label className="form-label">Клієнт *</label>
            <select className="form-select" value={form.clientId} onChange={(e) => set("clientId", e.target.value)}>
              <option value="">Обрати клієнта...</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Валюта</label>
            <select className="form-select" value={form.currency} onChange={(e) => set("currency", e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="UAH">UAH (₴)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Тип</label>
            <select className="form-select" value={form.type} onChange={(e) => set("type", e.target.value)}>
              <option value="hourly">Hourly Rate</option>
              <option value="fixed">Fixed Price</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="line-item line-item-header">
            <span>Опис</span>
            <span>{form.type === "hourly" ? "Години" : "К-сть"}</span>
            <span>{form.type === "hourly" ? "Ставка" : "Ціна"}</span>
            <span>Сума</span>
            <span></span>
          </div>
          {form.items.map((item, i) => (
            <div className="line-item" key={i}>
              <input className="form-input" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Опис послуги..." />
              <input className="form-input" type="number" value={item.qty} onChange={(e) => updateItem(i, "qty", e.target.value)} />
              <input className="form-input" type="number" value={item.rate} onChange={(e) => updateItem(i, "rate", e.target.value)} />
              <input className="form-input" type="number" value={item.amount.toFixed(2)} readOnly style={{ background: "transparent" }} />
              <button className="remove-btn" onClick={() => removeItem(i)}>×</button>
            </div>
          ))}
          <button className="btn btn-secondary btn-sm" onClick={addItem} style={{ marginTop: 8 }}>+ Додати рядок</button>
        </div>

        <div className="totals">
          <div className="total-row grand">
            <span>Всього:</span>
            <span>{currSymbol[form.currency] || "$"}{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: 16 }}>
          <label className="form-label">Примітки</label>
          <textarea className="form-textarea" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Скасувати</button>
          <button className="btn btn-primary" onClick={() => { if (form.clientId) onSave({ ...form, total }); }} disabled={!form.clientId}>
            {invoice ? "Зберегти" : "Створити інвойс"}
          </button>
        </div>
      </div>
    </div>
  );
}
