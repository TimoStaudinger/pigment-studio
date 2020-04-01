import React, {useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Lab} from '@pigmentstudio/convert'

import {Color} from '../../types/color'

import Palette from './palette/Palette'
import Properties from './properties/Properties'

import styles from './Sidebar.module.css'
import Picker from './picker/Picker'

interface Props {
  colors: Color[]
  setColors: (colors: (prev: Color[]) => Color[]) => void
  setLab: (shadeId: string, lab: Lab) => void
}

const Sidebar = ({colors, setColors, setLab}: Props) => {
  let {shadeId} = useParams()
  let history = useHistory()

  let selectedColor = colors.find(color =>
    color.shades.some(shade => shade.id === shadeId)
  )
  let selectedShade =
    selectedColor && selectedColor.shades.find(shade => shade.id === shadeId)

  useEffect(() => {
    if (!selectedShade && colors && colors.length)
      history.push(
        `/${colors[0].shades.find(shade => shade.name === '500')?.id}`
      )
  })

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

      {selectedShade && selectedColor && (
        <>
          <Properties
            color={selectedColor}
            shade={selectedShade}
            setLab={setLab}
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

          <Picker shade={selectedShade} setLab={setLab} />
        </>
      )}

      {/* {colors.map(currentColor => (
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
      ))} */}

      {/* <AddColorButton onClick={handleAddColor} /> */}
    </div>
  )
}

export default Sidebar
