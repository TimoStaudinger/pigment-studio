import React, {useRef, useEffect} from 'react'
import {convertCoordsToOffset} from '../util/canvas'
import {convertHSLtoRGB} from '../util/color'

const ColorPicker = ({hue = 250, width = 200, height = 200}) => {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current !== null) {
      let width = canvas.current.width
      let height = canvas.current.height

      let context = canvas.current.getContext('2d')
      if (context !== null) {
        let imageData = context.getImageData(0, 0, width, height)

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixelOffset = convertCoordsToOffset(x, y, width)

            let saturation = x / width
            let lightness = 1 - y / height

            let [r, g, b] = convertHSLtoRGB(hue, saturation, lightness)

            imageData.data[pixelOffset + 0] = r
            imageData.data[pixelOffset + 1] = g
            imageData.data[pixelOffset + 2] = b
            imageData.data[pixelOffset + 3] = 255
          }
        }

        context.putImageData(imageData, 0, 0)
      }
    }
  }, [canvas, hue])

  return <canvas height={height} width={width} ref={canvas}></canvas>
}

export default ColorPicker
