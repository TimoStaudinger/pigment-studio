import React from 'react'
import {Lab} from '@pigmentstudio/convert'

import Panel from '../../common/Panel'
import ShadePicker from '../properties/ShadePicker'
import {Shade} from '../../../types/color'

interface Props {
  shade: Shade
  setLab: (shadeId: string, lab: Lab) => void
}

const Picker = ({shade, setLab}: Props) => (
  <Panel title="Shade Picker" defaultExpanded={false}>
    <ShadePicker lab={shade.lab} setLab={lab => setLab(shade.id, lab)} />
  </Panel>
)

export default Picker
