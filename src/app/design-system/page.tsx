"use client";

const COLORS = [
  { name: "Background", value: "#F5F5F7" },
  { name: "Surface", value: "rgba(255,255,255,0.78)" },
  { name: "Accent", value: "#0071E3" },
  { name: "Blue", value: "#007AFF" },
  { name: "Green", value: "#28CD41" },
  { name: "Orange", value: "#FF9F0A" },
  { name: "Red", value: "#FF453A" },
];

const TYPE = [
  { label: "Display", sample: "Readable hierarchy with soft contrast", size: 40, weight: 700 },
  { label: "Title", sample: "Section titles and page headers", size: 24, weight: 700 },
  { label: "Body", sample: "Comfortable text for dashboards and forms", size: 15, weight: 500 },
  { label: "Caption", sample: "Labels, metadata, and supportive detail", size: 12, weight: 600 },
];

export default function DesignSystemPage() {
  return (
    <>
      <div className="hero-card">
        <div className="hero-kicker">Design System</div>
        <div className="hero-title">A lightweight Apple-inspired foundation for the invoicing app.</div>
        <div className="hero-copy">
          This screen defines the visual language used across the product: glass-like surfaces,
          soft depth, rounded controls, restrained color, and clear typography hierarchy.
        </div>
      </div>

      <div className="showcase-grid" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-title">Color Tokens</div>
          <div className="token-list">
            {COLORS.map((token) => (
              <div className="token-row" key={token.name}>
                <div className="inline-stack">
                  <div className="swatch" style={{ background: token.value }} />
                  <div>
                    <div className="info-value">{token.name}</div>
                    <div className="info-label">{token.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Typography</div>
          <div className="token-list">
            {TYPE.map((item) => (
              <div className="token-row" key={item.label} style={{ alignItems: "flex-start" }}>
                <div>
                  <div className="info-label">{item.label}</div>
                  <div
                    style={{
                      fontSize: item.size,
                      fontWeight: item.weight,
                      lineHeight: 1.1,
                      letterSpacing: item.size >= 24 ? "-0.04em" : "-0.01em",
                    }}
                  >
                    {item.sample}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="showcase-grid" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-title">Buttons</div>
          <div className="inline-stack">
            <button className="btn btn-primary">Primary Action</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-danger">Destructive</button>
            <button className="btn btn-secondary btn-sm">Small Control</button>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Segmented Tabs</div>
          <div className="tabs">
            <div className="tab active">Overview</div>
            <div className="tab">Clients</div>
            <div className="tab">Invoices</div>
            <div className="tab">Settings</div>
          </div>
        </div>
      </div>

      <div className="showcase-grid">
        <div className="card">
          <div className="card-title">Fields</div>
          <div className="form-group">
            <label className="form-label">Search</label>
            <input className="search-input" defaultValue="Acme Studio" />
          </div>
          <div className="form-group">
            <label className="form-label">Input</label>
            <input className="form-input" defaultValue="PE Andrii Sukhariev" />
          </div>
          <div className="form-group">
            <label className="form-label">Select</label>
            <select className="form-select" defaultValue="USD">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
            </select>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Status & Data</div>
          <div className="inline-stack" style={{ marginBottom: 18 }}>
            <span className="badge badge-paid">Paid</span>
            <span className="badge badge-pending">Pending</span>
            <span className="badge badge-overdue">Overdue</span>
            <span className="badge badge-currency">USD</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Invoice</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Acme Inc.</td>
                <td>#0042</td>
                <td>$3,200.00</td>
              </tr>
              <tr>
                <td>Northwind</td>
                <td>#0043</td>
                <td>€1,280.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
