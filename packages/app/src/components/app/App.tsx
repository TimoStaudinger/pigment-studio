import React, {useState, useEffect} from 'react'
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'

import useSelection from '../../util/useSelection'
import usePalettes from '../../util/usePalettes'
import EmptyState from '../common/EmptyState'
import Sidebar from '../sidebar/Sidebar'
import Workarea from '../workbench/Workbench'
import Charts from '../workbench/charts/Charts'
import Header from '../header/Header'
import Splash from '../splash/Splash'
import Layout from './Layout'
import NewColorDialog from '../new-color/NewColorDialog'
import ExportDialog from '../export/ExportDialog'

import 'react-reflex/styles.css'
import {Color} from '../../types/color'

const App = () => {
  let {
    paletteId,
    selectedColorIndex,
    selectedShadeIndex,
    selectedView,
    selectPalette,
    selectColor,
    selectShade,
    selectView,
    deselectPalette,
    deselectColor,
    deselectShade
  } = useSelection()

  const [showSplash, setShowSplash] = useState(!paletteId)
  const [showNewColorDialog, setShowNewColorDialog] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)

  const {
    palettes,
    selectedPalette,
    createNewPaletteFromScratch,
    createNewPaletteFromTemplate,
    deletePalette,
    setPaletteName,
    setColorName,
    setLab,
    addColor
  } = usePalettes(paletteId, selectedColorIndex, selectedShadeIndex)

  useEffect(() => {
    if (paletteId !== null && selectedPalette === null) deselectPalette()
    else if (selectedPalette) {
      if (
        selectedColorIndex !== null &&
        selectedColorIndex >= selectedPalette.colors.length
      )
        deselectColor()
      else if (
        selectedColorIndex !== null &&
        selectedShadeIndex !== null &&
        selectedShadeIndex >=
          selectedPalette.colors[selectedColorIndex].shades.length
      )
        deselectShade()
    }
  })

  const newPaletteFromTemplate = () => {
    let paletteId = createNewPaletteFromTemplate()
    selectPalette(paletteId)
    setShowSplash(false)
  }
  const newPaletteFromScratch = () => {
    let paletteId = createNewPaletteFromScratch()
    selectPalette(paletteId)
    setShowSplash(false)
  }
  const openPalette = (paletteId: string) => {
    selectPalette(paletteId)
    setShowSplash(false)
  }

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

      <NewColorDialog
        showNewColorDialog={showNewColorDialog}
        dismissNewColorDialog={() => setShowNewColorDialog(false)}
        addColor={(color: Color) => {
          setShowNewColorDialog(false)
          addColor(color)
        }}
      />

      {selectedPalette !== null && (
        <ExportDialog
          showExportDialog={showExportDialog}
          dismissExportDialog={() => setShowExportDialog(false)}
          selectedPalette={selectedPalette}
        />
      )}

      <Layout
        header={
          <Header
            palettes={palettes}
            selectedPalette={selectedPalette}
            showSplash={() => setShowSplash(true)}
            selectPalette={selectPalette}
            deselectPalette={deselectPalette}
            deletePalette={deletePalette}
            exportPalette={() => setShowExportDialog(true)}
          />
        }
      >
        {selectedPalette ? (
          <ReflexContainer orientation="vertical" windowResizeAware>
            <ReflexElement className="left-pane" size={600} minSize={400}>
              <Sidebar
                selectedPalette={selectedPalette}
                selectedColorIndex={selectedColorIndex}
                selectedShadeIndex={selectedShadeIndex}
                setColorName={setColorName}
                setPaletteName={setPaletteName}
                setLab={setLab}
                selectColor={selectColor}
                selectShade={selectShade}
                showNewColorDialog={() => setShowNewColorDialog(true)}
              />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement className="right-pane" style={{height: 'auto'}}>
              {selectedShadeIndex !== null ? (
                <Workarea
                  selectedView={selectedView}
                  selectView={selectView}
                  views={[
                    [
                      'Charts',
                      <Charts
                        colors={selectedPalette.colors}
                        selectedColorIndex={selectedColorIndex}
                        selectedShadeIndex={selectedShadeIndex}
                        setLab={setLab}
                      />
                    ]
                    // ['Preview', <Preview colors={selectedPalette.colors} />]
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
