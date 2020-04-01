import React from 'react'

import styles from './Labels.module.css'

interface Props {
  labels: string[]
}

const Labels = ({labels}: Props) => (
  <div className={styles.labels}>
    <div className={styles.spacer}></div>
    {labels.map(label => (
      <div className={styles.label}>{label}</div>
    ))}
  </div>
)

export default Labels
