import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") || "";
  const status = req.nextUrl.searchParams.get("status") || "";

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { number: { contains: search } },
      { client: { name: { contains: search } } },
    ];
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: { client: true, items: true },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items, ...invoiceData } = body;

  // Get and increment next invoice number
  const settings = await prisma.settings.upsert({
    where: { id: "default" },
    create: { id: "default", nextInvoiceNum: 2 },
    update: { nextInvoiceNum: { increment: 1 } },
  });

  const invoice = await prisma.invoice.create({
    data: {
      ...invoiceData,
      number: invoiceData.number || String(settings.nextInvoiceNum).padStart(4, "0"),
      date: new Date(invoiceData.date),
      dueDate: new Date(invoiceData.dueDate),
      items: { create: items },
    },
    include: { client: true, items: true },
  });

  return NextResponse.json(invoice, { status: 201 });
}
