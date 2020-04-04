import React, {useState, useEffect} from 'react'
import classnames from 'classnames'

import BlockPageScroll from './BlockPageScroll'
import Input from './Input'

import styles from './NumberInput.module.css'
import Exclamation from '../icons/Exclamation'

interface Props {
  value: number
  onChange: (value: number) => boolean
  allowMouseWheelChanges?: boolean
}

const NumberInput = ({value, onChange, allowMouseWheelChanges}: Props) => {
  const [buffer, setBuffer] = useState('')
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setBuffer(String(parseFloat(value.toFixed(1))))
    setIsValid(true)
  }, [value])

  const handleChange = (value: string): void => {
    setBuffer(value)

    let parsed = parseFloat(value)
    if (!isNaN(parsed)) setIsValid(onChange(parsed))
    else setIsValid(false)
  }

  return (
    <BlockPageScroll>
      <div style={{position: 'relative'}}>
        <Input
          value={buffer}
          onChange={(e) => handleChange(e.target.value)}
          className={classnames(styles.input, {[styles.invalid]: !isValid})}
          spellCheck={false}
          onFocus={(e) => e.target.select()}
          onWheel={
            allowMouseWheelChanges
              ? (e) => {
                  let intValue = parseFloat(buffer)
                  if (!isNaN(intValue)) {
                    let delta = e.ctrlKey ? 0.5 : e.shiftKey ? 5 : 1
                    handleChange(
                      String(e.deltaY < 0 ? intValue + delta : intValue - delta)
                    )
                  }
                }
              : undefined
          }
        />

        <Exclamation
          size={13}
          className={classnames(styles.warningIcon, {
            [styles.invalid]: !isValid
          })}
        />
      </div>
    </BlockPageScroll>
  )
}

export default NumberInput
