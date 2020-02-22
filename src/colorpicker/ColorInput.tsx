import React, {useState, useEffect} from 'react'

import styles from './ColorInput.module.css'
import {convertHSLToHex, convertHexToHSL} from '../util/color'
import {HSL} from '../types/color'

interface Props {
  hsl: HSL
  setHSL: (hsl: HSL) => void
}

const ColorInput = ({hsl, setHSL}: Props): JSX.Element => {
  const [buffer, setBuffer] = useState('')

  useEffect(() => {
    setBuffer(convertHSLToHex(hsl))
  }, [hsl])

  const handleChangeHex = (hex: string): void => {
    setBuffer(hex)

    console.log(hex)

    try {
      setHSL(convertHexToHSL(hex))
    } catch (e) {}
  }

  return (
    <div className={styles.container}>
      <input value={buffer} onChange={e => handleChangeHex(e.target.value)} />
    </div>
  )
}

export default ColorInput
