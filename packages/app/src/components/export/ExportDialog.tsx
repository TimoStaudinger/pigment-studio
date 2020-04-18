import React, {useEffect, useRef} from 'react'
import {Dialog} from '@reach/dialog'
import {labToHex} from '@pigmentstudio/convert'
// // @ts-ignore next-line
// import Refractor from 'react-refractor'
// // @ts-ignore next-line
// import css from 'refractor/lang/css'
// // import 'prismjs/themes/prism.css'
// import 'prismjs/themes/prism-dark.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {tomorrowNight} from 'react-syntax-highlighter/dist/esm/styles/hljs'

import Button from '../common/Button'
import {Palette, Color} from '../../types/color'
import {nameToSlug} from '../../util/slug'

import '@reach/dialog/styles.css'
import styles from './ExportDialog.module.css'

// Refractor.registerLanguage(css)

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
        customStyle={{fontFamily: 'Fira Mono', maxHeight: 400}}
        language="css"
        style={tomorrowNight}
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
