"use client";

import { FOP_DATA } from "@/lib/fop-data";

interface Item { description: string; qty: number; rate: number; amount: number; }
interface Invoice {
  id: string; number: string; date: string; dueDate: string;
  currency: string; type: string; total: number; notes: string;
  items: Item[];
  client?: { name: string; address?: string; taxId?: string; email?: string } | null;
}

export default function InvoicePreview({
  invoice,
  onClose,
  onExportPDF,
}: {
  invoice: Invoice;
  onClose: () => void;
  onExportPDF: () => void;
}) {
  const currSymbol: Record<string, string> = { USD: "$", EUR: "€", UAH: "₴" };
  const sym = currSymbol[invoice.currency] || "$";
  const iban = FOP_DATA.bank.accounts[invoice.currency] || FOP_DATA.bank.accounts.USD;
  const client = invoice.client;
  const dateStr = typeof invoice.date === "string" ? invoice.date.slice(0, 10) : new Date(invoice.date).toISOString().slice(0, 10);
  const dueDateStr = typeof invoice.dueDate === "string" ? invoice.dueDate.slice(0, 10) : new Date(invoice.dueDate).toISOString().slice(0, 10);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "16px 28px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600 }}>Перегляд інвойсу #{invoice.number}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={onExportPDF}>Експорт PDF</button>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>Закрити</button>
          </div>
        </div>
        <div className="invoice-preview">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 30 }}>
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 4 }}>INVOICE</h2>
              <div style={{ color: "#666", fontSize: 13 }}>#{invoice.number}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{FOP_DATA.nameEn}</div>
              <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{FOP_DATA.addressEn}</div>
              <div style={{ color: "#666", fontSize: 12 }}>Tax ID: {FOP_DATA.ipn}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", marginBottom: 6 }}>Bill To</div>
              <div style={{ fontWeight: 600 }}>{client?.name || "N/A"}</div>
              {client?.address && <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>{client.address}</div>}
              {client?.taxId && <div style={{ color: "#666", fontSize: 12 }}>Tax ID: {client.taxId}</div>}
              {client?.email && <div style={{ color: "#666", fontSize: 12 }}>{client.email}</div>}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: "#999", fontSize: 12 }}>Invoice Date: </span><span style={{ fontWeight: 500 }}>{dateStr}</span></div>
              <div style={{ marginBottom: 8 }}><span style={{ color: "#999", fontSize: 12 }}>Due Date: </span><span style={{ fontWeight: 500 }}>{dueDateStr}</span></div>
              <div><span style={{ color: "#999", fontSize: 12 }}>Currency: </span><span style={{ fontWeight: 500 }}>{invoice.currency}</span></div>
            </div>
          </div>

          <table style={{ width: "100%", marginBottom: 16 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "#666", borderBottom: "2px solid #e0e0e0", fontSize: 11 }}>Description</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "#666", borderBottom: "2px solid #e0e0e0", fontSize: 11 }}>{invoice.type === "hourly" ? "Hours" : "Qty"}</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "#666", borderBottom: "2px solid #e0e0e0", fontSize: 11 }}>Rate</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "#666", borderBottom: "2px solid #e0e0e0", fontSize: 11 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0" }}>{item.description}</td>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", textAlign: "right" }}>{item.qty}</td>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", textAlign: "right" }}>{sym}{Number(item.rate).toFixed(2)}</td>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", textAlign: "right", fontWeight: 600 }}>{sym}{Number(item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "right", borderTop: "2px solid #1a1a2e", paddingTop: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Total: {sym}{invoice.total.toFixed(2)}</div>
          </div>

          <div style={{ marginTop: 30, padding: 16, background: "#f8f9fa", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", marginBottom: 8 }}>Payment Details</div>
            <div style={{ fontSize: 12, color: "#444", lineHeight: 1.8 }}>
              <div><strong>Beneficiary:</strong> {FOP_DATA.fullNameEn}</div>
              <div><strong>IBAN:</strong> {iban}</div>
              <div><strong>Bank:</strong> {FOP_DATA.bank.name}</div>
              <div><strong>Bank Address:</strong> {FOP_DATA.bank.address}</div>
              <div><strong>SWIFT:</strong> {FOP_DATA.bank.swift}</div>
            </div>
          </div>

          {invoice.notes && (
            <div style={{ marginTop: 20, fontSize: 12, color: "#666", fontStyle: "italic" }}>{invoice.notes}</div>
          )}
        </div>
      </div>
    </div>
  );
}
