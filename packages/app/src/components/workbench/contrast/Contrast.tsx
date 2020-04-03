import React from 'react'
import {labToRGB, Lab} from '@pigmentstudio/convert'

import {Color} from '../../types/color'

import styles from './Contrast.module.css'

interface Props {
  colors: Color[]
}

const Cell = ({fontLab, backgroundLab}: {fontLab: Lab; backgroundLab: Lab}) => {
  let fontRGB = labToRGB(fontLab)
  let backgroundRGB = labToRGB(backgroundLab)

  return (
    <td
      className={styles.cell}
      style={{
        color: `rgb(${fontRGB.r}, ${fontRGB.g}, ${fontRGB.b})`,
        backgroundColor: `rgb(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b})`
      }}
    >
      A
    </td>
  )
}

const Contrast = ({colors}: Props) => {
  let colorsFlat = colors
    .map(color => color.shades.map(shade => shade.lab))
    .flat()
  return (
    <div>
      <table cellSpacing={0}>
        {colorsFlat.map((lab, i) => (
          <tr>
            {colorsFlat.map(compareLab => (
              <Cell fontLab={compareLab} backgroundLab={lab} />
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Contrast
