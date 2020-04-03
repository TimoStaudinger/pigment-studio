import React from 'react'

import Toolbar from './Toolbar'

import logo from './logo.png'
import styles from './Header.module.css'

interface Props {
  showSplash: () => void
  deletePalette: () => void
}

const Header = ({showSplash, deletePalette}: Props) => (
  <div className={styles.header}>
    <img src={logo} className={styles.logo} alt="Pigment Studio" />

    <div className={styles.title}>
      <span>PIGMENT</span>STUDIO
    </div>

    <Toolbar showSplash={showSplash} deletePalette={deletePalette} />
  </div>
)

export default Header
