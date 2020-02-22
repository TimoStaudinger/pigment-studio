import React, {useState} from 'react'

import styles from './ColorPicker.module.css'
import HuePicker from './HuePicker'
import ShadePicker from './ShadePicker'
import ColorInput from './ColorInput'
import {convertHSLToHex, convertHexToHSL} from '../util/color'

const ColorPicker = () => {
  const [hue, setHue] = useState(250)
  const [saturation, setSaturation] = useState(0.5)
  const [lightness, setLightness] = useState(0.5)

  return (
    <div className={styles.container}>
      <HuePicker hue={hue} setHue={setHue} />
      <ShadePicker
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        setSaturation={setSaturation}
        setLightness={setLightness}
      />
      <ColorInput
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        setHue={setHue}
        setSaturation={setSaturation}
        setLightness={setLightness}
      />
    </div>
  )
}

export default ColorPicker
