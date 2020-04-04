import React from 'react'
import {Listbox, ListboxOption} from '@reach/listbox'
import {Palette} from '../../../types/color'

import '@reach/listbox/styles.css'
import styles from './PaletteSelector.module.css'

interface Props {
  palettes: Palette[]
  selectedPalette: Palette | null
  selectPalette: (paletteId: string) => void
}

const PaletteSelector = ({palettes, selectedPalette, selectPalette}: Props) => (
  <div className={styles.container}>
    <Listbox
      value={selectedPalette?.id}
      onChange={selectPalette}
      className={styles.selector}
    >
      {palettes.map((palette) => (
        <ListboxOption value={palette.id} key={palette.id}>
          {palette.name}
        </ListboxOption>
      ))}
    </Listbox>
  </div>
)

export default PaletteSelector
