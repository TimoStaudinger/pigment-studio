import React from 'react'
import {Trash, ChevronRight, ChevronDown} from 'react-feather'

import styles from './ColorHeader.module.css'
import ColorSample from './ColorSample'
import {HSL} from '../../types/color'

interface Props {
  name: string
  hsl: HSL
  setName: (name: string) => void
  removeColor: () => void
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

const ColorHeader = ({
  name,
  hsl,
  setName,
  removeColor,
  isExpanded,
  setExpanded
}: Props) => (
  <div className={styles.header}>
    <button
      onClick={() => setExpanded(!isExpanded)}
      className={styles.expandButton}
    >
      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
    </button>

    <ColorSample hsl={hsl} />

    <input value={name} onChange={e => setName(e.target.value)} />

    <button onClick={removeColor} className={styles.removeButton}>
      <Trash size={14} />
    </button>
  </div>
)

export default ColorHeader
