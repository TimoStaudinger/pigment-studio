import React from 'react'

import Hint from './Hint'

import placeholder from './empty.png'
import styles from './EmptyState.module.css'

interface Props {
  hint?: string
}

const EmptyState = ({hint}: Props) => (
  <div className={styles.container}>
    <img
      className={styles.placeholder}
      src={placeholder}
      aria-hidden={true}
      alt="Placeholder"
    />

    {hint && <Hint className={styles.hint}>{hint}</Hint>}
  </div>
)

export default EmptyState
