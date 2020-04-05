import React from 'react'
import {Dialog} from '@reach/dialog'

import Button from '../common/Button'

import '@reach/dialog/styles.css'
import styles from './NewColorDialog.module.css'

interface Props {
  showNewColorDialog: boolean
  dismissNewColorDialog: () => void
}

const NewColorDialog = ({showNewColorDialog, dismissNewColorDialog}: Props) => (
  <Dialog
    isOpen={showNewColorDialog}
    onDismiss={dismissNewColorDialog}
    className={styles.dialog}
  >
    <h1>Add a new color</h1>
    <p className={styles.content}>New color!</p>
    <div className={styles.toolbar}>
      <div className={styles.toolbarSpacer} />
      <Button primary text="Add this color" />
    </div>
  </Dialog>
)

export default NewColorDialog
