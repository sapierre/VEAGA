import { Redirect } from "expo-router";

import { useSetupSteps } from "~/app/setup/(steps)/_layout";
import { pathsConfig } from "~/config/paths";
import { useSession } from "~/lib/auth";

export default function Index() {
  const { data } = useSession();
  const { step } = useSetupSteps();

  if (!data) {
    return <Redirect href={pathsConfig.setup.index} />;
  }

  if (step) {
    return <Redirect href={step} />;
  }

  return <Redirect href={pathsConfig.dashboard.index} />;
}
