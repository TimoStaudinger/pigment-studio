export const convertCoordsToOffset = (
  x: number,
  y: number,
  width: number
): number => (x + y * width) * 4
