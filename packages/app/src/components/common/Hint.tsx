import React from 'react'
import classnames from 'classnames'

import LightBulb from '../icons/LightBulb'

import styles from './Hint.module.css'

interface Props {
  children: string
  className?: string
}

const Hint = ({children, className}: Props) => (
  <span className={classnames(styles.text, className)}>
    <span className={styles.icon}>
      <LightBulb size={15} />
    </span>

    {children}
  </span>
)

export default Hint
