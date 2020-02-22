import React, {useState, useEffect} from 'react'

import styles from './ColorInput.module.css'
import {convertHSLToHex, convertHexToHSL} from '../../util/color'
import {HSL} from '../../types/color'
import {AlertTriangle} from 'react-feather'

interface Props {
  hsl: HSL
  setHSL: (hsl: HSL) => void
}

const ColorInput = ({hsl, setHSL}: Props): JSX.Element => {
  const [buffer, setBuffer] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  useEffect(() => {
    setIsInvalid(false)
    setBuffer(convertHSLToHex(hsl))
  }, [hsl])

  const handleChangeHex = (hex: string): void => {
    setBuffer(hex)

    try {
      setIsInvalid(false)
      setHSL(convertHexToHSL(hex))
    } catch (e) {
      setIsInvalid(true)
    }
  }

  return (
    <div className={styles.container}>
      <input
        value={buffer}
        onChange={e => handleChangeHex(e.target.value)}
        className={isInvalid ? styles.invalid : undefined}
      />

      <AlertTriangle
        className={styles.warningIcon + (isInvalid ? ' ' + styles.invalid : '')}
      />
    </div>
  )
}

export default ColorInput
