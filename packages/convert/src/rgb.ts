import {XYZ, RGB, Hex} from './types'

export const RGB_MIN = 0
export const RGB_MAX = 255

export const INVALID_COLOR_PLACEHOLDER: RGB = {r: 255, g: 0, b: 0}

const rgbComponentToLinearFraction = (rgbComponent: number): number => {
  let fraction = rgbComponent / 255

  let linear =
    fraction <= 0.04045
      ? fraction / 12.92
      : Math.pow((fraction + 0.055) / 1.055, 2.4)

  return linear
}

const linearFractionToRGBComponent = (linear: number): number => {
  let fraction =
    linear <= 0.0031308
      ? (323 * linear) / 25
      : (211 * Math.pow(linear, 5 / 12) - 11) / 200

  let rgbComponent = Math.round(fraction * 255)

  return rgbComponent
}

const isValidRGBComponent = (rgbComponent: number) =>
  rgbComponent >= RGB_MIN && rgbComponent <= RGB_MAX

type XYZtoRGB = {
  (xyz: XYZ, strict: true): RGB | null
  (xyz: XYZ, strict?: false | undefined): RGB
  (xyz: XYZ, strict?: boolean): (RGB | null) | RGB
}
export const xyzToRGB = ((
  {x, y, z}: XYZ,
  strict: boolean = false
): (RGB | null) | RGB => {
  let rLinear = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z
  let gLinear = -0.969266 * x + 1.8760108 * y + 0.041556 * z
  let bLinear = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z

  let r = linearFractionToRGBComponent(rLinear)
  let g = linearFractionToRGBComponent(gLinear)
  let b = linearFractionToRGBComponent(bLinear)

  if (
    isValidRGBComponent(r) &&
    isValidRGBComponent(g) &&
    isValidRGBComponent(b)
  )
    return {r, g, b}
  else return strict ? null : INVALID_COLOR_PLACEHOLDER
}) as XYZtoRGB

export const rgbToXYZ = (rgb: RGB): XYZ => {
  let rLinear = rgbComponentToLinearFraction(rgb.r)
  let gLinear = rgbComponentToLinearFraction(rgb.g)
  let bLinear = rgbComponentToLinearFraction(rgb.b)

  let x = 0.4124564 * rLinear + 0.3575761 * gLinear + 0.1804375 * bLinear
  let y = 0.2126729 * rLinear + 0.7151522 * gLinear + 0.072175 * bLinear
  let z = 0.0193339 * rLinear + 0.119192 * gLinear + 0.9503041 * bLinear

  return {x, y, z}
}

export const rgbToHex = (rgb: RGB): Hex => {
  let {r: rValue, g: gValue, b: bValue} = rgb

  let r = Math.round(rValue).toString(16)
  let g = Math.round(gValue).toString(16)
  let b = Math.round(bValue).toString(16)

  if (r.length === 1) r = '0' + r
  if (g.length === 1) g = '0' + g
  if (b.length === 1) b = '0' + b

  return r + g + b
}

export const hexToRGB = (hex: Hex): RGB => {
  if (
    !Boolean(hex) ||
    (hex.length !== 6 && hex.length !== 3) ||
    !hex.match(/^[0-9a-fA-F]*$/)
  ) {
    throw new Error('Invalid hex code')
  }

  const getColorComponent = (hex: Hex, colorIndex: number) =>
    parseInt(
      hex.length === 6
        ? `0x${hex[colorIndex * 2]}${hex[colorIndex * 2 + 1]}`
        : `0x${hex[colorIndex]}${hex[colorIndex]}`
    )

  let r = getColorComponent(hex, 0)
  let g = getColorComponent(hex, 1)
  let b = getColorComponent(hex, 2)

  return {r, g, b}
}
