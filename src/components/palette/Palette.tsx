import React, {useState} from 'react'
import {ulid} from 'ulid'

import {HSL} from '../../types/color'
import AddColorButton from './AddColorButton'
import Color from './Color'

import styles from './Palette.module.css'

interface Color {
  id: string
  name: string
  hsl: HSL
}

interface Props {}

const Palette = () => {
  let [colors, setColors] = useState<Color[]>([
    {
      id: ulid(),
      name: 'My new color',
      hsl: {hue: 250, saturation: 0.5, lightness: 0.5}
    }
  ])

  const handleAddColor = () => {
    setColors(colors => [
      ...colors,
      {
        id: ulid(),
        name: 'My new color',
        hsl: {hue: 250, saturation: 0.5, lightness: 0.5}
      }
    ])
  }

  return (
    <div className={styles.palette}>
      {colors.map(color => (
        <Color
          key={color.id}
          {...color}
          setHSL={hsl =>
            setColors(colors =>
              colors.map(existingColor =>
                existingColor.id === color.id
                  ? {...existingColor, hsl}
                  : existingColor
              )
            )
          }
          setName={name =>
            setColors(colors =>
              colors.map(existingColor =>
                existingColor.id === color.id
                  ? {...existingColor, name}
                  : existingColor
              )
            )
          }
          removeColor={() =>
            setColors(colors =>
              colors.filter(existingColor => existingColor.id !== color.id)
            )
          }
        />
      ))}

      <AddColorButton onClick={handleAddColor} />
    </div>
  )
}

export default Palette
