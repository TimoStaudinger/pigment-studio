import React from 'react'
import {Lab} from '@pigmentstudio/convert'

import {Shade} from '../../../types/color'
import ColorInputs from './ColorInputs'

import Panel from '../../common/Panel'

interface Props {
  shade: Shade
  setLab: (lab: Lab) => void
}

const ShadeProperties = ({shade, setLab}: Props) => (
  <Panel title="Shade">
    <ColorInputs lab={shade.lab} setLab={setLab} />
  </Panel>
)

export default ShadeProperties
