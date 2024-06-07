import { get } from "@vercel/edge-config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/welcome"],
};

export async function middleware(request: NextRequest) {
  // Headers
  let cookie = request.cookies.get("vercel");
  const allCookies = request.cookies.getAll();

  const response = NextResponse.next();
  response.cookies.set("vercel", "fast");
  response.cookies.set({
    name: "vercel",
    value: "fast",
    path: "/",
  });
  cookie = response.cookies.get("vercel");

  const greeting = await get("greeting");

  return NextResponse.json({ greeting, cookie, allCookies });
}
