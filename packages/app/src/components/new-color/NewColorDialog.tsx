import React from 'react'
import {Dialog} from '@reach/dialog'
import {labToHex} from '@pigmentstudio/convert'

import Button from '../common/Button'
import colors from './colors'

import '@reach/dialog/styles.css'
import styles from './NewColorDialog.module.css'

interface Props {
  showNewColorDialog: boolean
  dismissNewColorDialog: () => void
}

console.log('fr', process.env.FAST_REFRESH)

const NewColorDialog = ({showNewColorDialog, dismissNewColorDialog}: Props) => (
  <Dialog
    isOpen={showNewColorDialog}
    onDismiss={dismissNewColorDialog}
    className={styles.dialog}
    aria-labelledby="new-color-header"
  >
    <h1 id="new-color-header">Add a new color</h1>
    <p className={styles.content}>
      <ul className={styles.palette}>
        {colors.map((color) => (
          <li
            style={{
              color: `#${labToHex(color.text)}`,
              backgroundColor: `#${labToHex(color.background)}`
            }}
            className={styles.paletteEntry}
          >
            {color.name}
          </li>
        ))}
      </ul>
    </p>
    <div className={styles.toolbar}>
      <div className={styles.toolbarSpacer} />
      <Button primary text="Add this color" />
    </div>
  </Dialog>
)

export default NewColorDialog
