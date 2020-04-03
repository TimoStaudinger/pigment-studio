import React from 'react'
import {Lab, labToHex} from '@pigmentstudio/convert'

import {Shade} from '../../../types/color'

import Chart from './Chart'

const hueMax = 360
const hueMin = 0
const radToDeg = (rad: number) => (rad / Math.PI) * 180 + (rad > 0 ? 0 : 360)
const calculateHue = ({a, b}: Lab) => radToDeg(Math.atan2(b, a))
const calculateChroma = ({a, b}: Lab) => Math.sqrt(a * a + b * b)

const applyHueToLab = (lab: Lab, hue: number) => {
  let chroma = calculateChroma(lab)

  let a = chroma * Math.cos((hue / 180) * Math.PI)
  let b = chroma * Math.sin((hue / 180) * Math.PI)

  return {...lab, a, b}
}

interface Props {
  id: string
  shades: Shade[]
  setLab: (lab: Lab, index: number) => void
}

const LightnessChart = ({id, shades, setLab}: Props) => {
  return (
    <Chart
      title="Hue"
      badAreas={[]}
      convertLabToValue={calculateHue}
      id={id}
      minValue={hueMin}
      maxValue={hueMax}
      shades={shades}
      updateValue={(i, value) => setLab(applyHueToLab(shades[i].lab, value), i)}
      convertValueToHex={(i, value) =>
        labToHex(applyHueToLab(shades[i].lab, value))
      }
    />
  )
}

export default LightnessChart
