import React, {useState} from 'react'
import classnames from 'classnames'
import {ChevronRight} from 'react-feather'

import styles from './Panel.module.css'

interface Props {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

const Panel = ({title, children, defaultExpanded = true}: Props) => {
  let [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={styles.expandButton}
        >
          <ChevronRight
            size={14}
            className={classnames({[styles.expanded]: expanded})}
          />
        </button>
        <div className={styles.panelTitle}>{title}</div>
      </div>

      {expanded ? children : null}
    </div>
  )
}
export default Panel
