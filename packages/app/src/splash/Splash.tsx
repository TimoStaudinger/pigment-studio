import React from 'react'
import {Dialog} from '@reach/dialog'

import '@reach/dialog/styles.css'
import styles from './Splash.module.css'
import logo from './logo.png'
import Hint from '../components/common/Hint'
import Button from '../components/common/Button'

interface Props {
  showSplash: boolean
  createNewFromTemplate: () => void
  createNewFromScratch: () => void
}

const Splash = ({
  showSplash,
  createNewFromTemplate,
  createNewFromScratch
}: Props) => (
  <Dialog
    isOpen={showSplash}
    onDismiss={createNewFromScratch}
    className={styles.dialog}
  >
    <div className={styles.content}>
      <img className={styles.logo} src={logo} alt="Pigment Studio" />

      <div className={styles.recent}>
        <div className={styles.recentHeader}>Recent:</div>
        <p>
          <i>None</i>
        </p>
      </div>
    </div>
    <Hint className={styles.hint}>
      If you're not sure what to do, try starting with a template
    </Hint>
    <div className={styles.toolbar}>
      <div className={styles.toolbarSpacer} />
      <Button>Import my colors</Button>
      <Button onClick={createNewFromScratch}>Start from scratch</Button>
      <Button primary onClick={createNewFromTemplate}>
        Start with a template
      </Button>
    </div>
  </Dialog>
)

export default Splash
