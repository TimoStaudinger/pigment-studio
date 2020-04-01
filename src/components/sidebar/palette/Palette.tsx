import React from 'react'
import classnames from 'classnames'
import {useHistory, useParams} from 'react-router-dom'

import {Color} from '../../../types/color'
import {labToHex} from '../../../util/color'
import Labels from './Labels'

import styles from './Palette.module.css'

interface Props {
  colors: Color[]
}

const Quickview = ({colors}: Props) => {
  let {shadeId, view} = useParams()
  let history = useHistory()

  return (
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
  )
}
export default Quickview
