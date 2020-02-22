import React from 'react'

import {HSL} from '../../types/color'

import styles from './ColorSample.module.css'

interface Props {
  hsl: HSL
}

const ColorSample = ({hsl}: Props) => (
  <div
    className={styles.sample}
    style={{
      backgroundColor: `hsl(${hsl.hue}, ${Math.round(
        hsl.saturation * 100
      )}%, ${Math.round(hsl.lightness * 100)}%)`
    }}
  >
    &nbsp;
  </div>
)

export default ColorSample
