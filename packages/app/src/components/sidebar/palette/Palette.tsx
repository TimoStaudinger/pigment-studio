import React from 'react'
import classnames from 'classnames'
import {useMeasure} from 'react-use'
import {labToHex} from '@pigmentstudio/convert'

import {Color} from '../../../types/color'
import Panel from '../../common/Panel'
import ShadeLabels from './ShadeLabels'
import ColorLabels from './ColorLabels'

import styles from './Palette.module.css'
import TextInput from '../../common/TextInput'

interface Props {
  colors: Color[]
  selectedColorIndex: number | null
  selectedShadeIndex: number | null
  paletteName: string
  setPaletteName: (name: string) => void
  selectColor: (colorIndex: number, shadeIndex?: number) => void
  selectShade: (shadeIndex: number) => void
}

const Palette = ({
  colors,
  selectedColorIndex,
  selectedShadeIndex,
  paletteName,
  setPaletteName,
  selectColor,
  selectShade
}: Props) => {
  const [ref, {width}] = useMeasure()

  return (
    <Panel title="Palette">
      <TextInput
        label="Palette Name"
        value={paletteName || ''}
        onChange={setPaletteName}
      />
      <div className={styles.palette}>
        <ColorLabels
          colors={colors}
          selectColor={selectColor}
          selectedColorIndex={selectedColorIndex}
        />

        <div className={styles.swatches}>
          <ShadeLabels
            labels={colors?.[0]?.shades.map((shade) => shade.name) ?? []}
            selectedShadeIndex={selectedShadeIndex}
            selectShade={selectShade}
          />

          {colors.map((color, colorIndex) => (
            <div className={styles.row}>
              {color.shades.map((shade, shadeIndex) => (
                <div
                  ref={colorIndex === 0 && shadeIndex === 0 ? ref : undefined}
                  className={classnames(styles.swatch, {
                    [styles.selected]:
                      colorIndex === selectedColorIndex &&
                      shadeIndex === selectedShadeIndex
                  })}
                  style={{
                    backgroundColor: `#${labToHex(shade.lab)}`,
                    height: width
                  }}
                  onClick={() => {
                    selectColor(colorIndex, shadeIndex)
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
export default Palette
