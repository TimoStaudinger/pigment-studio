import React from 'react'
import {Trash} from 'react-feather'

import styles from './ColorHeader.module.css'
import ColorSample from './ColorSample'
import {HSL} from '../../types/color'

interface Props {
  name: string
  hsl: HSL
  setName: (name: string) => void
  removeColor: () => void
}

const ColorHeader = ({name, hsl, setName, removeColor}: Props) => (
  <div className={styles.header}>
    <ColorSample hsl={hsl} />

    <input value={name} onChange={e => setName(e.target.value)} />

    <button onClick={removeColor} className={styles.removeButton}>
      <Trash />
    </button>
  </div>
)

export default ColorHeader
