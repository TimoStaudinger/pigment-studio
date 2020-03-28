import React from 'react'
import {ulid} from 'ulid'

import AddColorButton from './AddColorButton'
import ColorComponent from './Color'
import {Color} from '../../types/color'

import styles from './Palette.module.css'
import {convertHSLtoLab} from '../../util/color'

interface Props {
  colors: Color[]
  setColors: (colors: (prev: Color[]) => Color[]) => void
}

const Palette = ({colors, setColors}: Props) => {
  const handleAddColor = () => {
    setColors(colors => [
      ...colors,
      {
        id: ulid(),
        name: 'Untitled',
        shades: [
          {
            id: ulid(),
            name: '500',
            lab: convertHSLtoLab({h: 250, s: 0.5, l: 0.5})
          }
        ]
      }
    ])
  }

  return (
    <div className={styles.palette}>
      {colors.map(currentColor => (
        <ColorComponent
          key={currentColor.id}
          {...currentColor}
          setLab={(id, lab) => {
            setColors(colors =>
              colors.map(updatedColor =>
                updatedColor.id === currentColor.id
                  ? {
                      ...updatedColor,
                      shades: updatedColor.shades.map(shade =>
                        shade.id === id ? {...shade, lab: lab} : shade
                      )
                    }
                  : updatedColor
              )
            )
          }}
          setName={name =>
            setColors(colors =>
              colors.map(updatedColor =>
                updatedColor.id === currentColor.id
                  ? {...updatedColor, name}
                  : updatedColor
              )
            )
          }
          removeColor={() =>
            setColors(colors =>
              colors.filter(updatedColor => updatedColor.id !== currentColor.id)
            )
          }
        />
      ))}

      <AddColorButton onClick={handleAddColor} />
    </div>
  )
}

export default Palette
