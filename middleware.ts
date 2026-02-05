import { NextRequest, NextResponse } from "next/server";

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function getAllowedOrigins(): string[] {
  const raw = process.env.CORS_ALLOWED_ORIGINS;
  if (!raw) return DEFAULT_ALLOWED_ORIGINS;
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function buildCorsHeaders(origin: string | null, allowCredentials: boolean) {
  const headers = new Headers();
  const allowedOrigins = getAllowedOrigins();
  const isAllowed = origin ? allowedOrigins.includes(origin) : false;

  if (isAllowed && origin) {
    headers.set("Access-Control-Allow-Origin", origin);
    if (allowCredentials) {
      headers.set("Access-Control-Allow-Credentials", "true");
    }
  }

  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Needed when Access-Control-Allow-Origin is dynamic
  headers.set("Vary", "Origin");
  return headers;
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowCredentials = process.env.CORS_ALLOW_CREDENTIALS === "true";

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: buildCorsHeaders(origin, allowCredentials),
    });
  }

  const response = NextResponse.next();
  const corsHeaders = buildCorsHeaders(origin, allowCredentials);
  corsHeaders.forEach((value, key) => response.headers.set(key, value));
  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
