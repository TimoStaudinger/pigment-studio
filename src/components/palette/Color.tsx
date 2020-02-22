import React, {useState} from 'react'
import {HSL} from '../../types/color'
import ColorPicker from '../colorpicker/ColorPicker'
import ColorHeader from './ColorHeader'

import styles from './Color.module.css'

interface Props {
  name: string
  hsl: HSL
  setName: (name: string) => void
  setHSL: (hsl: HSL) => void
  removeColor: () => void
}

const Color = ({name, hsl, setName, setHSL, removeColor}: Props) => {
  let [isExpanded, setExpanded] = useState(false)

  return (
    <div className={styles.color}>
      <ColorHeader
        name={name}
        hsl={hsl}
        setName={setName}
        removeColor={removeColor}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
      />
      {isExpanded && (
        <>
          <ColorPicker hsl={hsl} setHSL={setHSL} />
          <div className={styles.divider} />
        </>
      )}
    </div>
  )
}

export default Color
