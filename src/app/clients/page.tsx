"use client";

import { useState, useEffect, useCallback } from "react";
import ClientModal from "@/components/ClientModal";
import Toast from "@/components/Toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = any;

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    const res = await fetch(`/api/clients?search=${encodeURIComponent(search)}`);
    setClients(await res.json());
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (data: Client) => {
    if (editClient) {
      await fetch(`/api/clients/${editClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setToast("Клієнта оновлено");
    } else {
      await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setToast("Клієнта додано");
    }
    setShowModal(false);
    setEditClient(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити клієнта та всі його інвойси?")) return;
    await fetch(`/api/clients/${id}`, { method: "DELETE" });
    setToast("Клієнта видалено");
    load();
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">Клієнти</div>
        <button className="btn btn-primary" onClick={() => { setEditClient(null); setShowModal(true); }}>+ Новий клієнт</button>
      </div>
      <div className="page-subtitle">Manage your client roster with a calmer, more readable workspace. Зараз: {clients.length} контрагентів.</div>

      <div className="search-bar">
        <input className="search-input" placeholder="Пошук за назвою, email, країною..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {clients.length === 0 ? (
          <div style={{ color: "var(--text2)", padding: 24 }}>{search ? "Нічого не знайдено" : "Додайте першого клієнта"}</div>
        ) : (
          <table>
            <thead><tr><th>Назва</th><th>Email</th><th>Країна</th><th>Валюта</th><th>Інвойсів</th><th>Дії</th></tr></thead>
            <tbody>
              {clients.map((c: Client) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td style={{ color: "var(--text2)" }}>{c.email || "—"}</td>
                  <td>{c.country || "—"}</td>
                  <td><span className="badge badge-currency">{c.currency}</span></td>
                  <td>{c._count?.invoices || 0}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => { setEditClient(c); setShowModal(true); }}>Ред.</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>×</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <ClientModal
          client={editClient}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditClient(null); }}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </>
  );
}
