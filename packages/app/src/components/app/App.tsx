import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'

import usePalettes from '../../util/usePalettes'
import EmptyState from '../common/EmptyState'
import Sidebar from '../sidebar/Sidebar'
import Workarea from '../workbench/Workbench'
import Preview from '../workbench/preview/Preview'
import Charts from '../workbench/charts/Charts'
import Header from '../header/Header'
import Splash from '../splash/Splash'
import Layout from './Layout'

import 'react-reflex/styles.css'

const App = () => {
  let params = useParams<{
    paletteId?: string
    colorIndex?: string
    shadeIndex?: string
    view?: string
  }>()
  let paletteId = params.paletteId ?? null
  let colorIndex = params.colorIndex ? parseInt(params.colorIndex) : null
  let shadeIndex = params.shadeIndex ? parseInt(params.shadeIndex) : null

  let history = useHistory()

  const [showSplash, setShowSplash] = useState(!paletteId)

  const {
    palettes,
    palette,
    createNewPaletteFromScratch,
    createNewPaletteFromTemplate,
    deletePalette,
    setPaletteName,
    setColorName,
    setLab
  } = usePalettes(paletteId, colorIndex, shadeIndex)

  const newPaletteFromTemplate = () => {
    let paletteId = createNewPaletteFromTemplate()
    setShowSplash(false)
    history.push(`/${paletteId}`)
  }
  const newPaletteFromScratch = () => {
    let paletteId = createNewPaletteFromScratch()
    setShowSplash(false)
    history.push(`/${paletteId}`)
  }
  const openPalette = (paletteId: string) => {
    setShowSplash(false)
    history.push(`/${paletteId}`)
  }

  useEffect(() => {
    if (paletteId && !palette) {
      history.push('/')
      return
    } else if (palette) {
      if (colorIndex !== null && colorIndex >= palette.colors.length) {
        history.push(`/${paletteId}`)
        return
      }

      if (
        colorIndex !== null &&
        shadeIndex !== null &&
        palette.colors[colorIndex].shades.length <= shadeIndex
      ) {
        history.push(`/${paletteId}/${colorIndex}`)
      }
    }
  })

  return (
    <>
      <Splash
        showSplash={showSplash}
        createNewPaletteFromTemplate={newPaletteFromTemplate}
        createNewPaletteFromScratch={newPaletteFromScratch}
        openPalette={openPalette}
        dismissSplash={() => setShowSplash(false)}
        palettes={palettes}
      />

      <Layout
        header={
          <Header
            palettes={palettes}
            showSplash={() => setShowSplash(true)}
            deletePalette={deletePalette}
          />
        }
      >
        {palette ? (
          <ReflexContainer orientation="vertical" windowResizeAware>
            <ReflexElement className="left-pane" size={600} minSize={400}>
              <Sidebar
                palette={palette}
                setColorName={setColorName}
                setPaletteName={setPaletteName}
                setLab={setLab}
              />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement className="right-pane" style={{height: 'auto'}}>
              {shadeIndex !== null ? (
                <Workarea
                  areas={[
                    [
                      'Charts',
                      <Charts colors={palette.colors} setLab={setLab} />
                    ],
                    ['Preview', <Preview colors={palette.colors} />]
                    // ['Contrast', <Contrast colors={palette.colors} />]
                  ]}
                />
              ) : (
                <EmptyState hint="Select a shade in the palette to start designing your colors" />
              )}
            </ReflexElement>
          </ReflexContainer>
        ) : (
          <EmptyState hint="Select or create a new palette to begin" />
        )}
      </Layout>
    </>
  )
}

export default App
