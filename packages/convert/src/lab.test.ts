import {labToXYZ, xyzToLab} from './lab'

it('converts Lab to XYZ correctly', () => {
  let xyz = labToXYZ({l: 50, a: 30, b: 30})

  expect(xyz.x).toBeCloseTo(0.23649, 3)
  expect(xyz.y).toBeCloseTo(0.18419, 3)
  expect(xyz.z).toBeCloseTo(0.08007, 3)
})

it('converts XYZ to Lab correctly', () => {
  let lab = xyzToLab({x: 0.25, y: 0.2, z: 0.1})

  expect(lab.l).toBeCloseTo(51.837, 2)
  expect(lab.a).toBeCloseTo(27.957, 2)
  expect(lab.b).toBeCloseTo(26.725, 2)
})

it('handles near-zero values using the linear branch', () => {
  // Very small XYZ values should trigger the linear (non-cubic) branch
  let lab = xyzToLab({x: 0.001, y: 0.001, z: 0.001})
  expect(lab.l).toBeCloseTo(0.903, 2)
  expect(lab.a).toBeCloseTo(0.203, 1)
  expect(lab.b).toBeCloseTo(0.082, 1)

  // And back
  let xyz = labToXYZ(lab)
  expect(xyz.x).toBeCloseTo(0.001, 3)
  expect(xyz.y).toBeCloseTo(0.001, 3)
  expect(xyz.z).toBeCloseTo(0.001, 3)
})

it('converts black (origin) correctly', () => {
  let lab = xyzToLab({x: 0, y: 0, z: 0})
  expect(lab.l).toBeCloseTo(0, 1)
})
