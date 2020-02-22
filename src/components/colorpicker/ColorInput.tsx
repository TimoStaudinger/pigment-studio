import React, {useState, useEffect} from 'react'
import classnames from 'classnames'
import {AlertTriangle} from 'react-feather'

import styles from './ColorInput.module.css'

interface Props {
  label: string
  value: string
  onChange: (value: string) => boolean
}

const ColorInput = ({label, value, onChange}: Props): JSX.Element => {
  const [buffer, setBuffer] = useState('')
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setBuffer(value)
    setIsValid(true)
  }, [value])

  const handleChange = (value: string): void => {
    setBuffer(value)
    setIsValid(onChange(value))
  }

  return (
    <div className={styles.row}>
      <label className={styles.label}>{label}</label>
      <input
        value={buffer}
        onChange={e => handleChange(e.target.value)}
        className={classnames(styles.input, {[styles.invalid]: !isValid})}
        spellCheck={false}
      />

      <AlertTriangle
        size={16}
        className={classnames(styles.warningIcon, {
          [styles.invalid]: !isValid
        })}
      />
    </div>
  )
}

export default ColorInput