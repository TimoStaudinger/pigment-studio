import React from 'react'

import {Palette} from '../../types/color'
import Toolbar from './Toolbar'

import logo from './logo.png'
import styles from './Header.module.css'
import PaletteSelector from './palette-selector/PaletteSelector'

interface Props {
  palettes: Palette[]
  selectedPalette: Palette | null
  showSplash: () => void
  selectPalette: (paletteId: string) => void
  deletePalette: () => void
}

const Header = ({
  palettes,
  selectedPalette,
  showSplash,
  selectPalette,
  deletePalette
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
    />

    <Toolbar
      selectedPalette={selectedPalette}
      showSplash={showSplash}
      deletePalette={deletePalette}
    />
  </div>
)

export default Header
