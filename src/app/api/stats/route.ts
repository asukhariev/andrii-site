import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [clientCount, invoiceCount, paid, pending, overdue] = await Promise.all([
    prisma.client.count(),
    prisma.invoice.count(),
    prisma.invoice.aggregate({ where: { status: "paid" }, _sum: { total: true } }),
    prisma.invoice.aggregate({ where: { status: "pending" }, _sum: { total: true } }),
    prisma.invoice.count({ where: { status: "overdue" } }),
  ]);

  const settings = await prisma.settings.upsert({
    where: { id: "default" },
    create: { id: "default", nextInvoiceNum: 1 },
    update: {},
  });

  return NextResponse.json({
    clientCount,
    invoiceCount,
    totalPaid: paid._sum.total || 0,
    totalPending: pending._sum.total || 0,
    overdueCount: overdue,
    nextInvoiceNum: settings.nextInvoiceNum,
  });
}
