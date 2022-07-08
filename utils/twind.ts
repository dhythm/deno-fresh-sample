export * from "twind";

import { IS_BROWSER } from "$fresh/runtime.ts";
import { setup } from "twind";
import * as colors from "twind/colors";

export const theme = {
  colors: {
    blue: colors.blue,
    black: colors.black,
    gray: colors.gray,
    green: colors.green,
    white: colors.white,
    yellow: colors.yellow,
    transparent: "transparent",
  },
};

if (IS_BROWSER) {
  setup({ theme: { colors } });
}
