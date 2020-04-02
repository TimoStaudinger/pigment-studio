import React from 'react'

import styles from './Layout.module.css'

interface Props {
  header: React.ReactNode
  children: React.ReactNode
}

const Layout = ({header, children}: Props) => (
  <div className={styles.layout}>
    {header}

    <div className={styles.content}>{children}</div>
  </div>
)

export default Layout
