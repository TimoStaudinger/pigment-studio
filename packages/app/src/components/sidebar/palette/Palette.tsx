import React from 'react'
import classnames from 'classnames'
import {useHistory, useParams} from 'react-router-dom'
import {labToHex} from '@pigmentstudio/convert'
import {useMeasure} from 'react-use'

import {Color} from '../../../types/color'
import ShadeLabels from './ShadeLabels'

import styles from './Palette.module.css'
import Panel from '../../common/Panel'
import ColorLabels from './ColorLabels'

interface Props {
  colors: Color[]
}

const Quickview = ({colors}: Props) => {
  let {shadeId, view} = useParams()
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
                    [styles.selected]: shade.id === shadeId
                  })}
                  style={{
                    backgroundColor: `#${labToHex(shade.lab)}`,
                    height: width
                  }}
                  onClick={() =>
                    history.push(`/${shade.id}${view ? `/${view}` : ''}`)
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
