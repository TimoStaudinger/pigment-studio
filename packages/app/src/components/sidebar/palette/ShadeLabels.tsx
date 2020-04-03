import React from 'react'
import classnames from 'classnames'
import {useParams, useHistory, generatePath} from 'react-router-dom'

import Button from '../../common/Button'

import styles from './ShadeLabels.module.css'

interface Props {
  labels: string[]
  selectedShadeIndex: number | null
}

const Labels = ({labels, selectedShadeIndex}: Props) => {
  let {paletteId, colorIndex} = useParams()
  let history = useHistory()

  return (
    <div className={styles.labels}>
      {labels.map((label, shadeIndex) => (
        <Button
          link
          className={classnames(styles.label, {
            [styles.selected]: selectedShadeIndex === shadeIndex
          })}
          text={label}
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
export default Labels
