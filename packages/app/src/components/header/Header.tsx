import React from 'react'

import logo from './logo.png'

import styles from './Header.module.css'

const Header = () => (
  <div className={styles.header}>
    <img src={logo} className={styles.logo} alt="Pigment Studio" />
    <div className={styles.title}>
      <span>PIGMENT</span>STUDIO
    </div>
  </div>
)

export default Header
