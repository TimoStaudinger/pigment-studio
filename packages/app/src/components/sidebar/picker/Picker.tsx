import React from 'react'
import {Lab} from '@pigmentstudio/convert'

import {Shade} from '../../../types/color'
import Panel from '../../common/Panel'
import ShadePicker from './ShadePicker'

interface Props {
  shade: Shade
  setLab: (lab: Lab) => void
}

const Picker = ({shade, setLab}: Props) => (
  <Panel title="Shade Picker" defaultExpanded={false}>
    <ShadePicker lab={shade.lab} setLab={setLab} />
  </Panel>
)

export default Picker
