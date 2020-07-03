import React, {useEffect} from 'react'
import {useCopyToClipboard} from 'react-use'
import {Dialog} from '@reach/dialog'
import {labToHex} from '@pigmentstudio/convert'

import Button from '../common/Button'
import Code from '../common/Code'
import {Palette, Color} from '../../types/color'
import {nameToSlug} from '../../util/slug'

import '@reach/dialog/styles.css'
import styles from './ExportDialog.module.css'

const colorsToCSSVars = (colors: Color[]) =>
  colors
    .map((color) =>
      color.shades
        .map(
          (shade) =>
            `--${nameToSlug(color.name)}-${shade.name}: #${labToHex(
              shade.lab
            )};`
        )
        .join('\n')
    )
    .join('\n\n')

interface Props {
  selectedPalette: Palette
  showExportDialog: boolean
  dismissExportDialog: () => void
}

const ExportDialog = ({
  showExportDialog,
  dismissExportDialog,
  selectedPalette
}: Props) => {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()
  useEffect(() => {
    if (clipboardState.error) {
      console.log('failed to copy to clipboard', clipboardState.error)
    } else if (clipboardState.value) {
      console.log('copied to clipboard')
    }
  }, [clipboardState])

  return (
    <Dialog
      isOpen={showExportDialog}
      onDismiss={dismissExportDialog}
      className={styles.dialog}
      aria-labelledby="export-dialog-header"
    >
      <h1 id="export-dialog-header">Export</h1>

      <Code maxHeight={400} language="css">
        {colorsToCSSVars(selectedPalette.colors)}
      </Code>

      <div className={styles.toolbar}>
        <Button
          text="Copy Lab values to clipboard"
          onClick={() =>
            copyToClipboard(JSON.stringify(selectedPalette.colors, null, 2))
          }
        />
        <div className={styles.toolbarSpacer} />
        <Button
          text="Copy to clipboard"
          onClick={() =>
            copyToClipboard(colorsToCSSVars(selectedPalette.colors))
          }
        />
        <Button primary text="Done" onClick={dismissExportDialog} />
      </div>
    </Dialog>
  )
}

export default ExportDialog
