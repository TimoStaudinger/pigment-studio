import {
  rgbToXYZ,
  rgbToHex,
  hexToRGB,
  xyzToRGB,
  INVALID_COLOR_PLACEHOLDER
} from './rgb'

it('reversibly converts between RGB and XYZ', () => {
  expect(xyzToRGB(rgbToXYZ({r: 202, g: 75, b: 34}))).toEqual({
    r: 202,
    g: 75,
    b: 34
  })

  let xyz = rgbToXYZ(xyzToRGB({x: 0.4, y: 0.5, z: 0.6}))
  expect(xyz.x).toBeCloseTo(0.4, 2)
  expect(xyz.y).toBeCloseTo(0.5, 2)
  expect(xyz.z).toBeCloseTo(0.6, 2)
})

it('converts RGB to XYZ correctly', () => {
  let xyz = rgbToXYZ({r: 202, g: 75, b: 34})
  expect(xyz.x).toBeCloseTo(0.27165, 5)
  expect(xyz.y).toBeCloseTo(0.17708, 5)
  expect(xyz.z).toBeCloseTo(0.03501, 5)
})

it('converts XYZ to RGB correctly', () => {
  expect(xyzToRGB({x: 0.4, y: 0.5, z: 0.6})).toEqual({
    r: 131,
    g: 200,
    b: 196
  })
})

it('handles values outside RGB gamut correctly', () => {
  expect(xyzToRGB({x: 0.15, y: 0.1, z: -3.8})).toEqual(
    INVALID_COLOR_PLACEHOLDER
  )

  expect(xyzToRGB({x: 0.15, y: 0.1, z: -3.8}, false)).toEqual(
    INVALID_COLOR_PLACEHOLDER
  )

  expect(INVALID_COLOR_PLACEHOLDER).toEqual({
    r: 255,
    g: 0,
    b: 0
  })

  expect(xyzToRGB({x: 0.15, y: 0.1, z: -3.8}, true)).toEqual(null)
})

it('converts RGB to Hex correctly', () => {
  expect(rgbToHex({r: 202, g: 75, b: 34})).toBe('ca4b22')
  expect(rgbToHex({r: 202.4, g: 75, b: 34})).toBe('ca4b22')
  expect(rgbToHex({r: 202.6, g: 75, b: 34})).toBe('cb4b22')

  expect(rgbToHex({r: 0, g: 0, b: 0})).toBe('000000')
  expect(rgbToHex({r: 255, g: 255, b: 255})).toBe('ffffff')
})

it('converts Hex to RGB correctly', () => {
  expect(hexToRGB('ca4b22')).toEqual({r: 202, g: 75, b: 34})

  expect(hexToRGB('000000')).toEqual({r: 0, g: 0, b: 0})
  expect(hexToRGB('ffffff')).toEqual({r: 255, g: 255, b: 255})
  expect(hexToRGB('aabbcc')).toEqual({r: 170, g: 187, b: 204})

  expect(hexToRGB('000')).toEqual({r: 0, g: 0, b: 0})
  expect(hexToRGB('fff')).toEqual({r: 255, g: 255, b: 255})
  expect(hexToRGB('abc')).toEqual({r: 170, g: 187, b: 204})
})
