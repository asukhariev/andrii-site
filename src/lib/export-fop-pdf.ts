import { jsPDF } from "jspdf";
import { FOP_DATA } from "./fop-data";

export function exportFopDataPDF() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5",
  });
  const taxGroupLabel = FOP_DATA.taxGroup.includes("3")
    ? "Group 3 single tax, 5% + 1% military levy"
    : FOP_DATA.taxGroup;

  const left = 18;
  const right = 130;
  let y = 20;

  const drawLabel = (label: string) => {
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.setFont(undefined as unknown as string, "normal");
    doc.text(label.toUpperCase(), left, y);
  };

  const drawValue = (value: string, gap = 10, width = 96) => {
    y += 5;
    doc.setFontSize(11);
    doc.setTextColor(15);
    doc.setFont(undefined as unknown as string, "bold");
    doc.text(value, left, y, { maxWidth: width });
    y += gap;
  };

  const drawPair = (label: string, value: string, gap = 10, width = 96) => {
    drawLabel(label);
    drawValue(value, gap, width);
  };

  doc.setTextColor(15);
  doc.setFontSize(9);
  doc.setFont(undefined as unknown as string, "normal");
  doc.text("FOP DETAILS", left, y);

  y += 10;
  doc.setFontSize(22);
  doc.setFont(undefined as unknown as string, "bold");
  doc.text("Andrii Sukhariev", left, y);

  y += 6;
  doc.setFontSize(11);
  doc.setTextColor(90);
  doc.setFont(undefined as unknown as string, "normal");
  doc.text("Private Entrepreneur", left, y);

  y += 10;
  doc.setDrawColor(215);
  doc.line(left, y, right, y);
  y += 12;

  drawPair("Business name", FOP_DATA.nameEn);
  drawPair("Tax ID", FOP_DATA.ipn);
  drawPair("Registration date", FOP_DATA.registrationDate);
  drawPair("Tax group", taxGroupLabel);
  drawPair("VAT status", FOP_DATA.isVAT ? "VAT payer" : "Non-VAT payer");
  drawPair("Address", FOP_DATA.addressEn, 12);

  y += 2;
  doc.setDrawColor(225);
  doc.line(left, y, right, y);
  y += 12;

  drawPair("Beneficiary", FOP_DATA.fullNameEn);
  drawPair("Bank", FOP_DATA.bank.name, 10, 90);
  drawPair("SWIFT", FOP_DATA.bank.swift);
  drawPair("USD IBAN", FOP_DATA.bank.accounts.USD, 10, 94);
  drawPair("EUR IBAN", FOP_DATA.bank.accounts.EUR, 10, 94);
  drawPair("UAH IBAN", FOP_DATA.bank.accounts.UAH, 10, 94);

  doc.save("FOP_Details_Sukhariev.pdf");
}
