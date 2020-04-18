import React from 'react'
import {Lab} from '@pigmentstudio/convert'

import {Color, Shade} from '../../../types/color'
import Hint from '../../common/Hint'
import Labels from './Labels'
import LightnessChart from './LightnessChart'
import ChromaChart from './ChromaChart'
import HueChart from './HueChart'

import styles from './Charts.module.css'

interface Props {
  selectedColorIndex: number | null
  selectedShadeIndex: number | null
  colors: Color[]
  setLab: (lab: Lab, colorIndex: number, shadeIndex: number) => void
}

const Charts = ({
  colors,
  selectedColorIndex,
  selectedShadeIndex,
  setLab
}: Props) => {
  let color = selectedColorIndex !== null ? colors[selectedColorIndex] : null
  let shade =
    color && selectedShadeIndex !== null
      ? color.shades[selectedShadeIndex]
      : null

  let crossColorShades =
    selectedShadeIndex !== null &&
    colors.map((color) => color.shades[selectedShadeIndex])

  return color && shade && crossColorShades ? (
    <div>
      <div className={styles.container}>
        <div className={styles.column}>
          <Labels shades={color.shades} />
          <LightnessChart
            id={`shades-lightness`}
            shades={color.shades}
            setLab={(lab, shadeIndex) =>
              selectedColorIndex !== null &&
              setLab(lab, selectedColorIndex, shadeIndex)
            }
          />
          <ChromaChart
            id={`shades-chroma`}
            shades={color.shades}
            setLab={(lab, shadeIndex) =>
              selectedColorIndex !== null &&
              setLab(lab, selectedColorIndex, shadeIndex)
            }
          />
          <HueChart
            id={`shades-hue`}
            shades={color.shades}
            setLab={(lab, shadeIndex) =>
              selectedColorIndex !== null &&
              setLab(lab, selectedColorIndex, shadeIndex)
            }
          />
        </div>

        <div className={styles.column}>
          <Labels
            shades={
              colors
                .map((color) => [
                  color.name,
                  color.shades.find((s) => s.name === shade?.name)
                ])
                .filter(Boolean) as [string, Shade][]
            }
          />
          <LightnessChart
            id={`colors-lightness`}
            shades={crossColorShades}
            setLab={(lab, colorIndex) =>
              selectedShadeIndex !== null &&
              setLab(lab, colorIndex, selectedShadeIndex)
            }
          />
          <ChromaChart
            id={`colors-chroma`}
            shades={crossColorShades}
            setLab={(lab, colorIndex) =>
              selectedShadeIndex !== null &&
              setLab(lab, colorIndex, selectedShadeIndex)
            }
          />
          <HueChart
            id={'colors-hue'}
            shades={crossColorShades}
            setLab={(lab, colorIndex) =>
              selectedShadeIndex !== null &&
              setLab(lab, colorIndex, selectedShadeIndex)
            }
          />
        </div>
      </div>
      <Hint className={styles.hint}>
        You can use your mouse wheel to adjust values on a chart
      </Hint>
    </div>
  ) : null
}

export default Charts
