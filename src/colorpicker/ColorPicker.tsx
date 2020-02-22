import React, {useState} from 'react'

import HuePicker from './HuePicker'
import ShadePicker from './ShadePicker'
import ColorInput from './ColorInput'
import {HSL} from '../types/color'

import styles from './ColorPicker.module.css'

const ColorPicker = () => {
  const [hsl, setHSL] = useState<HSL>({
    hue: 250,
    saturation: 0.5,
    lightness: 0.5
  })

  return (
    <div className={styles.container}>
      <HuePicker hsl={hsl} setHSL={setHSL} />
      <ShadePicker hsl={hsl} setHSL={setHSL} />
      <ColorInput hsl={hsl} setHSL={setHSL} />
    </div>
  )
}

export default ColorPicker
