export const convertHSLtoRGB = (
  h: number,
  s: number,
  l: number
): [number, number, number] => {
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return [r, g, b]
}

export const convertHSLToHex = (h: number, s: number, l: number) => {
  let [rValue, gValue, bValue] = convertHSLtoRGB(h, s, l)

  let r = rValue.toString(16)
  let g = gValue.toString(16)
  let b = bValue.toString(16)

  if (r.length === 1) r = '0' + r
  if (g.length === 1) g = '0' + g
  if (b.length === 1) b = '0' + b

  return r + g + b
}

export const convertHexToHSL = (hex: string): [number, number, number] => {
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

  return [h, s / 100, l / 100]
}
