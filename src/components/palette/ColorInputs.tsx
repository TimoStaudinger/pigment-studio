import React from 'react'

import ColorInput from './ColorInput'
import {Lab} from '../../util/color'

import styles from './ColorInputs.module.css'

interface Props {
  lab: Lab
  setLab: (hsl: Lab) => void
}

const ColorInputs = ({lab, setLab}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {/* <ColorInput
          label="Hex"
          value={convertLabToHex(lab)}
          onChange={hex => {
            try {
              setLab(convertHexToHSL(hex))
              return true
            } catch (e) {
              return false
            }
          }}
        />*/}
      </div>

      <div className={styles.column}>
        <ColorInput
          label="L"
          allowMouseWheelChanges
          value={String(Math.round(lab.l))}
          onChange={l => {
            let parsed = parseInt(l)
            if (isNaN(parsed) || parsed < 0 || parsed > 100) return false
            else {
              setLab({...lab, l: parsed})
              return true
            }
          }}
        />
        <ColorInput
          label="a"
          allowMouseWheelChanges
          value={String(Math.round(lab.a))}
          onChange={a => {
            let parsed = parseInt(a)
            if (isNaN(parsed) || parsed < -128 || parsed > 127) return false
            else {
              setLab({...lab, a: parsed})
              return true
            }
          }}
        />
        <ColorInput
          label="b"
          allowMouseWheelChanges
          value={String(Math.round(lab.b))}
          onChange={b => {
            let parsed = parseInt(b)
            if (isNaN(parsed) || parsed < -128 || parsed > 127) return false
            else {
              setLab({...lab, b: parsed})
              return true
            }
          }}
        />
      </div>
    </div>
  )
}

export default ColorInputs
