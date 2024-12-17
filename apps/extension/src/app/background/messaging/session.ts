import { Buffer } from "buffer";
import { browser } from "wxt/browser";

import { auth } from "~/lib/auth";
import { env } from "~/lib/env";
import { Message } from "~/lib/messaging";
import { onMessage } from "~/lib/messaging";

import type { Session } from "@turbostarter/auth";

const ENCODING_PREFIX = "base64-";

const getCookie = async (url: string, name: string) => {
  const cookie = await browser.cookies.get({
    url,
    name,
  });

  if (cookie) {
    return cookie.value;
  }

  let temp = "";
  let i = 0;

  while (true) {
    const cookie = await browser.cookies.get({
      url,
      name: `${name}.${i}`,
    });

    if (cookie) {
      temp += cookie.value;
    } else {
      return temp;
    }

    i++;
  }
};

const deleteCookie = async (url: string, name: string) => {
  try {
    let i = 0;

    while (true) {
      const deleted = await browser.cookies.remove({
        url,
        name: `${name}.${i}`,
      });

      if (!deleted) {
        break;
      }

      i++;
    }

    return browser.cookies.remove({
      url,
      name,
    });
  } catch (e) {
    console.error(e);
    return;
  }
};

const parseSession = (cookie: string) => {
  if (cookie.startsWith(ENCODING_PREFIX)) {
    return JSON.parse(
      Buffer.from(cookie.slice(ENCODING_PREFIX.length), "base64").toString(),
    ) as Session | null;
  }

  return JSON.parse(cookie) as Session | null;
};

export const getSession = async () => {
  try {
    const cookie = await getCookie(
      env.VITE_SITE_URL,
      env.VITE_AUTH_COOKIE_NAME,
    );

    if (!cookie) {
      return null;
    }

    const parsedSession = parseSession(cookie);

    if (!parsedSession) {
      return null;
    }

    const { data } = await auth().setSession(parsedSession);
    return data.session ?? null;
  } catch {
    return null;
  }
};

onMessage(Message.SESSION_GET, getSession);
onMessage(Message.SESSION_DELETE, async () => {
  await deleteCookie(env.VITE_SITE_URL, env.VITE_AUTH_COOKIE_NAME);
});
