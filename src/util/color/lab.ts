import {Lab, XYZ} from './types'

export const labToXYZ = (lab: Lab): XYZ => {
  let y = (lab.l + 16) / 116
  let x = lab.a / 500 + y
  let z = y - lab.b / 200

  x = 0.95047 * (x * x * x > 0.008856 ? x * x * x : (x - 16 / 116) / 7.787)
  y = 1.0 * (y * y * y > 0.008856 ? y * y * y : (y - 16 / 116) / 7.787)
  z = 1.08883 * (z * z * z > 0.008856 ? z * z * z : (z - 16 / 116) / 7.787)

  return {x, y, z}
}

const tristimulusValuesD65 = {x: 0.950489, y: 1.0, z: 1.088884}
export const xyzToLab = (xyz: XYZ): Lab => {
  let deltaCubed = Math.pow(6 / 29, 3)

  let x = xyz.x / tristimulusValuesD65.x
  let y = xyz.y / tristimulusValuesD65.y
  let z = xyz.z / tristimulusValuesD65.z

  let divisor = 3 * Math.pow(6 / 29, 2)

  x = x > deltaCubed ? Math.pow(x, 1 / 3) : x / divisor + 4 / 29
  y = y > deltaCubed ? Math.pow(y, 1 / 3) : y / divisor + 4 / 29
  z = z > deltaCubed ? Math.pow(z, 1 / 3) : z / divisor + 4 / 29

  return {
    l: 116 * y - 16,
    a: 500 * (x - y),
    b: 200 * (y - z)
  }
}
