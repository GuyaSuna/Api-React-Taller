import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LocalType, PriceRange } from "@prisma/client";
import { getAuthUserId } from "@/lib/auth";

function normalizeEnum(value: string | null) {
  if (!value) return null;
  return value.trim().toUpperCase().replace(/\s+/g, "_");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const type = normalizeEnum(searchParams.get("type"));
  const priceRange = normalizeEnum(searchParams.get("priceRange"));
  const city = searchParams.get("city")?.trim();
  const zone = searchParams.get("zone")?.trim();
  const rating = Number(searchParams.get("rating"));

  const where: Record<string, unknown> = {};

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { address: { contains: q } },
    ];
  }

  if (type) where.type = type;
  if (priceRange) where.priceRange = priceRange;
  if (city) where.city = { equals: city };
  if (zone) where.zone = { equals: zone };
  if (!Number.isNaN(rating) && rating > 0) {
    where.ratingAverage = { gte: rating };
  }

  const locals = await prisma.local.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      creator: { select: { id: true, username: true, name: true } },
    },
  });

  return NextResponse.json({ items: locals });
}

export async function POST(request: NextRequest) {
  const userId = getAuthUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.type || !body?.priceRange || !body?.city) {
    return NextResponse.json(
      { error: "name, type, priceRange y city son obligatorios." },
      { status: 400 }
    );
  }

  const type = normalizeEnum(body.type);
  const priceRange = normalizeEnum(body.priceRange);
  if (!type || !priceRange) {
    return NextResponse.json(
      { error: "type y priceRange son obligatorios." },
      { status: 400 }
    );
  }

  const local = await prisma.local.create({
    data: {
      name: String(body.name).trim(),
      type: type as LocalType,
      priceRange: priceRange as PriceRange,
      description: body.description ? String(body.description) : null,
      address: body.address ? String(body.address) : null,
      city: String(body.city).trim(),
      zone: body.zone ? String(body.zone) : null,
      hours: body.hours ? String(body.hours) : null,
      photos: Array.isArray(body.photos) ? body.photos : null,
      creatorId: userId,
    },
    include: {
      creator: { select: { id: true, username: true, name: true } },
    },
  });

  return NextResponse.json({ item: local }, { status: 201 });
}
