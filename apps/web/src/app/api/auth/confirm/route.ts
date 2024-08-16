import { NextResponse } from "next/server";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth/server";

import type { EmailOtpType } from "@turbostarter/auth";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  if (token_hash && type) {
    const { error, data } = await auth().verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      // redirect the user to an error page with some instructions
      redirectTo.pathname = pathsConfig.auth.error;

      if (error.code) {
        redirectTo.searchParams.set("code", error.code);
      }
      return NextResponse.redirect(redirectTo);
    }
  }

  return NextResponse.redirect(redirectTo);
}
