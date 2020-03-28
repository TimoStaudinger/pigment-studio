import React from 'react'
import classnames from 'classnames'
import {useDrag} from 'react-dnd'

import {Lab} from '../../types/color'

import styles from './Swatch.module.css'
import {convertLabToRGB} from '../../util/color'

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

  let {r, g, b} = convertLabToRGB(lab)

  return (
    <div
      ref={drag}
      className={classnames(styles.sample, {[styles.compact]: compact})}
      style={{
        opacity,
        backgroundColor: `rgb(${r}, ${g}, ${b})`
      }}
    />
  )
}

export default Swatch
