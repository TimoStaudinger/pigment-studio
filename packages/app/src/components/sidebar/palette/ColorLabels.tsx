import React from 'react'
import classnames from 'classnames'

import {Color} from '../../../types/color'
import Button from '../../common/Button'

import styles from './ColorLabels.module.css'

interface Props {
  colors: Color[]
  selectColor: (colorIndex: number) => void
  selectedColorIndex: number | null
}

const ColorLabels = ({colors, selectColor, selectedColorIndex}: Props) => {
  return (
    <div className={styles.labels}>
      {colors.map((color, colorIndex) => (
        <Button
          key={color.name}
          link
          className={classnames(styles.label, {
            [styles.selected]: selectedColorIndex === colorIndex
          })}
          text={color.name}
          onClick={() => selectColor(colorIndex)}
        />
      ))}
    </div>
  )
}

export default ColorLabels
