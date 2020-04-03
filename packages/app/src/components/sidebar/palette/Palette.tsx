import React from 'react'
import classnames from 'classnames'
import {useHistory, useParams, generatePath} from 'react-router-dom'
import {useMeasure} from 'react-use'
import {labToHex} from '@pigmentstudio/convert'

import {Color} from '../../../types/color'
import Panel from '../../common/Panel'
import ShadeLabels from './ShadeLabels'
import ColorLabels from './ColorLabels'

import styles from './Palette.module.css'

interface Props {
  colors: Color[]
}

const Quickview = ({colors}: Props) => {
  let {paletteId, view, ...params} = useParams()
  let selectedColorIndex = params.colorIndex
    ? parseInt(params.colorIndex)
    : null
  let selectedShadeIndex = params.shadeIndex
    ? parseInt(params.shadeIndex)
    : null

  let history = useHistory()

  const [ref, {width}] = useMeasure()

  return (
    <Panel title="Palette">
      <div className={styles.container}>
        <ColorLabels colors={colors} />

        <div className={styles.swatches}>
          <ShadeLabels
            labels={colors?.[0]?.shades.map(shade => shade.name) ?? []}
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
                  onClick={() =>
                    history.push(
                      generatePath(
                        '/:paletteId?/:colorIndex?/:shadeIndex?/:view?',
                        {paletteId, view, colorIndex, shadeIndex}
                      )
                    )
                  }
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
export default Quickview
