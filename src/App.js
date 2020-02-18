import React, { useRef, useEffect } from 'react';
import './App.css';

function hslToRGB(h,s,l) {
  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

const coordsToOffset = (x, y, width) => (x + y * width) * 4

function App() {
  const canvas = useRef(null)

  useEffect(() => {
    let context = canvas.current.getContext('2d')
    let imageData = context.getImageData(0, 0, 200, 200)

    console.log('running', imageData)
    
    for (let y = 0; y < canvas.current.height; y++) {
    for(let x = 0; x < canvas.current.width; x++) {
      const pixelOffset = coordsToOffset(x, y, canvas.current.width)

      let hue = 250
      let saturation = x / canvas.current.width
      let lightness =  1 - (y / canvas.current.height)

      let [r, g, b] = hslToRGB(hue, saturation, lightness)

      imageData.data[pixelOffset] = r;
      imageData.data[pixelOffset + 1] = g;
      imageData.data[pixelOffset + 2] = b;
      imageData.data[pixelOffset + 3] = 255;
    }}
    console.log(imageData)

    context.putImageData(imageData, 0, 0)
  }, [canvas])

  return (
    <div className="App">
      <canvas height={200} width={200} ref={canvas}>Fallback</canvas>
    </div>
  );
}

export default App;
