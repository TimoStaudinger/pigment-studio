import React from 'react'
import classnames from 'classnames'

import {Color} from '../../../types/color'
import {convertLabToHex} from '../../../util/color'

import styles from './Quickview.module.css'
import {useHistory, useParams} from 'react-router-dom'

interface Props {
  colors: Color[]
}

const Quickview = ({colors}: Props) => {
  let {shadeId, view} = useParams()
  let history = useHistory()

  return (
    <div>
      <table className={styles.sampleTable}>
        {colors.map(color => (
          <tr>
            {color.shades.map(shade => (
              <td
                className={classnames(styles.sample, {
                  [styles.selected]: shade.id === shadeId
                })}
                style={{backgroundColor: `#${convertLabToHex(shade.lab)}`}}
                onClick={() =>
                  history.push(`/${shade.id}${view ? `/${view}` : ''}`)
                }
              ></td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}
export default Quickview
