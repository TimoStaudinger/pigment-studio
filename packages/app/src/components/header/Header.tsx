import React from 'react'

import {Palette} from '../../types/color'
import Actions from './Actions'
import PaletteSelector from './palette-selector/PaletteSelector'

import logo from './logo.png'
import styles from './Header.module.css'

interface Props {
  palettes: Palette[]
  selectedPalette: Palette | null
  showSplash: () => void
  selectPalette: (paletteId: string) => void
  deselectPalette: () => void
  deletePalette: () => void
  exportPalette: () => void
}

const Header = ({
  palettes,
  selectedPalette,
  showSplash,
  selectPalette,
  deselectPalette,
  deletePalette,
  exportPalette
}: Props) => (
  <div className={styles.header}>
    <img src={logo} className={styles.logo} alt="Pigment Studio" />

    <div className={styles.title}>
      <span>PIGMENT</span>STUDIO
    </div>

    <PaletteSelector
      palettes={palettes}
      selectedPalette={selectedPalette}
      selectPalette={selectPalette}
      deselectPalette={deselectPalette}
    />

    <Actions
      selectedPalette={selectedPalette}
      showSplash={showSplash}
      deletePalette={deletePalette}
      exportPalette={exportPalette}
    />
  </div>
)

export default Header
