import { IS_BROWSER } from "$fresh/runtime.ts";
import { apply, Configuration, setup, tw } from "twind";
import * as colors from "twind/colors";
export { css } from "twind/css";
export { apply, setup, tw };

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

// export const config: Configuration = { theme: { colors } };
export const config: Configuration = {};

if (IS_BROWSER) {
  setup(config);
}
