import React from 'react'
import classnames from 'classnames'
import {useParams, useHistory, generatePath} from 'react-router-dom'

import Button from '../common/Button'

import styles from './Workbench.module.css'

interface Props {
  areas: [string, React.ReactNode][]
}

const Workbench = ({areas}: Props) => {
  let {view, ...params} = useParams()
  let history = useHistory()

  let selectedView = view ?? areas?.[0]?.[0]

  return (
    <div className={styles.container}>
      <div className={styles.tabbar}>
        {areas.map(area => (
          <Button
            className={classnames(styles.tabbarItem, {
              [styles.selected]: selectedView === area[0]
            })}
            onClick={() =>
              history.push(
                generatePath('/:paletteId?/:colorIndex?/:shadeIndex?/:view?', {
                  ...params,
                  view: area[0]
                })
              )
            }
          >
            {area[0]}
          </Button>
        ))}
      </div>

      <div className={styles.content}>
        {areas ? areas.find(area => area[0] === selectedView)?.[1] : null}
      </div>
    </div>
  )
}
export default Workbench
