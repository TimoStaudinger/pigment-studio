import React from 'react'
import classnames from 'classnames'

import {HSL} from '../../types/color'

import styles from './ColorSample.module.css'

interface Props {
  hsl: HSL
  compact?: boolean
}

const ColorSample = ({hsl, compact}: Props) => (
  <div
    className={classnames(styles.sample, {[styles.compact]: compact})}
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
