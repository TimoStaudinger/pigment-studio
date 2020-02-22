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
        name: '900',
        hsl: {hue: 15, saturation: 0.86, lightness: 0.3}
      },
      {
        id: ulid(),
        name: '800',
        hsl: {hue: 22, saturation: 0.82, lightness: 0.39}
      },
      {
        id: ulid(),
        name: '700',
        hsl: {hue: 29, saturation: 0.8, lightness: 0.44}
      },
      {
        id: ulid(),
        name: '600',
        hsl: {hue: 36, saturation: 0.77, lightness: 0.49}
      },
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 42, saturation: 0.87, lightness: 0.55},
        base: true
      },
      {
        id: ulid(),
        name: '400',
        hsl: {hue: 44, saturation: 0.92, lightness: 0.63}
      },
      {
        id: ulid(),
        name: '300',
        hsl: {hue: 48, saturation: 0.94, lightness: 0.68}
      },
      {
        id: ulid(),
        name: '200',
        hsl: {hue: 48, saturation: 0.95, lightness: 0.76}
      },
      {
        id: ulid(),
        name: '100',
        hsl: {hue: 48, saturation: 1, lightness: 0.88}
      },
      {
        id: ulid(),
        name: '000',
        hsl: {hue: 49, saturation: 1, lightness: 0.96}
      }
    ]
  },
  {
    id: ulid(),
    name: 'Neutral',
    shades: [
      {
        id: ulid(),
        name: '900',
        hsl: {hue: 209, saturation: 0.61, lightness: 0.16}
      },
      {
        id: ulid(),
        name: '800',
        hsl: {hue: 211, saturation: 0.39, lightness: 0.23}
      },
      {
        id: ulid(),
        name: '700',
        hsl: {hue: 209, saturation: 0.34, lightness: 0.3}
      },
      {
        id: ulid(),
        name: '600',
        hsl: {hue: 209, saturation: 0.28, lightness: 0.39}
      },
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 210, saturation: 0.22, lightness: 0.49},
        base: true
      },
      {
        id: ulid(),
        name: '400',
        hsl: {hue: 209, saturation: 0.23, lightness: 0.6}
      },
      {
        id: ulid(),
        name: '300',
        hsl: {hue: 211, saturation: 0.27, lightness: 0.7}
      },
      {
        id: ulid(),
        name: '200',
        hsl: {hue: 210, saturation: 0.31, lightness: 0.8}
      },
      {
        id: ulid(),
        name: '100',
        hsl: {hue: 212, saturation: 0.33, lightness: 0.89}
      },
      {
        id: ulid(),
        name: '000',
        hsl: {hue: 210, saturation: 0.36, lightness: 0.96}
      }
    ]
  },
  {
    id: ulid(),
    name: 'Accent 1',
    shades: [
      {
        id: ulid(),
        name: '900',
        hsl: {hue: 184, saturation: 0.91, lightness: 0.17}
      },
      {
        id: ulid(),
        name: '800',
        hsl: {hue: 185, saturation: 0.84, lightness: 0.25}
      },
      {
        id: ulid(),
        name: '700',
        hsl: {hue: 185, saturation: 0.81, lightness: 0.29}
      },
      {
        id: ulid(),
        name: '600',
        hsl: {hue: 184, saturation: 0.77, lightness: 0.34}
      },
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 185, saturation: 0.62, lightness: 0.45},
        base: true
      },
      {
        id: ulid(),
        name: '400',
        hsl: {hue: 185, saturation: 0.57, lightness: 0.5}
      },
      {
        id: ulid(),
        name: '300',
        hsl: {hue: 184, saturation: 0.65, lightness: 0.59}
      },
      {
        id: ulid(),
        name: '200',
        hsl: {hue: 184, saturation: 0.8, lightness: 0.74}
      },
      {
        id: ulid(),
        name: '100',
        hsl: {hue: 185, saturation: 0.94, lightness: 0.87}
      },
      {
        id: ulid(),
        name: '000',
        hsl: {hue: 186, saturation: 1, lightness: 0.94}
      }
    ]
  },
  {
    id: ulid(),
    name: 'Accent 2',
    shades: [
      {
        id: ulid(),
        name: '900',
        hsl: {hue: 359, saturation: 0.92, lightness: 0.2}
      },
      {
        id: ulid(),
        name: '800',
        hsl: {hue: 359, saturation: 0.85, lightness: 0.25}
      },
      {
        id: ulid(),
        name: '700',
        hsl: {hue: 359, saturation: 0.79, lightness: 0.32}
      },
      {
        id: ulid(),
        name: '600',
        hsl: {hue: 359, saturation: 0.72, lightness: 0.38}
      },
      {
        id: ulid(),
        name: '500',
        hsl: {hue: 359, saturation: 0.67, lightness: 0.44},
        base: true
      },
      {
        id: ulid(),
        name: '400',
        hsl: {hue: 359, saturation: 0.64, lightness: 0.55}
      },
      {
        id: ulid(),
        name: '300',
        hsl: {hue: 359, saturation: 0.71, lightness: 0.66}
      },
      {
        id: ulid(),
        name: '200',
        hsl: {hue: 359, saturation: 0.77, lightness: 0.78}
      },
      {
        id: ulid(),
        name: '100',
        hsl: {hue: 359, saturation: 0.82, lightness: 0.8}
      },
      {
        id: ulid(),
        name: '000',
        hsl: {hue: 359, saturation: 1, lightness: 0.97}
      }
    ]
  }
]
