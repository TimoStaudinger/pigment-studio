import React from 'react'
import classnames from 'classnames'
import {useDrag} from 'react-dnd'

import {HSL} from '../../types/color'

import styles from './Swatch.module.css'

interface Props {
  hsl: HSL
  compact?: boolean
}

const Swatch = ({hsl, compact}: Props) => {
  const [{opacity}, drag] = useDrag({
    item: {type: 'color', ...hsl},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })
  return (
    <div
      ref={drag}
      className={classnames(styles.sample, {[styles.compact]: compact})}
      style={{
        opacity,
        backgroundColor: `hsl(${hsl.hue}, ${Math.round(
          hsl.saturation * 100
        )}%, ${Math.round(hsl.lightness * 100)}%)`
      }}
    />
  )
}

export default Swatch
