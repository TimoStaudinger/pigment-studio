import React from 'react'
import classnames from 'classnames'

import styles from './Button.module.css'

interface Props {
  onClick?: () => void
  className?: string
  children: React.ReactNode
  primary?: boolean
  autoFocus?: boolean
}

const Button = ({
  onClick,
  children,
  className,
  primary,
  autoFocus = primary
}: Props) => (
  <button
    className={classnames(className, styles.button, {
      [styles.primary]: primary
    })}
    onClick={onClick}
    autoFocus={autoFocus}
  >
    {children}
  </button>
)

export default Button
