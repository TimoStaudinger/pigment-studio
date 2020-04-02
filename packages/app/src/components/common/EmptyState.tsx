import React from 'react'
import {Coffee} from 'react-feather'

import styles from './EmptyState.module.css'
import Hint from './Hint'

const EmptyState = () => (
  <div className={styles.container}>
    <Coffee className={styles.icon} size={200} />
    <Hint className={styles.hint}>
      Select a shade in the palette to start designing your colors
    </Hint>
  </div>
)

export default EmptyState