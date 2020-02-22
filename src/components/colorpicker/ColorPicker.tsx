import React from 'react'

import HuePicker from './HuePicker'
import ShadePicker from './ShadePicker'
import ColorInput from './ColorInput'
import {HSL} from '../../types/color'

import styles from './ColorPicker.module.css'

interface Props {
  hsl: HSL
  setHSL: (hsl: HSL) => void
}

const ColorPicker = ({hsl, setHSL}: Props) => {
  return (
    <div className={styles.container}>
      <HuePicker hsl={hsl} setHSL={setHSL} />
      <ShadePicker hsl={hsl} setHSL={setHSL} />
      <ColorInput hsl={hsl} setHSL={setHSL} />
    </div>
  )
}

export default ColorPicker
