import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.username || !body?.password) {
    return NextResponse.json(
      { error: "username y password son obligatorios." },
      { status: 400 }
    );
  }

  const username = String(body.username).trim().toLowerCase();
  const password = String(body.password);

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return NextResponse.json({ error: "Credenciales invalidas." }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Credenciales invalidas." }, { status: 401 });
  }

  const token = signToken({ userId: user.id });
  return NextResponse.json({
    user: { id: user.id, username: user.username, name: user.name },
    token,
  });
}
