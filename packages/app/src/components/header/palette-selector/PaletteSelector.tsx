import React from 'react'
import {
  ListboxOption,
  ListboxButton,
  ListboxInput,
  ListboxList,
  ListboxPopover
} from '@reach/listbox'

import {Palette} from '../../../types/color'
import SelectorIcon from '../../icons/Selector'

import '@reach/listbox/styles.css'
import styles from './PaletteSelector.module.css'

interface Props {
  palettes: Palette[]
  selectedPalette: Palette | null
  selectPalette: (paletteId: string) => void
  deselectPalette: () => void
}

const PaletteSelector = ({
  palettes,
  selectedPalette,
  selectPalette,
  deselectPalette
}: Props) => (
  <div className={styles.container}>
    <ListboxInput
      className={styles.selector}
      onChange={(paletteId) =>
        paletteId === '_' ? deselectPalette() : selectPalette(paletteId)
      }
    >
      <ListboxButton arrow={<SelectorIcon />}>
        {selectedPalette?.name || undefined}
      </ListboxButton>
      <ListboxPopover className={styles.popover}>
        <ListboxList className={styles.popoverList}>
          <ListboxOption className={styles.defaultOption} value="_">
            Choose a palette...
          </ListboxOption>

          {palettes.map((palette) => (
            <ListboxOption
              value={palette.id}
              key={palette.id}
              className={styles.option}
            >
              {palette.name}
            </ListboxOption>
          ))}
        </ListboxList>
      </ListboxPopover>
    </ListboxInput>
  </div>
)

export default PaletteSelector
