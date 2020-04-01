import React from 'react'

import {Color, Shade} from '../../../types/color'
import {Lab} from '../../../util/color'
import ColorInputs from './ColorInputs'

import styles from './Properties.module.css'
import ShadePicker from './ShadePicker'

interface Props {
  color: Color
  shade: Shade
  setLab: (shadeId: string, lab: Lab) => void
  setName: (name: string) => void
}

const Properties = ({color, shade, setLab, setName}: Props) => (
  <div>
    <h2 className={styles.header}>
      <input value={color.name} onChange={e => setName(e.target.value)} />
    </h2>

    <ColorInputs lab={shade.lab} setLab={lab => setLab(shade.id, lab)} />

    <ShadePicker lab={shade.lab} setLab={lab => setLab(shade.id, lab)} />
  </div>
)

export default Properties
