import React from 'react'

import {Color} from '../../../types/color'
import Panel from '../../common/Panel'

interface Props {
  color: Color
  setName: (name: string) => void
}

const ColorProperties = ({color}: Props) => (
  <Panel title="Color">{color.name}</Panel>
)

export default ColorProperties
