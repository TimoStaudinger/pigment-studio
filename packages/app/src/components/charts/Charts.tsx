import React from 'react'
import {useParams} from 'react-router-dom'
import {Lab} from '@pigmentstudio/convert'

import {Color, Shade} from '../../types/color'
import Labels from './Labels'
import LightnessChart from './LightnessChart'
import ChromaChart from './ChromaChart'
import HueChart from './HueChart'

import styles from './Charts.module.css'

interface Props {
  colors: Color[]
  setLab: (shadeId: string, lab: Lab) => void
}

const Charts = ({colors, setLab}: Props) => {
  let {shadeId} = useParams()

  let color = colors.find(color =>
    color.shades.some(shade => shade.id === shadeId)
  )

  let shade = color?.shades.find(shade => shade.id === shadeId)

  let crossColorShades = colors
    .map(color => color.shades.find(s => s.name === shade?.name))
    .filter(Boolean) as Shade[]

  return color && shade ? (
    <div className={styles.container}>
      <div className={styles.column}>
        <Labels shades={color.shades} />
        <LightnessChart
          id={`${shade.id}-shades-lightness`}
          shades={color.shades}
          setLab={setLab}
        />
        <ChromaChart
          id={`${shade.id}-shades-chroma`}
          shades={color.shades}
          setLab={setLab}
        />
        <HueChart
          id={`${shade.id}-shades-hue`}
          shades={color.shades}
          setLab={setLab}
        />
      </div>

      <div className={styles.column}>
        <Labels
          shades={
            colors
              .map(color => [
                color.name,
                color.shades.find(s => s.name === shade?.name)
              ])
              .filter(Boolean) as [string, Shade][]
          }
        />
        <LightnessChart
          id={`${shade.id}-colors-lightness`}
          shades={crossColorShades}
          setLab={setLab}
        />
        <ChromaChart
          id={`${shade.id}-colors-chroma`}
          shades={crossColorShades}
          setLab={setLab}
        />
        <HueChart
          id={`${shade.id}-colors-hue`}
          shades={crossColorShades}
          setLab={setLab}
        />
      </div>
    </div>
  ) : null
}

export default Charts
