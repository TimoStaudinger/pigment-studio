import {hslToLab, Lab} from '@pigmentstudio/convert'

const colors: {name: string; text: Lab; background: Lab}[] = [
  {
    name: 'Red',
    text: hslToLab({h: 359, s: 0.67, l: 0.44}),
    background: hslToLab({h: 359, s: 0.82, l: 0.89})
  },
  {
    name: 'Orange',
    text: hslToLab({h: 22, s: 0.71, l: 0.45}),
    background: hslToLab({h: 22, s: 1, l: 0.86})
  },
  {
    name: 'Yellow',
    text: hslToLab({h: 42, s: 0.78, l: 0.6}),
    background: hslToLab({h: 45, s: 0.9, l: 0.88})
  },
  {
    name: 'Lime Green',
    text: hslToLab({h: 83, s: 0.64, l: 0.42}),
    background: hslToLab({h: 84, s: 0.77, l: 0.86})
  },
  {
    name: 'Green',
    text: hslToLab({h: 122, s: 0.39, l: 0.41}),
    background: hslToLab({h: 126, s: 0.49, l: 0.84})
  },
  {
    name: 'Teal',
    text: hslToLab({h: 162, s: 0.63, l: 0.41}),
    background: hslToLab({h: 154, s: 0.75, l: 0.87})
  },
  {
    name: 'Cyan',
    text: hslToLab({h: 185, s: 0.62, l: 0.45}),
    background: hslToLab({h: 185, s: 0.94, l: 0.87})
  },
  {
    name: 'Light Blue',
    text: hslToLab({h: 200, s: 0.54, l: 0.49}),
    background: hslToLab({h: 200, s: 0.88, l: 0.9})
  },
  {
    name: 'Blue',
    text: hslToLab({h: 205, s: 0.67, l: 0.45}),
    background: hslToLab({h: 205, s: 0.97, l: 0.85})
  },
  {
    name: 'Indigo',
    text: hslToLab({h: 227, s: 0.42, l: 0.51}),
    background: hslToLab({h: 221, s: 0.78, l: 0.86})
  },
  {
    name: 'Purple',
    text: hslToLab({h: 262, s: 0.48, l: 0.46}),
    background: hslToLab({h: 261, s: 0.68, l: 0.84})
  },
  {
    name: 'Magenta',
    text: hslToLab({h: 294, s: 0.48, l: 0.46}),
    background: hslToLab({h: 293, s: 0.67, l: 0.85})
  },
  {
    name: 'Pink',
    text: hslToLab({h: 330, s: 0.63, l: 0.47}),
    background: hslToLab({h: 330, s: 0.87, l: 0.85})
  }
]

export default colors
