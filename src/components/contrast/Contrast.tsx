import React from 'react'
import {Color, HSL} from '../../types/color'

import styles from './Contrast.module.css'

interface Props {
  colors: Color[]
}

const Cell = ({fontHSL, backgroundHSL}: {fontHSL: HSL; backgroundHSL: HSL}) => (
  <td
    className={styles.cell}
    style={{
      color: `hsl(${fontHSL.hue}, ${Math.round(
        fontHSL.saturation * 100
      )}%, ${Math.round(fontHSL.lightness * 100)}%)`,
      backgroundColor: `hsl(${backgroundHSL.hue}, ${Math.round(
        backgroundHSL.saturation * 100
      )}%, ${Math.round(backgroundHSL.lightness * 100)}%)`
    }}
  >
    A
  </td>
)

const Contrast = ({colors}: Props) => {
  let colorsFlat = colors
    .map(color => color.shades.map(shade => shade.hsl))
    .flat()
  return (
    <div>
      <table cellSpacing={0}>
        {colorsFlat.map((hsl, i) => (
          <tr>
            {colorsFlat.map(compareHSL => (
              <Cell fontHSL={compareHSL} backgroundHSL={hsl} />
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Contrast
