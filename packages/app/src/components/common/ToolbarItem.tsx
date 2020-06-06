import React from 'react'

import styles from './ToolbarItem.module.css'

interface Props {
  children: React.ReactNode
}

const ToolbarItem = ({children}: Props) => (
  <div className={styles.toolbarItem}>{children}</div>
)

export default ToolbarItem
