import { NextResponse } from "next/server";

import { isAuthApiError } from "@turbostarter/auth";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  console.log(next, code);

  if (code) {
    try {
      const { error, data } = await auth().exchangeCodeForSession(code);
      console.log(error, data);
      if (error) {
        return NextResponse.redirect(
          `${origin}${pathsConfig.auth.error}?code=${error.code}`,
        );
      }
    } catch (error) {
      if (isAuthApiError(error)) {
        return NextResponse.redirect(
          `${origin}${pathsConfig.auth.error}?code=${error.code}`,
        );
      }

      return NextResponse.redirect(`${origin}${pathsConfig.auth.error}`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
