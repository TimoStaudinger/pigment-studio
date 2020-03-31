import {rgbToLab} from './composite'

it('converts RGB to Lab correctly', () => {
  let lab = rgbToLab({r: 202, g: 75, b: 34})
  expect(lab.l).toBeCloseTo(49.14, 2)
  expect(lab.a).toBeCloseTo(48.575, 2)
  expect(lab.b).toBeCloseTo(48.715, 2)
})
