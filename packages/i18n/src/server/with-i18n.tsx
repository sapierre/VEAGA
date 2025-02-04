import dayjs from "dayjs";
import { cookies } from "next/headers";

import { config } from "../config";

import { env } from "./env";

import { initializeServerI18n } from ".";

type LayoutOrPageComponent<Params> = React.ComponentType<Params>;

export function withI18n<Params extends object>(
  Component: LayoutOrPageComponent<Params>,
) {
  return async function I18nServerComponentWrapper(params: Params) {
    const i18n = await initializeServerI18n({
      locale: (await cookies()).get(config.cookie)?.value,
      defaultLocale: env.DEFAULT_LOCALE,
    });
    dayjs.locale(i18n.language);

    return <Component {...params} />;
  };
}
