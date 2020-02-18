import React, {useRef, useEffect} from 'react'

function convertHSLtoRGB(h, s, l) {
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return [r, g, b]
}

const convertCoordsToOffset = (x, y, width) => (x + y * width) * 4

const HuePicker = ({value = 250, width = 200}) => {
  const canvas = useRef(null)

  useEffect(() => {
    if (canvas.current) {
      let width = canvas.current.width
      let height = canvas.current.height

      let context = canvas.current.getContext('2d')
      let imageData = context.getImageData(0, 0, width, height)

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pixelOffset = convertCoordsToOffset(x, y, width)

          let hue = (x / width) * 360
          let saturation = 1
          let lightness = 0.5

          let [r, g, b] = convertHSLtoRGB(hue, saturation, lightness)

          imageData.data[pixelOffset + 0] = r
          imageData.data[pixelOffset + 1] = g
          imageData.data[pixelOffset + 2] = b
          imageData.data[pixelOffset + 3] = 255
        }
      }

      context.putImageData(imageData, 0, 0)
    }
  }, [canvas, value])

  return <canvas height={20} width={width} ref={canvas}></canvas>
}

export default HuePicker
