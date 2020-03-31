import React from 'react'
import classnames from 'classnames'
import {useDrag} from 'react-dnd'

import {labToRGB, Lab} from '../../util/color'

import styles from './Swatch.module.css'

interface Props {
  lab: Lab
  compact?: boolean
}

const Swatch = ({lab, compact}: Props) => {
  const [{opacity}, drag] = useDrag({
    item: {type: 'color', ...lab},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })

  let rgb = labToRGB(lab)

  return (
    <div
      ref={drag}
      className={classnames(styles.sample, {[styles.compact]: compact})}
      style={{
        opacity,
        backgroundColor: `rgb(${rgb?.r ?? 255}, ${rgb?.g ?? 0}, ${rgb?.b ?? 0})`
      }}
    />
  )
}

export default Swatch
