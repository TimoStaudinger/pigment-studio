import React from 'react'

import {Shade} from '../../types/color'
import Swatch from './Swatch'

import styles from './ShadePreview.module.css'

interface Props {
  shades: Shade[]
}

const ShadePreview = ({shades}: Props) => (
  <div className={styles.container}>
    {shades.map(shade => (
      <Swatch key={shade.id} hsl={shade.hsl} compact />
    ))}
  </div>
)

export default ShadePreview
