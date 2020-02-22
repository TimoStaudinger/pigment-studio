import {ulid} from 'ulid'
import {Color} from '../types/color'

export const generatePalette = (): Color[] => [
  {
    id: ulid(),
    name: 'Primary 1',
    shades: [
      {
        id: ulid(),
        name: '900',
        hsl: {hue: 205, saturation: 1, lightness: 0.21}
      },
      {
        id: ulid(),
        name: '800',
        hsl: {hue: 205, saturation: 0.87, lightness: 0.29}
      },
      {
        id: ulid(),
        name: '700',
        hsl: {hue: 205, saturation: 0.82, lightness: 0.33}
      },
      {
        id: ulid(),
        name: '600',
        hsl: {hue: 205, saturation: 0.76, lightness: 0.39}
      },
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 205, saturation: 0.67, lightness: 0.45},
        base: true
      },
      {
        id: ulid(),
        name: '400',
        hsl: {hue: 205, saturation: 0.65, lightness: 0.55}
      },
      {
        id: ulid(),
        name: '300',
        hsl: {hue: 205, saturation: 0.74, lightness: 0.65}
      },
      {
        id: ulid(),
        name: '200',
        hsl: {hue: 205, saturation: 0.84, lightness: 0.74}
      },
      {
        id: ulid(),
        name: '100',
        hsl: {hue: 205, saturation: 0.97, lightness: 0.85}
      },
      {
        id: ulid(),
        name: '000',
        hsl: {hue: 205, saturation: 0.79, lightness: 0.92}
      }
    ]
  },
  {
    id: ulid(),
    name: 'Primary 2',
    shades: [
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 42, saturation: 0.87, lightness: 0.55}
      }
    ]
  },
  {
    id: ulid(),
    name: 'Neutral',
    shades: [
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 210, saturation: 0.22, lightness: 0.49}
      }
    ]
  },
  {
    id: ulid(),
    name: 'Accent 1',
    shades: [
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 185, saturation: 0.62, lightness: 0.45}
      }
    ]
  },
  {
    id: ulid(),
    name: 'Accent 2',
    shades: [
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 360, saturation: 0.67, lightness: 0.44}
      }
    ]
  }
]
