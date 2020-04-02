import React, {useState} from 'react'
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
import Splash from './splash/Splash'
import {useParams, useHistory} from 'react-router-dom'
import EmptyState from './components/common/EmptyState'
import {useEffect} from 'react'

const App = () => {
  let {shadeId} = useParams()
  let history = useHistory()

  const [showSplash, setShowSplash] = useState(true)

  const [colors, setColors] = useState<Color[]>([])

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

  const createNewFromTemplate = () => {
    setColors(generatePalette())
    setShowSplash(false)
  }
  const createNewFromScratch = () => {
    setColors([])
    setShowSplash(false)
  }

  let selectedColor = colors.find(color =>
    color.shades.some(shade => shade.id === shadeId)
  )

  useEffect(() => {
    if (shadeId && !selectedColor) history.push('/')
  })

  return (
    <>
      <Splash
        showSplash={showSplash}
        createNewFromTemplate={createNewFromTemplate}
        createNewFromScratch={createNewFromScratch}
      />

      <Layout header={<Header />}>
        <ReflexContainer orientation="vertical" windowResizeAware>
          <ReflexElement className="left-pane" size={600} minSize={400}>
            <Sidebar colors={colors} setColors={setColors} setLab={setLab} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement className="right-pane" style={{height: 'auto'}}>
            {shadeId ? (
              <Workarea
                areas={[
                  ['Charts', <Charts colors={colors} setLab={setLab} />],
                  ['Preview', <Preview colors={colors} />],
                  ['Contrast', <Contrast colors={colors} />]
                ]}
              />
            ) : (
              <EmptyState />
            )}
          </ReflexElement>
        </ReflexContainer>
      </Layout>
    </>
  )
}

export default App
