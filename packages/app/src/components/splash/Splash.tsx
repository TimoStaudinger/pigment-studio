import React from 'react'
import {Dialog} from '@reach/dialog'

import Hint from '../common/Hint'
import Button from '../common/Button'
import {Palette} from '../../types/color'

import logo from './logo.png'
import '@reach/dialog/styles.css'
import styles from './Splash.module.css'
import {DateTime} from 'luxon'

interface Props {
  showSplash: boolean
  createNewPaletteFromTemplate: () => void
  createNewPaletteFromScratch: () => void
  openPalette: (paletteId: string) => void
  dismissSplash: () => void
  palettes: Palette[]
}

const Splash = ({
  showSplash,
  createNewPaletteFromTemplate,
  createNewPaletteFromScratch,
  openPalette,
  dismissSplash,
  palettes
}: Props) => (
  <Dialog
    isOpen={showSplash}
    onDismiss={dismissSplash}
    className={styles.dialog}
  >
    <div className={styles.content}>
      <img className={styles.logo} src={logo} alt="Pigment Studio" />

      <div className={styles.recent}>
        <div className={styles.recentHeader}>Recent:</div>
        <div className={styles.recentList}>
          {palettes
            .sort((a, b) => b.lastChanged - a.lastChanged)
            .slice(Math.max(palettes.length - 10, 0))
            .map((palette) => (
              <div>
                <Button
                  link
                  onClick={() => openPalette(palette.id)}
                  text={palette.name}
                />
                <span className={styles.recentLastChanged}>
                  last changed{' '}
                  {DateTime.fromMillis(palette.lastChanged).toRelative()}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
    <Hint className={styles.hint}>
      If you're not sure what to do, try starting with a template
    </Hint>
    <div className={styles.toolbar}>
      <div className={styles.toolbarSpacer} />
      <Button text="Import my colors" />
      <Button onClick={createNewPaletteFromScratch} text="Start from scratch" />
      <Button
        primary
        onClick={createNewPaletteFromTemplate}
        text="Start with a template"
      />
    </div>
  </Dialog>
)

export default Splash
