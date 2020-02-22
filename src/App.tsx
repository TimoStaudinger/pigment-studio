import React from 'react'

import Palette from './components/palette/Palette'

import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.app}>
      <Palette />
    </div>
  )
}

export default App
