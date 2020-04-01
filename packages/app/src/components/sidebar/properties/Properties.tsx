import React from 'react'
import {Lab} from '@pigmentstudio/convert'

import {Color, Shade} from '../../../types/color'
import ColorInputs from './ColorInputs'

import Panel from '../../common/Panel'

interface Props {
  color: Color
  shade: Shade
  setLab: (shadeId: string, lab: Lab) => void
  setName: (name: string) => void
}

const Properties = ({color, shade, setLab, setName}: Props) => (
  <Panel title="Properties">
    <ColorInputs lab={shade.lab} setLab={lab => setLab(shade.id, lab)} />
  </Panel>
)

export default Properties
