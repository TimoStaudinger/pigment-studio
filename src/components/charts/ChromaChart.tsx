import React, {useEffect, useState} from 'react'

import {Shade} from '../../types/color'
import {labToRGB, Lab, labToHex} from '../../util/color'
import Chart from './Chart'

const radToDeg = (rad: number) => (rad / Math.PI) * 180 + (rad > 0 ? 0 : 360)
const calculateHue = ({a, b}: Lab) => radToDeg(Math.atan2(b, a))

const chromaMax = 128 * Math.sqrt(2)
const chromaMin = 0
const calculateChroma = ({a, b}: Lab) => Math.sqrt(a * a + b * b)

const applyChromaToLab = (lab: Lab, chroma: number) => {
  let hue = calculateHue(lab)

  let a = chroma * Math.cos((hue / 180) * Math.PI)
  let b = chroma * Math.sin((hue / 180) * Math.PI)

  return {...lab, a, b}
}

interface Props {
  id: string
  shades: Shade[]
  setLab: (shadeId: string, lab: Lab) => void
}

const ChromaChart = ({id, shades, setLab}: Props) => {
  let [badAreas, setBadAreas] = useState<{min: number; max: number}[][]>([])

  useEffect(() => {
    const calculateBadAreasMax = (shades: Shade[]) => {
      let badAreas = shades.map(shade => {
        for (let c = chromaMax; c >= chromaMin; c--) {
          let rgb = labToRGB(applyChromaToLab(shade.lab, c), true)
          if (rgb === null) continue

          return {min: c + 1, max: chromaMax}
        }

        return {min: chromaMax, max: chromaMax}
      })

      return badAreas
    }

    setBadAreas([calculateBadAreasMax(shades)])
  }, [shades, id])

  return (
    <Chart
      title="Chroma"
      badAreas={badAreas}
      convertLabToValue={calculateChroma}
      id={id}
      minValue={chromaMin}
      maxValue={chromaMax}
      shades={shades}
      updateValue={(i, value) =>
        setLab(shades[i].id, applyChromaToLab(shades[i].lab, value))
      }
      convertValueToHex={(i: number, value: number) =>
        labToHex(applyChromaToLab(shades[i].lab, value))
      }
    />
  )
}

export default ChromaChart
