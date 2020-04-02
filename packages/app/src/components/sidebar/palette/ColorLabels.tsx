import React from 'react'

import styles from './ColorLabels.module.css'
import {Color} from '../../../types/color'

interface Props {
  colors: Color[]
}

const ColorLabels = ({colors}: Props) => (
  <div className={styles.labels}>
    {colors.map(color => (
      <div className={styles.label}>{color.name}</div>
    ))}
  </div>
)

export default ColorLabels
