import React from 'react'
import classnames from 'classnames'

import styles from './Button.module.css'

interface Props {
  onClick?: () => void
  className?: string
  text?: string
  icon?: React.ReactNode
  primary?: boolean
  link?: boolean
  autoFocus?: boolean
  toolbar?: boolean
}

const Button = ({
  onClick,
  text,
  icon,
  className,
  primary,
  link,
  toolbar,
  autoFocus = primary
}: Props) => (
  <button
    className={classnames(className, styles.button, {
      [styles.primary]: primary,
      [styles.link]: link,
      [styles.toolbar]: toolbar,
      [styles.iconOnly]: icon && !text
    })}
    onClick={onClick}
    autoFocus={autoFocus}
  >
    {icon}
    {text && <span className={styles.text}>{text}</span>}
  </button>
)

export default Button
