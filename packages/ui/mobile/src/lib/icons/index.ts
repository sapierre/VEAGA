import {
  ArrowRight,
  ArrowLeft,
  House,
  KeyRound,
  Wallet,
  Newspaper,
  UserRound,
} from "lucide-react-native";

import { Icons as GlobalIcons } from "@turbostarter/ui";

import { iconWithClassName } from "./icon-with-classname";

iconWithClassName(GlobalIcons.Logo);
iconWithClassName(GlobalIcons.LogoText);
iconWithClassName(ArrowRight);
iconWithClassName(ArrowLeft);
iconWithClassName(House);
iconWithClassName(KeyRound);
iconWithClassName(Wallet);
iconWithClassName(Newspaper);
iconWithClassName(UserRound);

export const Icons = {
  Logo: GlobalIcons.Logo,
  LogoText: GlobalIcons.LogoText,
  ArrowRight,
  ArrowLeft,
  House,
  KeyRound,
  Wallet,
  Newspaper,
  UserRound,
};
