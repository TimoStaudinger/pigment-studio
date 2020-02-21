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
