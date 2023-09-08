import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { NextResponse } from "next/server";
import { UserAlreadyExistsError } from "@/server/errors/user-already-exists";
import { randomUUID } from "node:crypto";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

export async function POST(req: Request, res: Response) {
  try {
    // const session = await getToken({ req });

    // if (session?.user?.userRole?.[0]?.role?.name !== "admin") {
    //   throw new UserIsNotAdminError();
    // }

    const reader = req.body?.getReader();

    const stream = await reader?.read();

    if (!stream?.value) return;

    const filename = `${randomUUID()}`;

    const uint8Array = new Uint8Array(stream.value);

    const blob = new Blob([uint8Array], { type: "image/png" });

    const fileBody = new File([blob], filename, {
      type: "image/png",
    });

    await supabase.storage.from("blog-images").upload(filename, fileBody);

    const { data } = await supabase.storage
      .from("blog-images")
      .getPublicUrl(filename);
    console.log(data);

    return NextResponse.json(
      {
        url: data.publicUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof UserAlreadyExistsError) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    if (error instanceof UserIsNotAdminError) {
      return NextResponse.json(
        {
          message: "User is not allowed",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "dasdasdas",
      },
      { status: 500 }
    );
  }
}
