import {Lab, Shade, HSL, RGB} from '../types/color'

export const convertHSLtoRGB = (hsl: HSL): RGB => {
  let c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s,
    x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1)),
    m = hsl.l - c / 2,
    r = 0,
    g = 0,
    b = 0

  if (0 <= hsl.h && hsl.h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= hsl.h && hsl.h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= hsl.h && hsl.h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= hsl.h && hsl.h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= hsl.h && hsl.h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= hsl.h && hsl.h < 360) {
    r = c
    g = 0
    b = x
  }
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return {r, g, b}
}

export const convertHSLToHex = (hsl: HSL) => {
  let {r: rValue, g: gValue, b: bValue} = convertHSLtoRGB(hsl)

  let r = rValue.toString(16)
  let g = gValue.toString(16)
  let b = bValue.toString(16)

  if (r.length === 1) r = '0' + r
  if (g.length === 1) g = '0' + g
  if (b.length === 1) b = '0' + b

  return r + g + b
}

export const convertHexToHSL = (hex: string): HSL => {
  if (!Boolean(hex) || hex.length !== 6 || !hex.match(/^[0-9a-fA-F]*$/)) {
    throw new Error('Invalid hex code')
  }

  // Convert hex to RGB first
  let r = 0
  let g = 0
  let b = 0

  r = parseInt('0x' + hex[0] + hex[1])
  g = parseInt('0x' + hex[2] + hex[3])
  b = parseInt('0x' + hex[4] + hex[5])

  // Then to HSL
  r /= 255
  g /= 255
  b /= 255

  let cmin = Math.min(r, g, b)
  let cmax = Math.max(r, g, b)
  let delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0

  if (delta === 0) h = 0
  else if (cmax === r) h = ((g - b) / delta) % 6
  else if (cmax === g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return {h: h, s: s / 100, l: l / 100}
}

export const getBaseShade = (shades: Shade[]): Shade =>
  shades.find(shade => shade.base) || shades[0]

export const convertLabToRGB = (lab: Lab): RGB => {
  var y = (lab.l + 16) / 116,
    x = lab.a / 500 + y,
    z = y - lab.b / 200,
    r,
    g,
    b

  x = 0.95047 * (x * x * x > 0.008856 ? x * x * x : (x - 16 / 116) / 7.787)
  y = 1.0 * (y * y * y > 0.008856 ? y * y * y : (y - 16 / 116) / 7.787)
  z = 1.08883 * (z * z * z > 0.008856 ? z * z * z : (z - 16 / 116) / 7.787)

  r = x * 3.2406 + y * -1.5372 + z * -0.4986
  g = x * -0.9689 + y * 1.8758 + z * 0.0415
  b = x * 0.0557 + y * -0.204 + z * 1.057

  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b

  return {
    r: Math.max(0, Math.min(1, r)) * 255,
    g: Math.max(0, Math.min(1, g)) * 255,
    b: Math.max(0, Math.min(1, b)) * 255
  }
}

export const convertRGBtoLab = (rgb: RGB): Lab => {
  var r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    x,
    y,
    z

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116

  return {l: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z)}
}

export const convertHSLtoLab = (hsl: HSL): Lab =>
  convertRGBtoLab(convertHSLtoRGB(hsl))

export const convertRGBtoHex = (rgb: RGB) => {
  let r = rgb.r.toString(16)
  let g = rgb.g.toString(16)
  let b = rgb.b.toString(16)

  if (r.length === 1) r = '0' + r
  if (g.length === 1) g = '0' + g
  if (b.length === 1) b = '0' + b

  return r + g + b
}

// export const convertHexToRGB = (h: string): RGB => {
//   let r = '0',
//     g = '0',
//     b = '0'

//   // 3 digits
//   if (h.length === 3) {
//     r = '0x' + h[0] + h[0]
//     g = '0x' + h[1] + h[1]
//     b = '0x' + h[2] + h[2]

//     // 6 digits
//   } else if (h.length === 6) {
//     r = '0x' + h[0] + h[1]
//     g = '0x' + h[2] + h[3]
//     b = '0x' + h[4] + h[5]
//   }

//   return 'rgb(' + +r + ',' + +g + ',' + +b + ')'
// }

export const convertLabToHex = (lab: Lab): string =>
  convertRGBtoHex(convertLabToRGB(lab))

// function deltaE(labA, labB) {
//   var deltaL = labA[0] - labB[0]
//   var deltaA = labA[1] - labB[1]
//   var deltaB = labA[2] - labB[2]
//   var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2])
//   var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2])
//   var deltaC = c1 - c2
//   var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC
//   deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH)
//   var sc = 1.0 + 0.045 * c1
//   var sh = 1.0 + 0.015 * c1
//   var deltaLKlsl = deltaL / 1.0
//   var deltaCkcsc = deltaC / sc
//   var deltaHkhsh = deltaH / sh
//   var i =
//     deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh
//   return i < 0 ? 0 : Math.sqrt(i)
// }
