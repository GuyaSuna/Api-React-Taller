import { NextResponse } from "next/server";

const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function buildCorsHeaders(origin: string | null) {
  const headers = new Headers();
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
  }
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Vary", "Origin");
  return headers;
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: buildCorsHeaders(origin) });
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  return NextResponse.json(
    { ok: true, timestamp: new Date().toISOString() },
    { headers: buildCorsHeaders(origin) }
  );
}
