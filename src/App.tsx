import React from 'react'
//@ts-ignore
import SplitPane from 'react-split-pane'

import Palette from './components/palette/Palette'

import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.app}>
      <SplitPane split="vertical" defaultSize={350} minSize={250} maxSize={500}>
        <Palette />
        <div>Hello World</div>
      </SplitPane>
    </div>
  )
}

export default App
