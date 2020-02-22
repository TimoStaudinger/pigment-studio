import React, {useState} from 'react'

import {HSL, Shade} from '../../types/color'
import {getBaseShade} from '../../util/color'
import ColorPicker from '../colorpicker/ColorPicker'
import ColorHeader from './ColorHeader'
import ShadeComponent from './Shade'

import styles from './Color.module.css'

interface Props {
  name: string
  shades: Shade[]
  setName: (name: string) => void
  setHSL: (id: string, hsl: HSL) => void
  removeColor: () => void
}

const Color = ({name, shades, setName, setHSL, removeColor}: Props) => {
  let [isExpanded, setExpanded] = useState(false)

  return (
    <div className={styles.color}>
      <ColorHeader
        name={name}
        hsl={getBaseShade(shades).hsl}
        setName={setName}
        removeColor={removeColor}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
        className={styles.header}
      />
      {isExpanded && (
        <>
          <ColorPicker shades={shades} setHSL={setHSL} />
          {shades.map(shade => (
            <ShadeComponent
              {...shade}
              key={shade.id}
              setName={() => {}}
              setHSL={(hsl: HSL) => setHSL(shade.id, hsl)}
              removeShade={() => {}}
            />
          ))}
          <div className={styles.divider} />
        </>
      )}
    </div>
  )
}

export default Color
