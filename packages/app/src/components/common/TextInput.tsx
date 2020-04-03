import React from 'react'

import Input from './Input'

import styles from './TextInput.module.css'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
}

const TextInput = ({label, value, onChange}: Props) => (
  <>
    <div className={styles.row}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputContainer}>
        <Input
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    </div>
  </>
)

export default TextInput
