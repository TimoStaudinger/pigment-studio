import React from 'react'
import classnames from 'classnames'
import {Trash, ChevronRight} from 'react-feather'

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
  compact?: boolean
  className?: string
}

const ColorHeader = ({
  name,
  hsl,
  setName,
  removeColor,
  isExpanded,
  setExpanded,
  compact,
  className
}: Props) => (
  <div
    className={classnames(styles.header, className, {
      [styles.compact]: compact
    })}
  >
    <button
      onClick={() => setExpanded(!isExpanded)}
      className={styles.expandButton}
    >
      <ChevronRight
        size={14}
        className={classnames({[styles.expanded]: isExpanded})}
      />
    </button>

    <ColorSample hsl={hsl} compact={compact} />

    <input value={name} onChange={e => setName(e.target.value)} />

    <button onClick={removeColor} className={styles.removeButton}>
      <Trash size={compact ? 10 : 14} />
    </button>
  </div>
)

export default ColorHeader
