import React from 'react'

import {Shade} from '../../types/color'
import ColorSample from './ColorSample'

import styles from './ShadePreview.module.css'

interface Props {
  shades: Shade[]
}

const ShadePreview = ({shades}: Props) => (
  <div className={styles.container}>
    {shades.map(shade => (
      <ColorSample hsl={shade.hsl} compact />
    ))}
  </div>
)

export default ShadePreview
