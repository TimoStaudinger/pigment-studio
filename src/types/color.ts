import {Lab} from '../util/color'

export interface Shade {
  id: string
  name: string
  lab: Lab
  base?: boolean
}

export interface Color {
  id: string
  name: string
  shades: Shade[]
}
