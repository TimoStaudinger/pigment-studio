import React, {useEffect, useState} from 'react'

import {Shade} from '../../types/color'
import {labToRGB, Lab} from '../../util/color'
import Chart from './Chart'

interface Props {
  id: string
  shades: Shade[]
  setLab: (shadeId: string, lab: Lab) => void
}

const LightnessChart = ({id, shades, setLab}: Props) => {
  let [badAreas, setBadAreas] = useState<{min: number; max: number}[][]>([])

  useEffect(() => {
    const calculateBadAreasMin = (shades: Shade[]) => {
      let badAreas = shades.map(shade => {
        for (let l = 0; l <= 100; l++) {
          let rgb = labToRGB({...shade.lab, l}, true)
          if (rgb === null) continue

          return {min: 0, max: l - 1}
        }

        return {min: 0, max: 0}
      })

      return badAreas
    }
    const calculateBadAreasMax = (shades: Shade[]) => {
      let badAreas = shades.map(shade => {
        for (let l = 100; l >= 0; l--) {
          let rgb = labToRGB({...shade.lab, l}, true)
          if (rgb === null) continue

          return {min: l + 1, max: 100}
        }

        return {min: 100, max: 100}
      })

      return badAreas
    }

    setBadAreas([calculateBadAreasMin(shades), calculateBadAreasMax(shades)])
  }, [shades, id])

  return (
    <Chart
      title="Lightness"
      badAreas={badAreas}
      convertLabToValue={lab => lab.l}
      id={id}
      minValue={0}
      maxValue={100}
      shades={shades}
      updateValue={(i, value) =>
        setLab(shades[i].id, {...shades[i].lab, l: value})
      }
    />
  )
}

export default LightnessChart
