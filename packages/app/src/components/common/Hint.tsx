import React from 'react'
import classnames from 'classnames'
import {Info} from 'react-feather'

import styles from './Hint.module.css'

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
