import React from 'react'
import classnames from 'classnames'
import {Trash, ChevronRight} from 'react-feather'

import {Lab} from '../../../util/color'
import Swatch from './Swatch'

import styles from './ColorHeader.module.css'

interface Props {
  name: string
  lab: Lab
  setName: (name: string) => void
  removeColor: () => void
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
  compact?: boolean
  className?: string
}

const ColorHeader = ({
  name,
  lab: hsl,
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

    <Swatch lab={hsl} compact={compact} />

    <input value={name} onChange={e => setName(e.target.value)} />

    <button onClick={removeColor} className={styles.removeButton}>
      <Trash size={compact ? 10 : 14} />
    </button>
  </div>
)

export default ColorHeader
