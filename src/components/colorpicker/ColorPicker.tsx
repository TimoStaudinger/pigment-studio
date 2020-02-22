import React from 'react'

import {HSL} from '../../types/color'
import HuePicker from './HuePicker'
import ShadePicker from './ShadePicker'
import ColorInputs from './ColorInputs'

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
      <ColorInputs hsl={hsl} setHSL={setHSL} />
    </div>
  )
}

export default ColorPicker
