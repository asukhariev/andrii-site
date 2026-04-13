"use client";

import { useState, useEffect, useCallback } from "react";
import InvoiceModal from "@/components/InvoiceModal";
import InvoicePreview from "@/components/InvoicePreview";
import Toast from "@/components/Toast";
import { exportInvoicePDF } from "@/lib/export-pdf";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Invoice = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = any;

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);
  const [preview, setPreview] = useState<Invoice | null>(null);
  const [nextNum, setNextNum] = useState(1);
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    const [inv, cl, stats] = await Promise.all([
      fetch(`/api/invoices?search=${encodeURIComponent(search)}&status=${statusFilter}`).then((r) => r.json()),
      fetch("/api/clients").then((r) => r.json()),
      fetch("/api/stats").then((r) => r.json()),
    ]);
    setInvoices(inv);
    setClients(cl);
    setNextNum(stats.nextInvoiceNum);
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (data: Invoice) => {
    const { id, client, ...body } = data;
    if (editInvoice) {
      await fetch(`/api/invoices/${editInvoice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setToast("Інвойс оновлено");
    } else {
      await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setToast("Інвойс створено");
    }
    setShowModal(false);
    setEditInvoice(null);
    load();
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setToast(`Статус: ${status === "paid" ? "Оплачено" : status === "pending" ? "Очікує" : "Прострочено"}`);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити інвойс?")) return;
    await fetch(`/api/invoices/${id}`, { method: "DELETE" });
    setToast("Інвойс видалено");
    load();
  };

  const sym: Record<string, string> = { USD: "$", EUR: "€", UAH: "₴" };
  const tabs = [["all", "Всі"], ["pending", "Очікують"], ["paid", "Оплачені"], ["overdue", "Прострочені"]];

  return (
    <>
      <div className="page-header">
        <div className="page-title">Інвойси</div>
        <button className="btn btn-primary" onClick={() => {
          if (clients.length === 0) { setToast("Спочатку додайте клієнта!"); return; }
          setEditInvoice(null);
          setShowModal(true);
        }}>+ Новий інвойс</button>
      </div>
      <div className="page-subtitle">A focused invoice list with segmented filtering and softer hierarchy. Зараз: {invoices.length} інвойсів.</div>

      <div className="search-bar">
        <input className="search-input" placeholder="Пошук за номером або клієнтом..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="tabs">
        {tabs.map(([k, label]) => (
          <div key={k} className={`tab ${statusFilter === k ? "active" : ""}`} onClick={() => setStatusFilter(k)}>{label}</div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {invoices.length === 0 ? (
          <div style={{ color: "var(--text2)", padding: 24 }}>
            {search || statusFilter !== "all" ? "Нічого не знайдено" : "Створіть перший інвойс"}
          </div>
        ) : (
          <table>
            <thead><tr><th>№</th><th>Клієнт</th><th>Дата</th><th>Оплата до</th><th>Сума</th><th>Статус</th><th>Дії</th></tr></thead>
            <tbody>
              {invoices.map((inv: Invoice) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 500, cursor: "pointer" }} onClick={() => setPreview(inv)}>#{inv.number}</td>
                  <td>{inv.client?.name || "—"}</td>
                  <td>{new Date(inv.date).toISOString().slice(0, 10)}</td>
                  <td>{new Date(inv.dueDate).toISOString().slice(0, 10)}</td>
                  <td style={{ fontWeight: 600 }}>{sym[inv.currency] || "$"}{inv.total.toFixed(2)}</td>
                  <td>
                    <select className="form-select" style={{ width: 120, padding: "4px 8px", fontSize: 12 }} value={inv.status} onChange={(e) => handleStatusChange(inv.id, e.target.value)}>
                      <option value="pending">Очікує</option>
                      <option value="paid">Оплачено</option>
                      <option value="overdue">Прострочено</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setPreview(inv)}>PDF</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => {
                        setEditInvoice({
                          ...inv,
                          date: new Date(inv.date).toISOString().slice(0, 10),
                          dueDate: new Date(inv.dueDate).toISOString().slice(0, 10),
                        });
                        setShowModal(true);
                      }}>Ред.</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(inv.id)}>×</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <InvoiceModal
          invoice={editInvoice}
          clients={clients}
          nextNum={nextNum}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditInvoice(null); }}
        />
      )}
      {preview && (
        <InvoicePreview
          invoice={preview}
          onClose={() => setPreview(null)}
          onExportPDF={() => { exportInvoicePDF(preview); setToast("PDF збережено!"); }}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </>
  );
}
