export const isInBoundingBox = (
  x: number,
  y: number,
  boxX: number,
  boxY: number,
  boxPadding: number
): boolean => {
  let boxLeft = boxX - boxPadding
  let boxRight = boxX + boxPadding
  let boxTop = boxY - boxPadding
  let boxBottom = boxY + boxPadding

  return x > boxLeft && x < boxRight && y > boxTop && y < boxBottom
}

export const isPointOnHandle2D = (
  x: number,
  y: number,
  width: number | null,
  height: number | null,
  handleFractionX: number | null,
  handleFractionY: number | null,
  padding: number = 15
): boolean => {
  if (
    handleFractionX !== null &&
    handleFractionY !== null &&
    width !== null &&
    height !== null
  ) {
    return isInBoundingBox(
      x,
      y,
      handleFractionX * width,
      handleFractionY * height,
      padding
    )
  } else return false
}

export const isPointOnHandle1D = (
  x: number,
  width: number | null,
  handleFractionX: number | null,
  padding: number = 15
): boolean => {
  if (handleFractionX !== null && width !== null) {
    return isInBoundingBox(x, 0, handleFractionX * width, 0, padding)
  } else return false
}
