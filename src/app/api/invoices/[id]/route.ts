import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { items, client, ...invoiceData } = body;

  // Delete existing items and recreate
  await prisma.invoiceItem.deleteMany({ where: { invoiceId: id } });

  const invoice = await prisma.invoice.update({
    where: { id },
    data: {
      ...invoiceData,
      date: new Date(invoiceData.date),
      dueDate: new Date(invoiceData.dueDate),
      items: items ? { create: items.map((i: Record<string, unknown>) => ({
        description: i.description,
        qty: i.qty,
        rate: i.rate,
        amount: i.amount,
      })) } : undefined,
    },
    include: { client: true, items: true },
  });
  return NextResponse.json(invoice);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const invoice = await prisma.invoice.update({
    where: { id },
    data: body,
    include: { client: true, items: true },
  });
  return NextResponse.json(invoice);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.invoice.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
