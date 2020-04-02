import React from 'react'
import classnames from 'classnames'

import styles from './Hint.module.css'
import {Info} from 'react-feather'

interface Props {
  children: string
  className?: string
}

const Hint = ({children, className}: Props) => (
  <span className={classnames(styles.text, className)}>
    <span className={styles.icon}>
      <Info size={15} />
    </span>

    {children}
  </span>
)

export default Hint
