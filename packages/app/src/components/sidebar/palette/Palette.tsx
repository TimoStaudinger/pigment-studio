import React from 'react'
import classnames from 'classnames'
import {useHistory, useParams} from 'react-router-dom'
import {labToHex} from '@pigmentstudio/convert'

import {Color} from '../../../types/color'
import Labels from './Labels'

import styles from './Palette.module.css'
import Panel from '../../common/Panel'

interface Props {
  colors: Color[]
}

const Quickview = ({colors}: Props) => {
  let {shadeId, view} = useParams()
  let history = useHistory()

  return (
    <Panel title="Palette">
      <div className={styles.swatches}>
        <Labels labels={colors?.[0]?.shades.map(shade => shade.name) ?? []} />
        {colors.map(color => (
          <div className={styles.row}>
            <div className={styles.label}>{color.name}</div>
            {color.shades.map(shade => (
              <div
                className={classnames(styles.swatch, {
                  [styles.selected]: shade.id === shadeId
                })}
                style={{backgroundColor: `#${labToHex(shade.lab)}`}}
                onClick={() =>
                  history.push(`/${shade.id}${view ? `/${view}` : ''}`)
                }
              ></div>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  )
}
export default Quickview
