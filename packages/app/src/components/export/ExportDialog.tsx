import React from 'react'
import {Dialog} from '@reach/dialog'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {rainbow as theme} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {labToHex} from '@pigmentstudio/convert'

import Button from '../common/Button'
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
  return (
    <Dialog
      isOpen={showExportDialog}
      onDismiss={dismissExportDialog}
      className={styles.dialog}
      aria-labelledby="export-dialog-header"
    >
      <h1 id="export-dialog-header">Export</h1>

      <SyntaxHighlighter
        customStyle={{maxHeight: 400}}
        language="css"
        style={theme}
      >
        {colorsToCSSVars(selectedPalette.colors)}
      </SyntaxHighlighter>
      <div className={styles.toolbar}>
        <div className={styles.toolbarSpacer} />
        <Button primary text="Done" />
      </div>
    </Dialog>
  )
}

export default ExportDialog
