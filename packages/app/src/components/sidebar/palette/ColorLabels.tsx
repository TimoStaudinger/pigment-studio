import React from 'react'
import classnames from 'classnames'
import {useHistory, useParams, generatePath} from 'react-router-dom'

import {Color} from '../../../types/color'
import Button from '../../common/Button'

import styles from './ColorLabels.module.css'

interface Props {
  colors: Color[]
  selectedColorIndex: number | null
}

const ColorLabels = ({colors, selectedColorIndex}: Props) => {
  let {paletteId, shadeIndex} = useParams()
  let history = useHistory()

  return (
    <div className={styles.labels}>
      {colors.map((color, colorIndex) => (
        <Button
          link
          className={classnames(styles.label, {
            [styles.selected]: selectedColorIndex === colorIndex
          })}
          text={color.name}
          onClick={() =>
            history.push(
              generatePath('/:paletteId?/:colorIndex?/:shadeIndex?/:view?', {
                paletteId,
                colorIndex,
                shadeIndex
              })
            )
          }
        />
      ))}
    </div>
  )
}

export default ColorLabels
