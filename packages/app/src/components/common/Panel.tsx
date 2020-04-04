import React, {useState} from 'react'
import classnames from 'classnames'

import ChevronRight from '../icons/ChevronRight'
import Button from './Button'

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
        <Button
          onClick={() => setExpanded(!expanded)}
          className={styles.expandButton}
          icon={
            <ChevronRight
              size={14}
              className={classnames({[styles.expanded]: expanded})}
            />
          }
        />
        <div className={styles.panelTitle}>{title}</div>
      </div>

      <div className={styles.content}>{expanded ? children : null}</div>
    </div>
  )
}
export default Panel
