import React, {useState} from 'react'
import classnames from 'classnames'

import styles from './Workarea.module.css'

interface Props {
  areas: [string, React.ReactNode][]
}

const Workarea = ({areas}: Props) => {
  let [selectedArea, setSelectedArea] = useState<string>(areas?.[0][0])

  return (
    <div className={styles.container}>
      <div className={styles.tabbar}>
        {areas.map(area => (
          <div
            className={classnames(styles.tabbarItem, {
              [styles.selected]: selectedArea === area[0]
            })}
            onClick={() => setSelectedArea(area[0])}
          >
            {area[0]}
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {areas
          ? selectedArea
            ? areas.find(area => area[0] === selectedArea)?.[1]
            : areas[0][1]
          : null}
      </div>
    </div>
  )
}
export default Workarea
