import React from 'react'
import {Lab} from '@pigmentstudio/convert'

import {Palette as PaletteType} from '../../types/color'
import Palette from './palette/Palette'
import Picker from './picker/Picker'
import ShadeProperties from './shade-properties/ShadeProperties'
import ColorProperties from './color-properties/ColorProperties'

import styles from './Sidebar.module.css'

interface Props {
  selectedPalette: PaletteType | null
  selectedColorIndex: number | null
  selectedShadeIndex: number | null
  setColorName: (name: string) => void
  setPaletteName: (name: string) => void
  setLab: (lab: Lab) => void
  selectColor: (colorIndex: number, shadeIndex?: number) => void
  selectShade: (shadeIndex: number) => void
}

const Sidebar = ({
  selectedPalette,
  selectedColorIndex,
  selectedShadeIndex,
  setColorName,
  setPaletteName,
  setLab,
  selectColor,
  selectShade
}: Props) => (
  <div className={styles.container}>
    {selectedPalette && (
      <Palette
        paletteName={selectedPalette.name}
        colors={selectedPalette.colors}
        selectedColorIndex={selectedColorIndex}
        selectedShadeIndex={selectedShadeIndex}
        setPaletteName={setPaletteName}
        selectColor={selectColor}
        selectShade={selectShade}
      />
    )}

    {selectedPalette && selectedColorIndex !== null && (
      <ColorProperties
        color={selectedPalette.colors[selectedColorIndex]}
        setName={setColorName}
      />
    )}

    {selectedPalette &&
      selectedColorIndex !== null &&
      selectedShadeIndex !== null && (
        <>
          <ShadeProperties
            shade={
              selectedPalette.colors[selectedColorIndex].shades[
                selectedShadeIndex
              ]
            }
            setLab={setLab}
          />
          <Picker
            shade={
              selectedPalette.colors[selectedColorIndex].shades[
                selectedShadeIndex
              ]
            }
            setLab={setLab}
          />
        </>
      )}
  </div>
)

export default Sidebar
