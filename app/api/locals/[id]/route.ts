import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "ID invalido." }, { status: 400 });
  }

  const local = await prisma.local.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, username: true, name: true } },
      dishes: true,
      reviews: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { id: true, username: true, name: true } } },
      },
    },
  });

  if (!local) {
    return NextResponse.json({ error: "Local no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ item: local });
}
