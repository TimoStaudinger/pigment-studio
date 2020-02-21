import React, {useRef, useEffect} from 'react'
import {convertHSLtoRGB} from '../util/color'
import {convertCoordsToOffset} from '../util/canvas'

const HuePicker = ({value = 250, width = 200}) => {
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
    }
  }, [canvas, value])

  return <canvas height={20} width={width} ref={canvas}></canvas>
}

export default HuePicker
