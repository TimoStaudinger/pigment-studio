import React, {useState} from 'react'

import ColorPicker from './colorpicker/ColorPicker'
import HuePicker from './huepicker/HuePicker'

import './App.css'

const App = () => {
  const [hue, setHue] = useState(250)
  const [saturation, setSaturation] = useState(0.5)
  const [lightness, setLightness] = useState(0.5)

  return (
    <div className="App">
      {/* <HuePicker /> */}

      <ColorPicker hue={hue} saturation={saturation} lightness={lightness} />
    </div>
  )
}

export default App
