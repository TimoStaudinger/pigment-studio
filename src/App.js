import React, {useState} from 'react'

import ColorPicker from './colorpicker/ColorPicker'

import './App.css'

const App = () => {
  const [hue, setHue] = useState(100)

  return (
    <div className="App">
      <input
        type="number"
        min={0}
        max={359}
        value={hue}
        onChange={e => setHue(e.target.value)}
      />

      <ColorPicker hue={hue} />
    </div>
  )
}

export default App
