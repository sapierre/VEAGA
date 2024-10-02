import { blue } from "./blue";
import { gray } from "./gray";
import { green } from "./green";
import { orange } from "./orange";
import { red } from "./red";
import { rose } from "./rose";
import { stone } from "./stone";
import { violet } from "./violet";
import { yellow } from "./yellow";

import type { ThemeColor, ThemeColors } from "../../types";

export const themes: Record<ThemeColor, ThemeColors> = {
  orange,
  yellow,
  rose,
  red,
  gray,
  stone,
  green,
  blue,
  violet,
};
