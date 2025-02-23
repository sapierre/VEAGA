import { useRouter, useFocusEffect } from "expo-router";

import { pathsConfig } from "~/config/paths";

export default function Home() {
  const router = useRouter();

  useFocusEffect(() => {
    // Call the replace method to redirect to a new route without adding to the history.
    // We do this in a useFocusEffect to ensure the redirect happens every time the screen
    // is focused.
    router.dismissAll();
    router.replace(pathsConfig.index);
  });

  return null;
}
