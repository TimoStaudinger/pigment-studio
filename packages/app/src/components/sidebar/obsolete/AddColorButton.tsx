import React from 'react'

import Button from '../../common/Button'

import styles from './AddColorButton.module.css'

interface Props {
  onClick: () => void
}

const AddColorButton = ({onClick}: Props) => (
  <Button className={styles.button} onClick={onClick}>
    Add color
  </Button>
)

export default AddColorButton
