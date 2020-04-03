import React from 'react'

import {Color} from '../../../types/color'
import Panel from '../../common/Panel'
import TextInput from '../../common/TextInput'

interface Props {
  color: Color
  setName: (name: string) => void
}

const ColorProperties = ({color, setName}: Props) => (
  <Panel title="Color">
    <TextInput label="Color Name" value={color.name} onChange={setName} />
  </Panel>
)

export default ColorProperties
