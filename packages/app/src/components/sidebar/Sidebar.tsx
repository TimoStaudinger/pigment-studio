import React from 'react'
import {useParams} from 'react-router-dom'
import {Lab} from '@pigmentstudio/convert'

import {Color} from '../../types/color'

import Palette from './palette/Palette'
import ShadeProperties from './shade-properties/ShadeProperties'

import styles from './Sidebar.module.css'
import Picker from './picker/Picker'
import ColorProperties from './color-properties/ColorProperties'

interface Props {
  colors: Color[]
  setColors: (colors: (prev: Color[]) => Color[]) => void
  setLab: (shadeId: string, lab: Lab) => void
}

const Sidebar = ({colors, setColors, setLab}: Props) => {
  let {shadeId} = useParams()

  let selectedColor = colors.find(color =>
    color.shades.some(shade => shade.id === shadeId)
  )
  let selectedShade =
    selectedColor && selectedColor.shades.find(shade => shade.id === shadeId)

  // const handleAddColor = () => {
  //   setColors(colors => [
  //     ...colors,
  //     {
  //       id: ulid(),
  //       name: 'Untitled',
  //       shades: [
  //         {
  //           id: ulid(),
  //           name: '500',
  //           lab: hslToLab({h: 250, s: 0.5, l: 0.5})
  //         }
  //       ]
  //     }
  //   ])
  // }

  return (
    <div className={styles.palette}>
      <Palette colors={colors} />

      {selectedColor && (
        <ColorProperties
          color={selectedColor}
          setName={name =>
            selectedColor &&
            setColors(colors =>
              colors.map(updatedColor =>
                updatedColor.id === selectedColor?.id
                  ? {...updatedColor, name}
                  : updatedColor
              )
            )
          }
        />
      )}

      {selectedShade && selectedColor && (
        <>
          <ShadeProperties shade={selectedShade} setLab={setLab} />
          <Picker shade={selectedShade} setLab={setLab} />
        </>
      )}
    </div>
  )
}

export default Sidebar
