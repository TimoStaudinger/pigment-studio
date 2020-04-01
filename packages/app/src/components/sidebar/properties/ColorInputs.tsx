import React from 'react'
import {Lab, labToRGB, RGB_MIN, RGB_MAX, rgbToLab} from '@pigmentstudio/convert'

import ColorInput from './ColorInput'

import styles from './ColorInputs.module.css'

interface Props {
  lab: Lab
  setLab: (lab: Lab) => void
}

const ColorInputs = ({lab, setLab}: Props) => {
  let rgb = labToRGB(lab, true)
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <ColorInput
          label="R"
          allowMouseWheelChanges
          value={rgb ? String(rgb.r) : ''}
          onChange={r => {
            if (rgb === null) return false

            let parsed = parseInt(r)
            if (isNaN(parsed) || parsed < RGB_MIN || parsed > RGB_MAX)
              return false
            else {
              setLab(rgbToLab({...rgb, r: parsed}))
              return true
            }
          }}
        />
        <ColorInput
          label="G"
          allowMouseWheelChanges
          value={rgb ? String(rgb.g) : ''}
          onChange={g => {
            if (rgb === null) return false

            let parsed = parseInt(g)
            if (isNaN(parsed) || parsed < RGB_MIN || parsed > RGB_MAX)
              return false
            else {
              setLab(rgbToLab({...rgb, g: parsed}))
              return true
            }
          }}
        />
        <ColorInput
          label="B"
          allowMouseWheelChanges
          value={rgb ? String(rgb.b) : ''}
          onChange={b => {
            if (rgb === null) return false

            let parsed = parseInt(b)
            if (isNaN(parsed) || parsed < RGB_MIN || parsed > RGB_MAX)
              return false
            else {
              setLab(rgbToLab({...rgb, b: parsed}))
              return true
            }
          }}
        />
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
