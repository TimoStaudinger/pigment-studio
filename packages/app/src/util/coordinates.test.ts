import {isInBoundingBox, isPointOnHandle2D, isPointOnHandle1D} from './coordinates'

describe('isInBoundingBox', () => {
  it('returns true for a point inside the box', () => {
    expect(isInBoundingBox(50, 50, 50, 50, 10)).toBe(true)
    expect(isInBoundingBox(55, 55, 50, 50, 10)).toBe(true)
  })

  it('returns false for a point outside the box', () => {
    expect(isInBoundingBox(100, 100, 50, 50, 10)).toBe(false)
  })

  it('returns false for a point exactly on the edge (exclusive)', () => {
    expect(isInBoundingBox(40, 50, 50, 50, 10)).toBe(false)
    expect(isInBoundingBox(60, 50, 50, 50, 10)).toBe(false)
  })
})

describe('isPointOnHandle2D', () => {
  it('returns true when point is on the handle', () => {
    // handle at fraction (0.5, 0.5) on a 200x200 area = position (100, 100)
    expect(isPointOnHandle2D(100, 100, 200, 200, 0.5, 0.5)).toBe(true)
  })

  it('returns false when point is far from the handle', () => {
    expect(isPointOnHandle2D(0, 0, 200, 200, 0.5, 0.5)).toBe(false)
  })

  it('returns false when any parameter is null', () => {
    expect(isPointOnHandle2D(100, 100, null, 200, 0.5, 0.5)).toBe(false)
    expect(isPointOnHandle2D(100, 100, 200, null, 0.5, 0.5)).toBe(false)
    expect(isPointOnHandle2D(100, 100, 200, 200, null, 0.5)).toBe(false)
    expect(isPointOnHandle2D(100, 100, 200, 200, 0.5, null)).toBe(false)
  })

  it('respects custom padding', () => {
    // handle at (100, 100), point at (120, 100)
    // default padding 15 -> miss, custom padding 25 -> hit
    expect(isPointOnHandle2D(120, 100, 200, 200, 0.5, 0.5)).toBe(false)
    expect(isPointOnHandle2D(120, 100, 200, 200, 0.5, 0.5, 25)).toBe(true)
  })
})

describe('isPointOnHandle1D', () => {
  it('returns true when point is on the handle', () => {
    // handle at fraction 0.5 on a 200-wide area = position 100
    expect(isPointOnHandle1D(100, 200, 0.5)).toBe(true)
  })

  it('returns false when point is far from the handle', () => {
    expect(isPointOnHandle1D(0, 200, 0.5)).toBe(false)
  })

  it('returns false when any parameter is null', () => {
    expect(isPointOnHandle1D(100, null, 0.5)).toBe(false)
    expect(isPointOnHandle1D(100, 200, null)).toBe(false)
  })

  it('respects custom padding', () => {
    expect(isPointOnHandle1D(120, 200, 0.5)).toBe(false)
    expect(isPointOnHandle1D(120, 200, 0.5, 25)).toBe(true)
  })
})
