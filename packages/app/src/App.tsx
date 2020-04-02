import React, {useState} from 'react'
import Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {HashRouter as Router, Route} from 'react-router-dom'
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'
import {Lab} from '@pigmentstudio/convert'
import 'react-reflex/styles.css'

import {generatePalette} from './util/sample'
import {Color} from './types/color'
import Sidebar from './components/sidebar/Sidebar'
import Preview from './components/preview/Preview'
import Contrast from './components/contrast/Contrast'
import Workarea from './components/Workarea'
import Charts from './components/charts/Charts'
import Header from './components/header/Header'
import Layout from './Layout'

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
          <Layout header={<Header />}>
            <ReflexContainer orientation="vertical">
              <ReflexElement className="left-pane" size={600} minSize={400}>
                <Sidebar
                  colors={colors}
                  setColors={setColors}
                  setLab={setLab}
                />
              </ReflexElement>
              <ReflexSplitter />
              <ReflexElement className="right-pane" style={{height: 'auto'}}>
                <Workarea
                  areas={[
                    ['Charts', <Charts colors={colors} setLab={setLab} />],
                    ['Preview', <Preview colors={colors} />],
                    ['Contrast', <Contrast colors={colors} />]
                  ]}
                />
              </ReflexElement>
            </ReflexContainer>
          </Layout>
        </Route>
      </DndProvider>
    </Router>
  )
}

export default App
