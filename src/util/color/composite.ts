import {hslToRGB, rgbToHSL} from './hsl'
import {rgbToHex, hexToRGB, xyzToRGB, rgbToXYZ} from './rgb'
import {labToXYZ, xyzToLab} from './lab'
import {HSL, Hex, Lab, RGB} from './types'

export const hslToHex = (hsl: HSL): Hex => rgbToHex(hslToRGB(hsl))

export const hexToHSL = (hex: string): HSL => rgbToHSL(hexToRGB(hex))

type labToRGB = {
  (lab: Lab, strict: true): RGB | null
  (lab: Lab, strict?: false | undefined): RGB
}
export const labToRGB = ((
  lab: Lab,
  strict: boolean = false
): (RGB | null) | RGB => xyzToRGB(labToXYZ(lab), strict)) as labToRGB

export const rgbToLab = (rgb: RGB): Lab => xyzToLab(rgbToXYZ(rgb))

export const hslToLab = (hsl: HSL): Lab => rgbToLab(hslToRGB(hsl))

export const labToHex = (lab: Lab): string => rgbToHex(labToRGB(lab))
