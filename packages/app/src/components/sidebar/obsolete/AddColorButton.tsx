import React from 'react'

import styles from './AddColorButton.module.css'

interface Props {
  onClick: () => void
}

const AddColorButton = ({onClick}: Props) => (
  <button className={styles.button} onClick={onClick}>
    Add color
  </button>
)

export default AddColorButton
