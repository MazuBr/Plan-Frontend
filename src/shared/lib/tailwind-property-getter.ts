import resolveConfig from "tailwindcss/resolveConfig"
import type { Config } from "tailwindcss"
import { default as tailwindConfig } from "../../../tailwind.config"

export const parsedTailwindConfig = resolveConfig(tailwindConfig)

type DefaultColors = NonNullable<Config["theme"]>["colors"]
// prettier-ignore
type AvailableMonochromeCodes = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 | 10.5
export function getMonochromeHex(monochrome: AvailableMonochromeCodes) {
  const computedMonochromeKey = `monochrome-${monochrome}`
  return (
    parsedTailwindConfig.theme.colors[
      computedMonochromeKey as keyof DefaultColors
    ] || "#000000"
  )
}
