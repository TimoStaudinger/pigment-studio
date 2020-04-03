import React from 'react'
import {Dialog} from '@reach/dialog'

import Hint from '../common/Hint'
import Button from '../common/Button'
import {Palette} from '../../types/color'

import logo from './logo.png'
import '@reach/dialog/styles.css'
import styles from './Splash.module.css'

interface Props {
  showSplash: boolean
  createNewPaletteFromTemplate: () => void
  createNewPaletteFromScratch: () => void
  openPalette: (paletteId: string) => void
  palettes: Palette[]
}

const Splash = ({
  showSplash,
  createNewPaletteFromTemplate,
  createNewPaletteFromScratch,
  openPalette,
  palettes
}: Props) => (
  <Dialog
    isOpen={showSplash}
    onDismiss={createNewPaletteFromScratch}
    className={styles.dialog}
  >
    <div className={styles.content}>
      <img className={styles.logo} src={logo} alt="Pigment Studio" />

      <div className={styles.recent}>
        <div className={styles.recentHeader}>Recent:</div>
        <ul>
          {palettes.slice(Math.max(palettes.length - 10, 0)).map((palette) => (
            <li>
              <Button onClick={() => openPalette(palette.id)}>
                {palette.name} ({palette.id})
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Hint className={styles.hint}>
      If you're not sure what to do, try starting with a template
    </Hint>
    <div className={styles.toolbar}>
      <div className={styles.toolbarSpacer} />
      <Button>Import my colors</Button>
      <Button onClick={createNewPaletteFromScratch}>Start from scratch</Button>
      <Button primary onClick={createNewPaletteFromTemplate}>
        Start with a template
      </Button>
    </div>
  </Dialog>
)

export default Splash
