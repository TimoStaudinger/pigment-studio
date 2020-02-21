import React, {useState} from 'react'

import ColorPicker from './colorpicker/ColorPicker'

import './App.css'
import HuePicker from './huepicker/HuePicker'

const App = () => {
  const [hue, setHue] = useState(100)
  return (
    <div className="App">
      <input
        type="number"
        min={0}
        max={359}
        value={hue}
        onChange={e => setHue(parseInt(e.target.value))}
      />

      <HuePicker />

      <ColorPicker hue={hue} />
    </div>
  )
}

export default App
