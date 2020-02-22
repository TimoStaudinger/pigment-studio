import React from 'react'
import {HSL} from '../../types/color'
import ColorPicker from '../colorpicker/ColorPicker'
import ColorHeader from './ColorHeader'

import styles from './Color.module.css'

interface Props {
  name: string
  hsl: HSL
  setName: (name: string) => void
  setHSL: (hsl: HSL) => void
  removeColor: () => void
}

const Color = ({name, hsl, setName, setHSL, removeColor}: Props) => (
  <div className={styles.color}>
    <ColorHeader
      name={name}
      hsl={hsl}
      setName={setName}
      removeColor={removeColor}
    />
    <ColorPicker hsl={hsl} setHSL={setHSL} />
  </div>
)

export default Color
