import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'
import {Lab} from '@pigmentstudio/convert'
import {useLocalStorage} from 'react-use'

import {generateFromTemplate, generateBlank} from '../../util/sample'
import {Palette} from '../../types/color'
import EmptyState from '../common/EmptyState'
import Sidebar from '../sidebar/Sidebar'
import Workarea from '../workbench/Workbench'
import Preview from '../workbench/preview/Preview'
import Contrast from '../workbench/contrast/Contrast'
import Charts from '../workbench/charts/Charts'
import Header from '../header/Header'
import Splash from '../splash/Splash'
import Layout from './Layout'

import 'react-reflex/styles.css'

const App = () => {
  let {paletteId, ...params} = useParams()
  let colorIndex = params.colorIndex ? parseInt(params.colorIndex) : null
  let shadeIndex = params.shadeIndex ? parseInt(params.shadeIndex) : null

  let history = useHistory()

  const [showSplash, setShowSplash] = useState(!paletteId)

  const [palettes, setPalettes] = useLocalStorage<Palette[]>('palettes', [])

  const setLab = (
    lab: Lab,
    updatedColorIndex?: number,
    updatedShadeIndex?: number
  ) => {
    setPalettes((palettes) =>
      palettes.map((palette) =>
        paletteId === palette.id
          ? {
              ...palette,
              colors: palette.colors.map((color, currentColorIndex) =>
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
            }
          : palette
      )
    )
  }

  const setColorName = (name: string) =>
    setPalettes((palettes) =>
      palettes.map((palette) =>
        palette.id === paletteId
          ? {
              ...palette,
              colors: palette.colors.map((color, i) =>
                i === colorIndex
                  ? {
                      ...color,
                      name
                    }
                  : color
              )
            }
          : palette
      )
    )

  const setPaletteName = (name: string) =>
    setPalettes((palettes) =>
      palettes.map((palette) =>
        palette.id === paletteId ? {...palette, name} : palette
      )
    )

  const createNewPaletteFromTemplate = () => {
    let newPalette = generateFromTemplate()
    setPalettes((palettes) => [...palettes, newPalette])
    setShowSplash(false)
    history.push(`/${newPalette.id}`)
  }
  const createNewPaletteFromScratch = () => {
    let newPalette = generateBlank()
    setPalettes((palettes) => [...palettes, newPalette])
    setShowSplash(false)
    history.push(`/${newPalette.id}`)
  }
  const openPalette = (paletteId: string) => {
    setShowSplash(false)
    history.push(`/${paletteId}`)
  }
  const deletePalette = () =>
    setPalettes((palettes) =>
      palettes.filter((palette) => palette.id !== paletteId)
    )

  let palette = palettes.find((palette) => palette.id === paletteId) ?? null

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
        createNewPaletteFromTemplate={createNewPaletteFromTemplate}
        createNewPaletteFromScratch={createNewPaletteFromScratch}
        openPalette={openPalette}
        dismissSplash={() => setShowSplash(false)}
        palettes={palettes}
      />

      <Layout
        header={
          <Header
            showSplash={() => setShowSplash(true)}
            deletePalette={deletePalette}
          />
        }
      >
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
            {palette && shadeIndex !== null ? (
              <Workarea
                areas={[
                  [
                    'Charts',
                    <Charts colors={palette.colors} setLab={setLab} />
                  ],
                  ['Preview', <Preview colors={palette.colors} />],
                  ['Contrast', <Contrast colors={palette.colors} />]
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
