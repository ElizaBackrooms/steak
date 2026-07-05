import { NextRequest, NextResponse } from "next/server";

import {
  addPost,
  currentWeekId,
  readSteakOff,
  sortByLikes,
  validateSubmission,
} from "@/lib/steak-off";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const week = req.nextUrl.searchParams.get("week") ?? currentWeekId();
  const data = await readSteakOff();
  const posts = sortByLikes(data.weeks[week] ?? []);
  return NextResponse.json({ week, current_week: currentWeekId(), posts });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const checked = validateSubmission(body as Record<string, unknown>);
  if (!checked.ok) {
    return NextResponse.json({ error: checked.error }, { status: 400 });
  }

  const result = await addPost(checked);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }
  return NextResponse.json({ post: result.post }, { status: 201 });
}
