import React from 'react'

import {Lab, Shade} from '../../types/color'
import {getBaseShade} from '../../util/color'
import ShadePicker from './ShadePicker'

import styles from './ColorPicker.module.css'

interface Props {
  shades: Shade[]
  setLab: (lab: Lab) => void
}

const ColorPicker = ({shades, setLab}: Props) => {
  let baseShade = getBaseShade(shades)

  return (
    <div className={styles.container}>
      {/* <LightnessPicker
        lab={baseShade.lab}
        setLab={(lab: Lab) => {
          shades.forEach(shade => {
            setLab(shade.id, {...shade.lab, l: lab.l})
          })
        }}
      /> */}
      <ShadePicker lab={baseShade.lab} setLab={setLab} />
    </div>
  )
}

export default ColorPicker
