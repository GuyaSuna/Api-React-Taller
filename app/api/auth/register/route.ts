import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.username || !body?.name || !body?.password) {
    return NextResponse.json(
      { error: "username, name y password son obligatorios." },
      { status: 400 }
    );
  }

  const username = String(body.username).trim().toLowerCase();
  const name = String(body.name).trim();
  const password = String(body.password);

  if (username.length < 3 || password.length < 6) {
    return NextResponse.json(
      { error: "username o password demasiado cortos." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json(
      { error: "El username ya existe." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { username, name, passwordHash },
    select: { id: true, username: true, name: true, createdAt: true },
  });

  const token = signToken({ userId: user.id });
  return NextResponse.json({ user, token }, { status: 201 });
}
