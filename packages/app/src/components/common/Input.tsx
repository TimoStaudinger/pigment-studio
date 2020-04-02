import React from 'react'
import classnames from 'classnames'

import styles from './Input.module.css'

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className={classnames(styles.input, className)} {...props} />
)

export default Input
