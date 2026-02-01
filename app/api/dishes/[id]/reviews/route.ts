import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const dishId = Number(params.id);
  if (Number.isNaN(dishId)) {
    return NextResponse.json({ error: "ID invalido." }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { dishId },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, username: true, name: true } } },
  });

  return NextResponse.json({ items: reviews });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = getAuthUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const dishId = Number(params.id);
  if (Number.isNaN(dishId)) {
    return NextResponse.json({ error: "ID invalido." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const rating = Number(body?.rating);
  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "rating debe ser un numero entre 1 y 5." },
      { status: 400 }
    );
  }

  const review = await prisma.review.create({
    data: {
      rating,
      comment: body?.comment ? String(body.comment) : null,
      userId,
      dishId,
    },
    include: { user: { select: { id: true, username: true, name: true } } },
  });

  return NextResponse.json({ item: review }, { status: 201 });
}
