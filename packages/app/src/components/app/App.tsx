import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'
import {Lab} from '@pigmentstudio/convert'
import 'react-reflex/styles.css'

import {generatePalette} from '../../util/sample'
import {Color} from '../../types/color'
import EmptyState from '../common/EmptyState'
import Sidebar from '../sidebar/Sidebar'
import Workarea from '../workbench/Workbench'
import Preview from '../workbench/preview/Preview'
import Contrast from '../workbench/contrast/Contrast'
import Charts from '../workbench/charts/Charts'
import Header from '../header/Header'
import Splash from '../splash/Splash'
import Layout from './Layout'

const App = () => {
  let {paletteId, ...params} = useParams()
  let colorIndex = params.colorIndex ? parseInt(params.colorIndex) : null
  let shadeIndex = params.shadeIndex ? parseInt(params.shadeIndex) : null

  let history = useHistory()

  const [showSplash, setShowSplash] = useState(true)

  const [colors, setColors] = useState<Color[]>([])

  const setLab = (
    lab: Lab,
    updatedColorIndex?: number,
    updatedShadeIndex?: number
  ) => {
    setColors(colors =>
      colors.map((color, currentColorIndex) =>
        currentColorIndex === (updatedColorIndex ?? colorIndex)
          ? {
              ...color,
              shades: color.shades.map((shade, currentShadeIndex) =>
                currentShadeIndex === (updatedShadeIndex ?? shadeIndex)
                  ? {...shade, lab: lab}
                  : shade
              )
            }
          : color
      )
    )
  }

  const createNewFromTemplate = () => {
    setColors(generatePalette())
    setShowSplash(false)
    history.push('/foo')
  }
  const createNewFromScratch = () => {
    setColors([])
    setShowSplash(false)
    history.push('/foo')
  }

  useEffect(() => {
    if (colorIndex !== null && colorIndex >= colors.length) {
      history.push(`/${paletteId}`)
      return
    }

    if (
      colorIndex !== null &&
      shadeIndex !== null &&
      colors[colorIndex].shades.length <= shadeIndex
    ) {
      history.push(`/${paletteId}/${colorIndex}`)
    }
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
            {shadeIndex !== null ? (
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
