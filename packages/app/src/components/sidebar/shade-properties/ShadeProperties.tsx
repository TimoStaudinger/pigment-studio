import React from 'react'
import {Lab} from '@pigmentstudio/convert'

import {Shade} from '../../../types/color'
import ColorInputs from './ColorInputs'

import Panel from '../../common/Panel'

interface Props {
  shade: Shade
  setLab: (shadeId: string, lab: Lab) => void
}

const ShadeProperties = ({shade, setLab}: Props) => (
  <Panel title="Shade">
    <ColorInputs lab={shade.lab} setLab={lab => setLab(shade.id, lab)} />
  </Panel>
)

export default ShadeProperties
