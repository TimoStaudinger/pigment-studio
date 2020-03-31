import React from 'react'

import NumberInput from '../common/NumberInput'

import styles from './ColorInput.module.css'

interface Props {
  label: string
  value: string
  onChange: (value: string) => boolean
  allowMouseWheelChanges?: boolean
}

const ColorInput = ({
  label,
  value,
  onChange,
  allowMouseWheelChanges
}: Props): JSX.Element => {
  return (
    <div className={styles.row}>
      <label className={styles.label}>{label}</label>
      <span className={styles.inputContainer}>
        <NumberInput
          value={parseInt(value)}
          onChange={value => onChange(String(value))}
          allowMouseWheelChanges={allowMouseWheelChanges}
        />
      </span>
    </div>
  )
}

export default ColorInput
