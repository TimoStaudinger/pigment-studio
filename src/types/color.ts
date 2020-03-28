export interface HSL {
  h: number
  s: number
  l: number
}

export interface Lab {
  l: number
  a: number
  b: number
}

export interface RGB {
  r: number
  g: number
  b: number
}

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
