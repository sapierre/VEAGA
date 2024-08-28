import * as Linking from "expo-linking";
import { router } from "expo-router";

import Home from "~/components/home/home";
import "~/styles/globals.css";

export default function App() {
  return (
    <Home
      navigate={router.navigate}
      dom={{
        bounces: false,
        onShouldStartLoadWithRequest: (event) => {
          if (event.url.startsWith("http")) {
            void Linking.openURL(event.url);
            return false;
          }
          return true;
        },
      }}
    />
  );
}
