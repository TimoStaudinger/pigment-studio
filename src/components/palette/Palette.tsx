import React, {useEffect} from 'react'
import {ulid} from 'ulid'

import AddColorButton from './AddColorButton'
import ColorComponent from './Color'
import {Color} from '../../types/color'
import {hslToLab, Lab} from '../../util/color'
import Quickview from './quickview/Quickview'
import {useParams, useHistory} from 'react-router-dom'

import styles from './Palette.module.css'

interface Props {
  colors: Color[]
  setColors: (colors: (prev: Color[]) => Color[]) => void
  setLab: (shadeId: string, lab: Lab) => void
}

const Palette = ({colors, setColors, setLab}: Props) => {
  let {shadeId} = useParams()
  let history = useHistory()

  let isShadeSelected =
    shadeId &&
    colors.some(color => color.shades.some(shade => shade.id === shadeId))

  useEffect(() => {
    if (!isShadeSelected && colors && colors.length)
      history.push(
        `/${colors[0].shades.find(shade => shade.name === '500')?.id}`
      )
  })

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
            lab: hslToLab({h: 250, s: 0.5, l: 0.5})
          }
        ]
      }
    ])
  }

  return (
    <div className={styles.palette}>
      <Quickview colors={colors} />

      {colors.map(currentColor => (
        <ColorComponent
          key={currentColor.id}
          {...currentColor}
          setLab={setLab}
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
