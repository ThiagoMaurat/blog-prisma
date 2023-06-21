import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const url = req.url;
  // admin pages

  const isAdmin = session?.user?.userRole?.[0]?.role?.name === "admin";

  if (!isAdmin && url.includes("/api/admin")) {
    return NextResponse.json(
      {
        message: "User is not allowed",
      },
      { status: 400 }
    );
  }

  // if (!session && url.includes("/posts")) {
  //   return NextResponse.redirect("/login");
  // }
}
