import { jsPDF } from "jspdf";
import { FOP_DATA } from "./fop-data";

interface Item { description: string; qty: number; rate: number; amount: number; }
interface Invoice {
  number: string; date: string; dueDate: string; currency: string;
  type: string; total: number; notes: string; items: Item[];
  client?: { name: string; address?: string; taxId?: string; email?: string } | null;
}

export function exportInvoicePDF(invoice: Invoice) {
  const currSymbol: Record<string, string> = { USD: "$", EUR: "€", UAH: "" };
  const currSuffix = invoice.currency === "UAH" ? " UAH" : "";
  const sym = currSymbol[invoice.currency] || "$";
  const iban = FOP_DATA.bank.accounts[invoice.currency] || FOP_DATA.bank.accounts.USD;
  const client = invoice.client;
  const dateStr = typeof invoice.date === "string" ? invoice.date.slice(0, 10) : new Date(invoice.date).toISOString().slice(0, 10);
  const dueDateStr = typeof invoice.dueDate === "string" ? invoice.dueDate.slice(0, 10) : new Date(invoice.dueDate).toISOString().slice(0, 10);

  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(24);
  doc.setFont(undefined as unknown as string, "bold");
  doc.text("INVOICE", 20, y);
  doc.setFontSize(11);
  doc.setFont(undefined as unknown as string, "normal");
  doc.text(`#${invoice.number}`, 20, y + 8);

  doc.setFontSize(11);
  doc.setFont(undefined as unknown as string, "bold");
  doc.text(FOP_DATA.nameEn, 190, y, { align: "right" });
  doc.setFont(undefined as unknown as string, "normal");
  doc.setFontSize(9);
  doc.text(FOP_DATA.addressEn, 190, y + 6, { align: "right" });
  doc.text(`Tax ID: ${FOP_DATA.ipn}`, 190, y + 11, { align: "right" });

  y = 50;
  doc.setFontSize(9);
  doc.setTextColor(130);
  doc.text("BILL TO", 20, y);
  doc.text("INVOICE DETAILS", 120, y);
  doc.setTextColor(0);
  doc.setFontSize(11);
  doc.setFont(undefined as unknown as string, "bold");
  doc.text(client?.name || "N/A", 20, y + 8);
  doc.setFont(undefined as unknown as string, "normal");
  doc.setFontSize(9);
  if (client?.address) doc.text(client.address, 20, y + 14);
  if (client?.taxId) doc.text(`Tax ID: ${client.taxId}`, 20, y + 20);
  if (client?.email) doc.text(client.email, 20, y + 26);

  doc.text(`Invoice Date: ${dateStr}`, 120, y + 8);
  doc.text(`Due Date: ${dueDateStr}`, 120, y + 14);
  doc.text(`Currency: ${invoice.currency}`, 120, y + 20);
  doc.text(`Type: ${invoice.type === "hourly" ? "Hourly Rate" : "Fixed Price"}`, 120, y + 26);

  y = 90;
  doc.setFillColor(245, 245, 250);
  doc.rect(20, y, 170, 8, "F");
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("DESCRIPTION", 22, y + 5.5);
  doc.text(invoice.type === "hourly" ? "HOURS" : "QTY", 115, y + 5.5);
  doc.text("RATE", 140, y + 5.5);
  doc.text("AMOUNT", 188, y + 5.5, { align: "right" });
  doc.setTextColor(0);

  y += 12;
  doc.setFontSize(10);
  invoice.items.forEach((item) => {
    doc.text(item.description || "", 22, y);
    doc.text(String(item.qty), 118, y);
    doc.text(`${sym}${Number(item.rate).toFixed(2)}${currSuffix}`, 140, y);
    doc.text(`${sym}${Number(item.amount).toFixed(2)}${currSuffix}`, 188, y, { align: "right" });
    y += 8;
    doc.setDrawColor(230);
    doc.line(20, y - 3, 190, y - 3);
  });

  y += 4;
  doc.setDrawColor(30);
  doc.setLineWidth(0.5);
  doc.line(130, y, 190, y);
  y += 8;
  doc.setFontSize(14);
  doc.setFont(undefined as unknown as string, "bold");
  doc.text(`Total: ${sym}${invoice.total.toFixed(2)}${currSuffix}`, 188, y, { align: "right" });

  y += 20;
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(20, y, 170, 40, 3, 3, "F");
  doc.setFontSize(8);
  doc.setTextColor(130);
  doc.text("PAYMENT DETAILS", 25, y + 7);
  doc.setTextColor(50);
  doc.setFontSize(9);
  doc.setFont(undefined as unknown as string, "normal");
  doc.text(`Beneficiary: ${FOP_DATA.fullNameEn}`, 25, y + 14);
  doc.text(`IBAN: ${iban}`, 25, y + 20);
  doc.text(`Bank: ${FOP_DATA.bank.name}`, 25, y + 26);
  doc.text(`SWIFT: ${FOP_DATA.bank.swift}`, 25, y + 32);

  if (invoice.notes) {
    y += 48;
    doc.setFontSize(9);
    doc.setTextColor(130);
    doc.setFont(undefined as unknown as string, "italic");
    doc.text(invoice.notes, 20, y);
  }

  doc.save(`Invoice_${invoice.number}_${client?.name || "client"}.pdf`);
}
