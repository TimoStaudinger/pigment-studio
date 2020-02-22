import React, {useState} from 'react'
import {HSL} from '../../types/color'
import ColorHeader from './ColorHeader'

import styles from './Shade.module.css'
import ColorInputs from './ColorInputs'

interface Props {
  name: string
  hsl: HSL
  setName: (name: string) => void
  setHSL: (hsl: HSL) => void
  removeShade: () => void
}

const Shade = ({name, hsl, setHSL, setName, removeShade}: Props) => {
  let [isExpanded, setExpanded] = useState(false)

  return (
    <div className={styles.color}>
      <ColorHeader
        compact
        name={name}
        hsl={hsl}
        setName={setName}
        removeColor={removeShade}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
      />
      {isExpanded && <ColorInputs hsl={hsl} setHSL={setHSL} />}
    </div>
  )
}

export default Shade
