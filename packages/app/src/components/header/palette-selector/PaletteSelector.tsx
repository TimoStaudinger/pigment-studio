import React from 'react'
import {Listbox, ListboxOption} from '@reach/listbox'
import {useParams, useHistory} from 'react-router-dom'

import {Palette} from '../../../types/color'

import '@reach/listbox/styles.css'
import styles from './PaletteSelector.module.css'

interface Props {
  palettes: Palette[]
}

const PaletteSelector = ({palettes}: Props) => {
  let {paletteId} = useParams()
  let history = useHistory()

  let palette = palettes?.find((palette) => palette.id === paletteId) ?? null

  return palettes && palettes.length ? (
    <div className={styles.container}>
      <Listbox
        value={palette?.id}
        onChange={(paletteId) => history.push(`/${paletteId}`)}
        className={styles.selector}
      >
        {palettes.map((palette) => (
          <ListboxOption value={palette.id} key={palette.id}>
            {palette.name}
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  ) : null
}

export default PaletteSelector
