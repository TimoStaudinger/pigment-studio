import React, {useState, useEffect} from 'react'

import styles from './ColorInput.module.css'
import {convertHSLToHex, convertHexToHSL} from '../util/color'

interface Props {
  hue: number | null
  saturation: number | null
  lightness: number | null
  setHue: (hue: number) => void
  setSaturation: (saturation: number) => void
  setLightness: (lightness: number) => void
}

const ColorInput = ({
  hue,
  saturation,
  lightness,
  setHue,
  setSaturation,
  setLightness
}: Props): JSX.Element => {
  const [buffer, setBuffer] = useState('')

  useEffect(() => {
    if (hue !== null && saturation !== null && lightness !== null) {
      setBuffer(convertHSLToHex(hue, saturation, lightness))
    } else {
      setBuffer('')
    }
  }, [hue, saturation, lightness])

  const handleChangeHex = (hex: string): void => {
    setBuffer(hex)

    console.log(hex)

    try {
      let [h, s, l] = convertHexToHSL(hex)
      console.log([h, s, l])
      setHue(h)
      setSaturation(s)
      setLightness(l)
    } catch (e) {}
  }

  return (
    <div className={styles.container}>
      <input value={buffer} onChange={e => handleChangeHex(e.target.value)} />
    </div>
  )
}

export default ColorInput
