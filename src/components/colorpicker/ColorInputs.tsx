import React from 'react'

import {HSL} from '../../types/color'
import {convertHexToHSL, convertHSLToHex} from '../../util/color'
import ColorInput from './ColorInput'

import styles from './ColorInputs.module.css'

interface Props {
  hsl: HSL
  setHSL: (hsl: HSL) => void
}

const ColorInputs = ({hsl, setHSL}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <ColorInput
          label="Hex"
          value={convertHSLToHex(hsl)}
          onChange={hex => {
            try {
              setHSL(convertHexToHSL(hex))
              return true
            } catch (e) {
              return false
            }
          }}
        />
      </div>

      <div className={styles.column}>
        <ColorInput
          label="H"
          value={String(Math.round(hsl.hue))}
          onChange={hue => {
            let parsed = parseInt(hue)
            if (isNaN(parsed) || parsed < 0 || parsed > 359) return false
            else {
              setHSL({...hsl, hue: parsed})
              return true
            }
          }}
        />
        <ColorInput
          label="S"
          value={String(Math.round(hsl.saturation * 100))}
          onChange={saturation => {
            let parsed = parseInt(saturation)
            if (isNaN(parsed) || parsed < 0 || parsed > 99) return false
            else {
              setHSL({...hsl, saturation: parsed / 100})
              return true
            }
          }}
        />
        <ColorInput
          label="L"
          value={String(Math.round(hsl.lightness * 100))}
          onChange={lightness => {
            let parsed = parseInt(lightness)
            if (isNaN(parsed) || parsed < 0 || parsed > 99) return false
            else {
              setHSL({...hsl, lightness: parsed / 100})
              return true
            }
          }}
        />
      </div>
    </div>
  )
}

export default ColorInputs
