import React from 'react'
import {useParams} from 'react-router-dom'
import {Lab} from '@pigmentstudio/convert'

import {Palette as PaletteType} from '../../types/color'
import Palette from './palette/Palette'
import Picker from './picker/Picker'
import ShadeProperties from './shade-properties/ShadeProperties'
import ColorProperties from './color-properties/ColorProperties'

import styles from './Sidebar.module.css'

interface Props {
  palette: PaletteType | null
  setColorName: (name: string) => void
  setPaletteName: (name: string) => void
  setLab: (lab: Lab) => void
}

const Sidebar = ({palette, setColorName, setPaletteName, setLab}: Props) => {
  let {paletteId, ...params} = useParams()
  let colorIndex = params.colorIndex ? parseInt(params.colorIndex) : null
  let shadeIndex = params.shadeIndex ? parseInt(params.shadeIndex) : null

  return (
    <div className={styles.container}>
      {palette && (
        <Palette
          name={palette.name}
          colors={palette.colors}
          setName={setPaletteName}
        />
      )}

      {palette && colorIndex !== null && (
        <ColorProperties
          color={palette.colors[colorIndex]}
          setName={setColorName}
        />
      )}

      {palette && colorIndex !== null && shadeIndex !== null && (
        <>
          <ShadeProperties
            shade={palette.colors[colorIndex].shades[shadeIndex]}
            setLab={setLab}
          />
          <Picker
            shade={palette.colors[colorIndex].shades[shadeIndex]}
            setLab={setLab}
          />
        </>
      )}
    </div>
  )
}

export default Sidebar
