import React, {useState} from 'react'
//@ts-ignore
import SplitPane from 'react-split-pane'
import Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {generatePalette} from './util/sample'
import {Color} from './types/color'
import Palette from './components/palette/Palette'
import Preview from './components/preview/Preview'
import Contrast from './components/contrast/Contrast'

import styles from './App.module.css'
import Workarea from './components/Workarea'
import Charts from './components/charts/Charts'

const App = () => {
  const [colors, setColors] = useState<Color[]>(generatePalette())
  return (
    <Router>
      <DndProvider backend={Backend}>
        <div className={styles.app}>
          <Route path="/:shadeId?/:view?">
            <SplitPane
              split="vertical"
              defaultSize={350}
              minSize={250}
              maxSize={500}
            >
              <Palette colors={colors} setColors={setColors} />

              <Workarea
                areas={[
                  ['Charts', <Charts colors={colors} />],
                  ['Preview', <Preview colors={colors} />],
                  ['Contrast', <Contrast colors={colors} />]
                ]}
              ></Workarea>
            </SplitPane>
          </Route>
        </div>
      </DndProvider>
    </Router>
  )
}

export default App
