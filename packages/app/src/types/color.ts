import {Lab} from '@pigmentstudio/convert'

export interface Shade {
  name: string
  lab: Lab
  base?: boolean
}

export interface Color {
  name: string
  shades: Shade[]
}

export interface Palette {
  id: string
  name: string
  colors: Color[]
}
