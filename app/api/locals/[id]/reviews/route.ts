import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "@/lib/auth";

async function recomputeLocalRating(localId: number) {
  const aggregate = await prisma.review.aggregate({
    where: { localId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.local.update({
    where: { id: localId },
    data: {
      ratingAverage: aggregate._avg.rating || 0,
      ratingCount: aggregate._count.rating || 0,
    },
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const localId = Number(rawId);
  if (Number.isNaN(localId)) {
    return NextResponse.json({ error: "ID invalido." }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { localId },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, username: true, name: true } } },
  });

  return NextResponse.json({ items: reviews });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = getAuthUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id: rawId } = await params;
  const localId = Number(rawId);
  if (Number.isNaN(localId)) {
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
      localId,
    },
    include: { user: { select: { id: true, username: true, name: true } } },
  });

  await recomputeLocalRating(localId);
  return NextResponse.json({ item: review }, { status: 201 });
}
