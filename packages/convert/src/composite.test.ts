import {rgbToLab, labToRGB, hslToHex, hexToHSL, hslToLab, labToHex} from './composite'

it('converts RGB to Lab correctly', () => {
  let lab = rgbToLab({r: 202, g: 75, b: 34})
  expect(lab.l).toBeCloseTo(49.14, 2)
  expect(lab.a).toBeCloseTo(48.575, 2)
  expect(lab.b).toBeCloseTo(48.715, 2)
})

it('converts Lab to RGB correctly', () => {
  let rgb = labToRGB({l: 49.14, a: 48.575, b: 48.715})
  expect(rgb.r).toBeCloseTo(202, 0)
  expect(rgb.g).toBeCloseTo(75, 0)
  expect(rgb.b).toBeCloseTo(34, 0)
})

it('converts Lab to RGB with strict mode returning null for out-of-gamut', () => {
  let result = labToRGB({l: 50, a: 130, b: 130}, true)
  expect(result).toBeNull()
})

it('converts Lab to RGB with strict=false returning placeholder for out-of-gamut', () => {
  let result = labToRGB({l: 50, a: 130, b: 130})
  expect(result).toEqual({r: 255, g: 0, b: 0})
})

it('converts HSL to Hex correctly', () => {
  expect(hslToHex({h: 0, s: 1, l: 0.5})).toBe('ff0000')
  expect(hslToHex({h: 120, s: 1, l: 0.5})).toBe('00ff00')
  expect(hslToHex({h: 240, s: 1, l: 0.5})).toBe('0000ff')
})

it('converts Hex to HSL correctly', () => {
  let hsl = hexToHSL('ff0000')
  expect(hsl.h).toBe(0)
  expect(hsl.s).toBe(1)
  expect(hsl.l).toBe(0.5)
})

it('converts HSL to Lab correctly', () => {
  let lab = hslToLab({h: 0, s: 1, l: 0.5})
  expect(lab.l).toBeCloseTo(53.241, 1)
  expect(lab.a).toBeCloseTo(80.109, 1)
  expect(lab.b).toBeCloseTo(67.22, 1)
})

it('converts Lab to Hex correctly', () => {
  let hex = labToHex({l: 53.233, a: 80.109, b: 67.22})
  expect(hex).toBe('ff0000')
})
