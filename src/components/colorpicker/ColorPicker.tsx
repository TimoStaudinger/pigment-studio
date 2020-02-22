import React from 'react'

import {HSL, Shade} from '../../types/color'
import {getBaseShade} from '../../util/color'
import HuePicker from './HuePicker'
import ShadePicker from './ShadePicker'
import ColorInputs from './ColorInputs'

import styles from './ColorPicker.module.css'

interface Props {
  shades: Shade[]
  setHSL: (id: string, hsl: HSL) => void
}

const ColorPicker = ({shades, setHSL}: Props) => {
  let baseShade = getBaseShade(shades)

  return (
    <div className={styles.container}>
      <HuePicker
        hsl={baseShade.hsl}
        setHSL={(hsl: HSL) => {
          shades.forEach(shade => {
            setHSL(shade.id, {...shade.hsl, hue: hsl.hue})
          })
        }}
      />
      <ShadePicker shades={shades} setHSL={setHSL} />
      {/* <ColorInputs hsl={hsl} setHSL={setHSL} /> */}
    </div>
  )
}

export default ColorPicker
