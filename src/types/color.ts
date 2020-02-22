export interface HSL {
  hue: number
  saturation: number
  lightness: number
}

export interface Shade {
  id: string
  name: string
  hsl: HSL
  base?: boolean
}

export interface Color {
  id: string
  name: string
  shades: Shade[]
}
