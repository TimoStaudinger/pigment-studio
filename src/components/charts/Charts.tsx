import React from 'react'
import {useParams} from 'react-router-dom'

import {Color, Shade, Lab} from '../../types/color'
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
          id={`${shade.id}-shades`}
          shades={color.shades}
          setLab={setLab}
        />
        <ChromaChart id={`${shade.id}-shades`} shades={color.shades} />
        <HueChart id={`${shade.id}-shades`} shades={color.shades} />
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
          id={`${shade.id}-colors`}
          shades={crossColorShades}
          setLab={setLab}
        />
        <ChromaChart id={`${shade.id}-colors`} shades={crossColorShades} />
        <HueChart id={`${shade.id}-colors`} shades={crossColorShades} />
      </div>
    </div>
  ) : null
}

export default Charts
