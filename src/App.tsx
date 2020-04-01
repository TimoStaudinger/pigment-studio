import React, {useState} from 'react'
import Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {generatePalette} from './util/sample'
import {Lab} from './util/color'
import {Color} from './types/color'
import Sidebar from './components/sidebar/Sidebar'
import Preview from './components/preview/Preview'
import Contrast from './components/contrast/Contrast'
import Workarea from './components/Workarea'
import Charts from './components/charts/Charts'

import styles from './App.module.css'

const App = () => {
  const [colors, setColors] = useState<Color[]>(generatePalette())

  const setLab = (shadeId: string, lab: Lab) => {
    setColors(colors =>
      colors.map(color =>
        color.shades.some(shade => shade.id === shadeId)
          ? {
              ...color,
              shades: color.shades.map(shade =>
                shade.id === shadeId ? {...shade, lab: lab} : shade
              )
            }
          : color
      )
    )
  }

  return (
    <Router>
      <DndProvider backend={Backend}>
        <Route path="/:shadeId?/:view?">
          <div className={styles.app}>
            <Sidebar colors={colors} setColors={setColors} setLab={setLab} />

            <div className={styles.spacer} />

            <Workarea
              areas={[
                ['Charts', <Charts colors={colors} setLab={setLab} />],
                ['Preview', <Preview colors={colors} />],
                ['Contrast', <Contrast colors={colors} />]
              ]}
            />
          </div>
        </Route>
      </DndProvider>
    </Router>
  )
}

export default App
