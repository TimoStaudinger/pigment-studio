import React from 'react'

import {Palette} from '../../types/color'
import Button from '../common/Button'

import styles from './Toolbar.module.css'
import DocumentAdd from '../icons/DocumentAdd'
import Trash from '../icons/Trash'

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
        icon={<DocumentAdd />}
        text="New Palette"
      />
    </div>

    {selectedPalette ? (
      <div className={styles.toolbarItem}>
        <Button
          onClick={deletePalette}
          toolbar
          icon={<Trash />}
          text="Delete Palette"
        />
      </div>
    ) : null}
  </div>
)
export default Toolbar
