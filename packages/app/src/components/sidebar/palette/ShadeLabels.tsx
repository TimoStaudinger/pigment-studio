import React from 'react'
import classnames from 'classnames'

import Button from '../../common/Button'

import styles from './ShadeLabels.module.css'

interface Props {
  labels: string[]
  selectedShadeIndex: number | null
  selectShade: (shadeIndex: number) => void
}

const Labels = ({labels, selectedShadeIndex, selectShade}: Props) => (
  <div className={styles.labels}>
    {labels.map((label, shadeIndex) => (
      <Button
        link
        className={classnames(styles.label, {
          [styles.selected]: selectedShadeIndex === shadeIndex
        })}
        text={label}
        onClick={() => selectShade(shadeIndex)}
      />
    ))}
  </div>
)

export default Labels
