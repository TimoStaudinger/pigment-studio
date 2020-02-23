import React, {useState, useEffect} from 'react'
import classnames from 'classnames'
import {AlertTriangle} from 'react-feather'

import styles from './ColorInput.module.css'
import BlockPageScroll from '../../util/BlockPageScroll'

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
      <span className={styles.inputContainer}>
        <BlockPageScroll>
          <input
            value={buffer}
            onChange={e => handleChange(e.target.value)}
            className={classnames(styles.input, {[styles.invalid]: !isValid})}
            spellCheck={false}
            onFocus={e => e.target.select()}
            onWheel={
              allowMouseWheelChanges
                ? e => {
                    let intValue = parseInt(buffer)
                    if (!isNaN(intValue)) {
                      handleChange(
                        String(e.deltaY < 0 ? intValue + 1 : intValue - 1)
                      )
                    }
                  }
                : undefined
            }
          />

          <AlertTriangle
            size={13}
            className={classnames(styles.warningIcon, {
              [styles.invalid]: !isValid
            })}
          />
        </BlockPageScroll>
      </span>
    </div>
  )
}

export default ColorInput
