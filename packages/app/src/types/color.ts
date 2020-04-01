import {Lab} from '@pigmentstudio/convert'

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
