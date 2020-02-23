import React, {useState} from 'react'

import {HSL, Shade} from '../../types/color'
import {getBaseShade} from '../../util/color'
import ColorPicker from '../colorpicker/ColorPicker'
import ColorHeader from './ColorHeader'
import ShadeComponent from './Shade'

import styles from './Color.module.css'
import ShadePreview from './ShadePreview'

interface Props {
  name: string
  shades: Shade[]
  setName: (name: string) => void
  setHSL: (id: string, hsl: HSL) => void
  removeColor: () => void
}

const Color = ({name, shades, setName, setHSL, removeColor}: Props) => {
  let [isExpanded, setExpanded] = useState(false)

  let baseShade = getBaseShade(shades)

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
      {isExpanded ? (
        <>
          <ColorPicker shades={shades} setHSL={setHSL} />
          {shades.map(shade => (
            <ShadeComponent
              {...shade}
              key={shade.id}
              setName={() => {}}
              setHSL={(hsl: HSL) => setHSL(shade.id, hsl)}
              removeShade={() => {}}
              baseHue={baseShade.hsl.hue}
            />
          ))}
          <div className={styles.divider} />
        </>
      ) : (
        <ShadePreview shades={shades} />
      )}
    </div>
  )
}

export default Color
