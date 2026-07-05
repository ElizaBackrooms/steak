import { NextRequest, NextResponse } from "next/server";

import { toggleLike } from "@/lib/steak-off";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { wallet?: string; postId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = await toggleLike({
    wallet: body.wallet ?? "",
    postId: body.postId ?? "",
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}
