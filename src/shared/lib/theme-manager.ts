import { useColorMode } from "@vueuse/core"
import {
  AvailableMonochromeCodes,
  getMonochromeHex,
} from "./tailwind-property-getter"

export function getMonochromeByTheme({
  lightVariant,
  darkVariant,
}: {
  lightVariant: AvailableMonochromeCodes
  darkVariant: AvailableMonochromeCodes
}) {
  const mode = useColorMode()

  return mode.value === "dark"
    ? getMonochromeHex(darkVariant)
    : mode.value === "light"
      ? getMonochromeHex(lightVariant)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? getMonochromeHex(darkVariant)
        : getMonochromeHex(lightVariant)
}

export function getCustomStyleByTheme({
  lightVariant,
  darkVariant,
}: {
  lightVariant: string
  darkVariant: string
}) {
  const mode = useColorMode()

  return mode.value === "dark"
    ? darkVariant
    : mode.value === "light"
      ? lightVariant
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? darkVariant
        : lightVariant
}
