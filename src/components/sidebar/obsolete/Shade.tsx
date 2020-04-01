import React, {useState} from 'react'

import {Lab} from '../../../util/color'
import ColorHeader from './ColorHeader'
import ColorInputs from '../properties/ColorInputs'
import LightnessPicker from './LightnessPicker'

import styles from './Shade.module.css'

interface Props {
  name: string
  lab: Lab
  setName: (name: string) => void
  setLab: (hsl: Lab) => void
  removeShade: () => void
}

const Shade = ({name, lab, setLab, setName, removeShade}: Props) => {
  let [isExpanded, setExpanded] = useState(false)

  return (
    <div className={styles.color}>
      <ColorHeader
        compact
        name={name}
        lab={lab}
        setName={setName}
        removeColor={removeShade}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
      />
      {isExpanded && (
        <>
          <div className={styles.huePicker}>
            <LightnessPicker
              lab={lab}
              setLab={(updated: Lab) => setLab({...lab, l: updated.l})}
              // minLightness={Math.max(baseHue - 30, 0)}
              // maxLightness={Math.min(baseHue + 30, 359)}
              height={20}
              specificShade
            />
          </div>
          <ColorInputs lab={lab} setLab={setLab} />
        </>
      )}
    </div>
  )
}

export default Shade
