import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Session } from "@turbostarter/auth";
import { auth } from "~lib/auth";
import { env } from "~lib/env";

const ENCODING_PREFIX = "base64-";

export const SESSION_MESSAGE_TYPE = {
  GET: "session:get",
  DELETE: "session:delete",
} as const;

const getCookie = async (url: string, name: string) => {
  const cookie = await chrome.cookies.get({
    url,
    name,
  });

  if (cookie) {
    return cookie.value;
  }

  let temp = "";
  let i = 0;

  while (true) {
    const cookie = await chrome.cookies.get({
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
      const deleted = await chrome.cookies.remove({
        url,
        name: `${name}.${i}`,
      });

      if (!deleted) {
        break;
      }

      i++;
    }

    const cookie = await chrome.cookies.remove({
      url,
      name,
    });

    if (cookie) {
      return cookie;
    }
  } catch (e) {
    console.error(e);
    return;
  }
};

const parseSession = (cookie: string) => {
  if (cookie.startsWith(ENCODING_PREFIX)) {
    return JSON.parse(
      Buffer.from(cookie.slice(ENCODING_PREFIX.length), "base64").toString(),
    ) as Session;
  }

  return JSON.parse(cookie) as Session;
};

const getSession = async () => {
  try {
    const cookie = await getCookie(
      env.PLASMO_PUBLIC_SITE_URL,
      env.PLASMO_PUBLIC_AUTH_COOKIE_NAME,
    );

    if (!cookie) {
      return null;
    }

    const parsedSession = parseSession(cookie);

    if (!parsedSession) {
      return null;
    }

    const { data } = await auth().setSession(parsedSession);
    return data?.session ?? null;
  } catch (e) {
    return null;
  }
};

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const type = req.body.type;

  if (type === SESSION_MESSAGE_TYPE.DELETE) {
    await deleteCookie(
      env.PLASMO_PUBLIC_SITE_URL,
      env.PLASMO_PUBLIC_AUTH_COOKIE_NAME,
    );
    return res.send(null);
  }

  if (type === SESSION_MESSAGE_TYPE.GET) {
    const session = await getSession();

    return res.send({
      session,
    });
  }

  return res.send(null);
};

export default handler;
