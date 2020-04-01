import React, {useState} from 'react'
import {Lab} from '@pigmentstudio/convert'

import {Shade} from '../../../types/color'
import ColorHeader from './ColorHeader'
import ShadeComponent from './Shade'
import ShadePreview from './ShadePreview'
import {getBaseShade} from '../../../util/shades'

import styles from './Color.module.css'

interface Props {
  name: string
  shades: Shade[]
  setName: (name: string) => void
  setLab: (id: string, lab: Lab) => void
  removeColor: () => void
}

const Color = ({name, shades, setName, setLab, removeColor}: Props) => {
  let [isExpanded, setExpanded] = useState(false)

  return (
    <div className={styles.color}>
      <ColorHeader
        name={name}
        lab={getBaseShade(shades).lab}
        setName={setName}
        removeColor={removeColor}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
        className={styles.header}
      />
      {isExpanded ? (
        <>
          {shades.map(shade => (
            <ShadeComponent
              {...shade}
              key={shade.id}
              setName={() => {}}
              setLab={(lab: Lab) => setLab(shade.id, lab)}
              removeShade={() => {}}
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
