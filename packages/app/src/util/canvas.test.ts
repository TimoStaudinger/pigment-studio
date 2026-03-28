import {convertCoordsToOffset} from './canvas'

it('converts (0, 0) to offset 0', () => {
  expect(convertCoordsToOffset(0, 0, 100)).toBe(0)
})

it('calculates offset for first row', () => {
  // x=5, y=0, width=100 -> (5 + 0*100) * 4 = 20
  expect(convertCoordsToOffset(5, 0, 100)).toBe(20)
})

it('calculates offset for second row', () => {
  // x=0, y=1, width=100 -> (0 + 1*100) * 4 = 400
  expect(convertCoordsToOffset(0, 1, 100)).toBe(400)
})

it('calculates offset for arbitrary position', () => {
  // x=3, y=2, width=10 -> (3 + 2*10) * 4 = 92
  expect(convertCoordsToOffset(3, 2, 10)).toBe(92)
})
