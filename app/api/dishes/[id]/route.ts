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

  const dish = await prisma.dish.findUnique({
    where: { id },
    include: {
      local: { select: { id: true, name: true, city: true } },
      creator: { select: { id: true, username: true, name: true } },
      reviews: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { id: true, username: true, name: true } } },
      },
    },
  });

  if (!dish) {
    return NextResponse.json({ error: "Plato no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ item: dish });
}
