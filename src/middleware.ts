import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });

  const url = req.url;

  // admin pages

  if (session && url.includes("/admin")) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (session && url.includes("/admin")) {
    return NextResponse.next();
  }
}
