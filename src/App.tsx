import React, {useState} from 'react'

import './App.css'
import ColorPicker from './pickers/ColorPicker'
import HuePicker from './pickers/HuePicker'

const App = () => {
  const [hue, setHue] = useState(250)
  const [saturation, setSaturation] = useState(0.5)
  const [lightness, setLightness] = useState(0.5)

  return (
    <div className="App">
      <HuePicker hue={hue} setHue={setHue} />

      <ColorPicker
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        setSaturation={setSaturation}
        setLightness={setLightness}
      />
    </div>
  )
}

export default App
