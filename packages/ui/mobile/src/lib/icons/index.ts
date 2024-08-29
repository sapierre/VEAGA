import * as React from "react";

import { Icons as GlobalIcons } from "@turbostarter/ui";
import { iconWithClassName } from "./icon-with-classname";

import { ArrowRight, ArrowLeft } from "lucide-react-native";

iconWithClassName(GlobalIcons.Logo);
iconWithClassName(GlobalIcons.LogoText);
iconWithClassName(ArrowRight);
iconWithClassName(ArrowLeft);

export const Icons = {
  Logo: GlobalIcons.Logo,
  LogoText: GlobalIcons.LogoText,
  ArrowRight,
  ArrowLeft,
};
