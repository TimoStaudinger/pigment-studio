import React, {useState} from 'react'

import {HSL} from '../../types/color'
import ColorHeader from './ColorHeader'
import ColorInputs from './ColorInputs'
import HuePicker from '../colorpicker/HuePicker'

import styles from './Shade.module.css'

interface Props {
  name: string
  hsl: HSL
  setName: (name: string) => void
  setHSL: (hsl: HSL) => void
  removeShade: () => void
  baseHue: number
}

const Shade = ({name, baseHue, hsl, setHSL, setName, removeShade}: Props) => {
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
      {isExpanded && (
        <>
          <div className={styles.huePicker}>
            <HuePicker
              hsl={hsl}
              setHSL={(hsl: HSL) => setHSL({...hsl, hue: hsl.hue})}
              minHue={baseHue - 30}
              maxHue={baseHue + 30}
              height={20}
            />
          </div>
          <ColorInputs hsl={hsl} setHSL={setHSL} />
        </>
      )}
    </div>
  )
}

export default Shade
