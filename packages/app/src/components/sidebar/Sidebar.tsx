import React from 'react'
import {useParams} from 'react-router-dom'
import {Lab} from '@pigmentstudio/convert'

import {Color} from '../../types/color'
import Palette from './palette/Palette'
import Picker from './picker/Picker'
import ShadeProperties from './shade-properties/ShadeProperties'
import ColorProperties from './color-properties/ColorProperties'

import styles from './Sidebar.module.css'

interface Props {
  colors: Color[]
  setColorName: (name: string) => void
  setLab: (lab: Lab) => void
}

const Sidebar = ({colors, setColorName, setLab}: Props) => {
  let {paletteId, ...params} = useParams()
  let colorIndex = params.colorIndex ? parseInt(params.colorIndex) : null
  let shadeIndex = params.shadeIndex ? parseInt(params.shadeIndex) : null

  return (
    <div className={styles.palette}>
      <Palette colors={colors} />

      {colorIndex !== null && (
        <ColorProperties color={colors[colorIndex]} setName={setColorName} />
      )}

      {colorIndex !== null && shadeIndex !== null && (
        <>
          <ShadeProperties
            shade={colors[colorIndex].shades[shadeIndex]}
            setLab={setLab}
          />
          <Picker
            shade={colors[colorIndex].shades[shadeIndex]}
            setLab={setLab}
          />
        </>
      )}
    </div>
  )
}

export default Sidebar
