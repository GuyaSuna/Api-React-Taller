import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DishCategory } from "@prisma/client";
import { getAuthUserId } from "@/lib/auth";

function normalizeEnum(value: string | null) {
  if (!value) return null;
  return value.trim().toUpperCase().replace(/\s+/g, "_");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const category = normalizeEnum(searchParams.get("category"));
  const city = searchParams.get("city")?.trim();
  const zone = searchParams.get("zone")?.trim();
  const localId = Number(searchParams.get("localId"));
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  const where: Record<string, unknown> = {};

  if (q) {
    where.OR = [{ name: { contains: q } }, { description: { contains: q } }];
  }
  if (category) where.category = category;
  if (city) where.city = { equals: city };
  if (zone) where.zone = { equals: zone };
  if (!Number.isNaN(localId) && localId > 0) where.localId = localId;

  if (dateFrom || dateTo) {
    const createdAt: Record<string, Date> = {};
    if (dateFrom) createdAt.gte = new Date(dateFrom);
    if (dateTo) createdAt.lte = new Date(dateTo);
    where.createdAt = createdAt;
  }

  const dishes = await prisma.dish.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      local: { select: { id: true, name: true, city: true } },
      creator: { select: { id: true, username: true, name: true } },
    },
  });

  return NextResponse.json({ items: dishes });
}

export async function POST(request: NextRequest) {
  const userId = getAuthUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.category || !body?.localId || !body?.city) {
    return NextResponse.json(
      { error: "name, category, localId y city son obligatorios." },
      { status: 400 }
    );
  }

  const category = normalizeEnum(body.category);
  if (!category) {
    return NextResponse.json(
      { error: "category es obligatorio." },
      { status: 400 }
    );
  }

  const dish = await prisma.dish.create({
    data: {
      name: String(body.name).trim(),
      category: category as DishCategory,
      description: body.description ? String(body.description) : null,
      price: body.price ? Number(body.price) : null,
      city: String(body.city).trim(),
      zone: body.zone ? String(body.zone) : null,
      localId: Number(body.localId),
      creatorId: userId,
    },
    include: {
      local: { select: { id: true, name: true, city: true } },
      creator: { select: { id: true, username: true, name: true } },
    },
  });

  return NextResponse.json({ item: dish }, { status: 201 });
}
