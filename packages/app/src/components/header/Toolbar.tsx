import React from 'react'
import {PlusCircle, Trash} from 'react-feather'

import {Palette} from '../../types/color'
import Button from '../common/Button'

import styles from './Toolbar.module.css'

interface Props {
  selectedPalette: Palette | null
  showSplash: () => void
  deletePalette: () => void
}

const Toolbar = ({selectedPalette, showSplash, deletePalette}: Props) => (
  <div className={styles.toolbar}>
    <div className={styles.toolbarItem}>
      <Button
        onClick={showSplash}
        toolbar
        icon={<PlusCircle size={22} />}
        text="New Palette"
      />
    </div>

    {selectedPalette ? (
      <div className={styles.toolbarItem}>
        <Button
          onClick={deletePalette}
          toolbar
          icon={<Trash size={22} />}
          text="Delete Palette"
        />
      </div>
    ) : null}
  </div>
)
export default Toolbar
