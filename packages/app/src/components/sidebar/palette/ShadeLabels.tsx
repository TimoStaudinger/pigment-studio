import React from 'react'

import styles from './ShadeLabels.module.css'

interface Props {
  labels: string[]
}

const Labels = ({labels}: Props) => (
  <div className={styles.labels}>
    {labels.map(label => (
      <div className={styles.label}>{label}</div>
    ))}
  </div>
)

export default Labels
