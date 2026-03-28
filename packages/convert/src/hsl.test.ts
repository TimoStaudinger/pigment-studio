import {hslToRGB, rgbToHSL} from './hsl'

it('converts HSL to RGB for each hue sector', () => {
  // Red (h=0)
  expect(hslToRGB({h: 0, s: 1, l: 0.5})).toEqual({r: 255, g: 0, b: 0})
  // Yellow (h=60)
  expect(hslToRGB({h: 60, s: 1, l: 0.5})).toEqual({r: 255, g: 255, b: 0})
  // Green (h=120)
  expect(hslToRGB({h: 120, s: 1, l: 0.5})).toEqual({r: 0, g: 255, b: 0})
  // Cyan (h=180)
  expect(hslToRGB({h: 180, s: 1, l: 0.5})).toEqual({r: 0, g: 255, b: 255})
  // Blue (h=240)
  expect(hslToRGB({h: 240, s: 1, l: 0.5})).toEqual({r: 0, g: 0, b: 255})
  // Magenta (h=300)
  expect(hslToRGB({h: 300, s: 1, l: 0.5})).toEqual({r: 255, g: 0, b: 255})
})

it('converts achromatic HSL to RGB', () => {
  expect(hslToRGB({h: 0, s: 0, l: 0})).toEqual({r: 0, g: 0, b: 0})
  expect(hslToRGB({h: 0, s: 0, l: 1})).toEqual({r: 255, g: 255, b: 255})
  expect(hslToRGB({h: 0, s: 0, l: 0.5})).toEqual({r: 128, g: 128, b: 128})
})

it('converts RGB to HSL correctly', () => {
  let hsl = rgbToHSL({r: 255, g: 0, b: 0})
  expect(hsl.h).toBe(0)
  expect(hsl.s).toBe(1)
  expect(hsl.l).toBe(0.5)

  hsl = rgbToHSL({r: 0, g: 255, b: 0})
  expect(hsl.h).toBe(120)
  expect(hsl.s).toBe(1)
  expect(hsl.l).toBe(0.5)

  hsl = rgbToHSL({r: 0, g: 0, b: 255})
  expect(hsl.h).toBe(240)
  expect(hsl.s).toBe(1)
  expect(hsl.l).toBe(0.5)
})

it('converts achromatic RGB to HSL', () => {
  expect(rgbToHSL({r: 0, g: 0, b: 0})).toEqual({h: 0, s: 0, l: 0})
  expect(rgbToHSL({r: 255, g: 255, b: 255})).toEqual({h: 0, s: 0, l: 1})
})

it('handles negative hue wrap-around', () => {
  // When cmax is blue and r > g, hue formula gives negative before +360
  let hsl = rgbToHSL({r: 100, g: 0, b: 200})
  expect(hsl.h).toBe(270)
})

it('reversibly converts between HSL and RGB', () => {
  let rgb = {r: 202, g: 75, b: 34}
  let hsl = rgbToHSL(rgb)
  let result = hslToRGB(hsl)
  expect(Math.abs(result.r - rgb.r)).toBeLessThanOrEqual(1)
  expect(Math.abs(result.g - rgb.g)).toBeLessThanOrEqual(1)
  expect(Math.abs(result.b - rgb.b)).toBeLessThanOrEqual(1)
})
