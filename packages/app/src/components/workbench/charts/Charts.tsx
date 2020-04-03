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
  setLab: (lab: Lab, colorIndex: number, shadeIndex: number) => void
}

const Charts = ({colors, setLab}: Props) => {
  let {paletteId, ...params} = useParams()
  let colorIndex = params.colorIndex ? parseInt(params.colorIndex) : null
  let shadeIndex = params.shadeIndex ? parseInt(params.shadeIndex) : null

  let color = colorIndex !== null ? colors[colorIndex] : null
  let shade = color && shadeIndex !== null ? color.shades[shadeIndex] : null

  let crossColorShades = (shadeIndex &&
    colors.map(color => color.shades[shadeIndex as number])) as Shade[]

  return color && shade && crossColorShades ? (
    <div className={styles.container}>
      <div className={styles.column}>
        <Labels shades={color.shades} />
        <LightnessChart
          id={`shades-lightness`}
          shades={color.shades}
          setLab={(lab, shadeIndex) =>
            setLab(lab, colorIndex as number, shadeIndex)
          }
        />
        <ChromaChart
          id={`shades-chroma`}
          shades={color.shades}
          setLab={(lab, shadeIndex) =>
            setLab(lab, colorIndex as number, shadeIndex)
          }
        />
        <HueChart
          id={`shades-hue`}
          shades={color.shades}
          setLab={(lab, shadeIndex) =>
            setLab(lab, colorIndex as number, shadeIndex)
          }
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
          id={`colors-lightness`}
          shades={crossColorShades}
          setLab={(lab, colorIndex) =>
            setLab(lab, colorIndex, shadeIndex as number)
          }
        />
        <ChromaChart
          id={`colors-chroma`}
          shades={crossColorShades}
          setLab={(lab, colorIndex) =>
            setLab(lab, colorIndex, shadeIndex as number)
          }
        />
        <HueChart
          id={'colors-hue'}
          shades={crossColorShades}
          setLab={(lab, colorIndex) =>
            setLab(lab, colorIndex, shadeIndex as number)
          }
        />
      </div>
    </div>
  ) : null
}

export default Charts
