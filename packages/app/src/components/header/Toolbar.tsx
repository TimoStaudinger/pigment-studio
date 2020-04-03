import React from 'react'
import {PlusCircle, Trash} from 'react-feather'

import Button from '../common/Button'

import styles from './Toolbar.module.css'

interface Props {
  showSplash: () => void
  deletePalette: () => void
}

const Toolbar = ({showSplash, deletePalette}: Props) => (
  <div className={styles.toolbar}>
    <div className={styles.toolbarItem}>
      <Button
        onClick={showSplash}
        toolbar
        icon={<PlusCircle size={22} />}
        text="New Palette"
      />
    </div>

    <div className={styles.toolbarItem}>
      <Button
        onClick={deletePalette}
        toolbar
        icon={<Trash size={22} />}
        text="Delete Palette"
      />
    </div>
  </div>
)

export default Toolbar
