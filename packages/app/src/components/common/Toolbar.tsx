import React from 'react'

import styles from './Toolbar.module.css'

interface Props {
  children: React.ReactNode
}

const Toolbar = ({children}: Props) => (
  <div className={styles.toolbar}>{children}</div>
)

export default Toolbar
