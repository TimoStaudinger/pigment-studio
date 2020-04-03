import React from 'react'
import {labToHex} from '@pigmentstudio/convert'

import {Shade} from '../../../types/color'

import styles from './Labels.module.css'

interface Props {
  shades: (Shade | [string, Shade])[]
}

const Labels = ({shades}: Props) => (
  <div className={styles.labels}>
    {shades.map((shade: Shade | [string, Shade]) => {
      let name = Array.isArray(shade) ? shade[0] : shade.name
      let lab = Array.isArray(shade) ? shade[1].lab : shade.lab

      return (
        <div className={styles.label}>
          {name}
          <div
            className={styles.sample}
            style={{backgroundColor: `#${labToHex(lab)}`}}
          ></div>
        </div>
      )
    })}
  </div>
)
export default Labels
