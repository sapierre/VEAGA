import { NextResponse } from "next/server";

import { auth } from "~/lib/auth/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const { error } = await auth().exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // TODO: add error screen
  return NextResponse.redirect(`${origin}/auth/login`);
}
