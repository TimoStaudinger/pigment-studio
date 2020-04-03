import {ulid} from 'ulid'
import {hslToLab} from '@pigmentstudio/convert'

import {Palette} from '../types/color'

export const generateBlank = (): Palette => ({
  id: ulid(),
  name: 'Untitled',
  colors: []
})

export const generateFromTemplate = (): Palette => ({
  id: ulid(),
  name: 'Untitled',
  colors: [
    {
      name: 'Primary 1',
      shades: [
        {name: '900', lab: hslToLab({h: 205, s: 1, l: 0.21})},
        {name: '800', lab: hslToLab({h: 205, s: 0.87, l: 0.29})},
        {name: '700', lab: hslToLab({h: 205, s: 0.82, l: 0.33})},
        {name: '600', lab: hslToLab({h: 205, s: 0.76, l: 0.39})},
        {name: '500', lab: hslToLab({h: 205, s: 0.67, l: 0.45})},
        {name: '400', lab: hslToLab({h: 205, s: 0.65, l: 0.55})},
        {name: '300', lab: hslToLab({h: 205, s: 0.74, l: 0.65})},
        {name: '200', lab: hslToLab({h: 205, s: 0.84, l: 0.74})},
        {name: '100', lab: hslToLab({h: 205, s: 0.97, l: 0.85})},
        {name: '000', lab: hslToLab({h: 205, s: 0.79, l: 0.92})}
      ]
    },
    {
      name: 'Primary 2',
      shades: [
        {name: '900', lab: hslToLab({h: 15, s: 0.86, l: 0.3})},
        {name: '800', lab: hslToLab({h: 22, s: 0.82, l: 0.39})},
        {name: '700', lab: hslToLab({h: 29, s: 0.8, l: 0.44})},
        {name: '600', lab: hslToLab({h: 36, s: 0.77, l: 0.49})},
        {name: '500', lab: hslToLab({h: 42, s: 0.87, l: 0.55})},
        {name: '400', lab: hslToLab({h: 44, s: 0.92, l: 0.63})},
        {name: '300', lab: hslToLab({h: 48, s: 0.94, l: 0.68})},
        {name: '200', lab: hslToLab({h: 48, s: 0.95, l: 0.76})},
        {name: '100', lab: hslToLab({h: 48, s: 1, l: 0.88})},
        {name: '000', lab: hslToLab({h: 49, s: 1, l: 0.96})}
      ]
    },
    {
      name: 'Neutral',
      shades: [
        {name: '900', lab: hslToLab({h: 209, s: 0.61, l: 0.16})},
        {name: '800', lab: hslToLab({h: 211, s: 0.39, l: 0.23})},
        {name: '700', lab: hslToLab({h: 209, s: 0.34, l: 0.3})},
        {name: '600', lab: hslToLab({h: 209, s: 0.28, l: 0.39})},
        {name: '500', lab: hslToLab({h: 210, s: 0.22, l: 0.49})},
        {name: '400', lab: hslToLab({h: 209, s: 0.23, l: 0.6})},
        {name: '300', lab: hslToLab({h: 211, s: 0.27, l: 0.7})},
        {name: '200', lab: hslToLab({h: 210, s: 0.31, l: 0.8})},
        {name: '100', lab: hslToLab({h: 212, s: 0.33, l: 0.89})},
        {name: '000', lab: hslToLab({h: 210, s: 0.36, l: 0.96})}
      ]
    },
    {
      name: 'Accent 1',
      shades: [
        {name: '900', lab: hslToLab({h: 184, s: 0.91, l: 0.17})},
        {name: '800', lab: hslToLab({h: 185, s: 0.84, l: 0.25})},
        {name: '700', lab: hslToLab({h: 185, s: 0.81, l: 0.29})},
        {name: '600', lab: hslToLab({h: 184, s: 0.77, l: 0.34})},
        {name: '500', lab: hslToLab({h: 185, s: 0.62, l: 0.45})},
        {name: '400', lab: hslToLab({h: 185, s: 0.57, l: 0.5})},
        {name: '300', lab: hslToLab({h: 184, s: 0.65, l: 0.59})},
        {name: '200', lab: hslToLab({h: 184, s: 0.8, l: 0.74})},
        {name: '100', lab: hslToLab({h: 185, s: 0.94, l: 0.87})},
        {name: '000', lab: hslToLab({h: 186, s: 1, l: 0.94})}
      ]
    },
    {
      name: 'Accent 2',
      shades: [
        {name: '900', lab: hslToLab({h: 359, s: 0.92, l: 0.2})},
        {name: '800', lab: hslToLab({h: 359, s: 0.85, l: 0.25})},
        {name: '700', lab: hslToLab({h: 359, s: 0.79, l: 0.32})},
        {name: '600', lab: hslToLab({h: 359, s: 0.72, l: 0.38})},
        {name: '500', lab: hslToLab({h: 359, s: 0.67, l: 0.44})},
        {name: '400', lab: hslToLab({h: 359, s: 0.64, l: 0.55})},
        {name: '300', lab: hslToLab({h: 359, s: 0.71, l: 0.66})},
        {name: '200', lab: hslToLab({h: 359, s: 0.77, l: 0.78})},
        {name: '100', lab: hslToLab({h: 359, s: 0.82, l: 0.8})},
        {name: '000', lab: hslToLab({h: 359, s: 1, l: 0.97})}
      ]
    }
  ]
})
