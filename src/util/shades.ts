import {Shade} from '../types/color'

export const getBaseShade = (shades: Shade[]): Shade =>
  shades.find(shade => shade.base) || shades[0]
