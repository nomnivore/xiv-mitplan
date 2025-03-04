import { getUserFromId } from "@/lib/user";
import { clamp } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const discordCDN = "https://cdn.discordapp.com";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  const idParse = z.coerce.number().safeParse(id);
  if (!idParse.success) {
    console.log("couldnt parse");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const user = await getUserFromId(idParse.data);

  if (user === null) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  // user exists

  const avatar = user.discordAvatar;

  let path: string;

  if (avatar === null) {
    const index = clamp((user.id >> 22) % 6, 0, 5);

    path = `embed/avatars/${index}.png`;
  } else {
    path = `avatars/${user.discordId}/${avatar}.png`;
  }

  const cdnResponse = await fetch(`${discordCDN}/${path}`);

  if (cdnResponse.ok) {
    const buffer = await cdnResponse.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400", // cache for one day
      },
    });
  }

  return NextResponse.json(
    { error: "Failed to fetch avatar" },
    { status: 500 },
  );
}
