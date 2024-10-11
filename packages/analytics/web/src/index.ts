import { env } from "./env";
import { clientStrategies } from "./providers";

export const { Provider, track } =
  clientStrategies[env.NEXT_PUBLIC_ANALYTICS_PROVIDER];
