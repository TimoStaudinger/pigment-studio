import React, {useRef, useEffect, useState, useCallback} from 'react'
import {convertCoordsToOffset} from '../util/canvas'
import {convertHSLtoRGB} from '../util/color'

interface Props {
  hue: number | null
  saturation: number | null
  lightness: number | null
  width?: number
  height?: number
}

const render = (
  canvas: HTMLCanvasElement | null,
  hue: number | null,
  saturation: number | null,
  lightness: number | null,
  isHandleHover: boolean
): void => {
  if (canvas !== null) {
    let context = canvas.getContext('2d')

    let {width, height} = canvas

    if (context !== null) {
      context.clearRect(0, 0, width, height)

      let imageData = context.getImageData(0, 0, width, height)

      if (hue !== null) {
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixelOffset = convertCoordsToOffset(x, y, width)

            let localSaturation = x / width
            let localLightness = 1 - y / height

            let [r, g, b] = convertHSLtoRGB(
              hue,
              localSaturation,
              localLightness
            )

            imageData.data[pixelOffset + 0] = r
            imageData.data[pixelOffset + 1] = g
            imageData.data[pixelOffset + 2] = b
            imageData.data[pixelOffset + 3] = 255
          }
        }

        context.putImageData(imageData, 0, 0)

        if (saturation !== null && lightness !== null) {
          let x = saturation * width
          let y = lightness * height

          context.beginPath()
          context.lineWidth = 3
          context.strokeStyle = '#222'
          context.arc(x, y, isHandleHover ? 15 : 10, 0, Math.PI * 2, true)
          context.stroke()
        } else console.log('`saturation` or `lightness` is null')
      } else console.log('`hue` is null')
    } else console.log('`context` is null')
  } else console.log('`canvas` is null')
}

const attachEventListeners = (
  canvas: HTMLCanvasElement | null,
  saturation: number | null,
  lightness: number | null,
  handleMouseMove: (x: number, y: number) => void
): void => {
  if (canvas !== null) {
    let {left, top} = canvas.getBoundingClientRect()
    canvas.addEventListener('mousemove', e => {
      handleMouseMove(e.clientX - left, e.clientY - top)
    })
  }
}

const ColorPicker = ({
  hue = 250,
  saturation = null,
  lightness = null,
  width = 400,
  height = 400
}: Props): JSX.Element => {
  const [isHandleHover, setIsHandleHover] = useState(false)
  const [mouseX, setMouseX] = useState<number | null>(null)
  const [mouseY, setMouseY] = useState<number | null>(null)

  const canvas = useRef<HTMLCanvasElement | null>(null)
  const canvasCallback = useCallback(
    canvasNode => {
      if (canvasNode !== null) {
        canvas.current = canvasNode
        render(canvas.current, hue, saturation, lightness, isHandleHover)
        attachEventListeners(canvas.current, saturation, lightness, (x, y) => {
          setMouseX(x)
          setMouseY(y)
        })
      }
    },
    [hue, saturation, lightness, isHandleHover]
  )

  useEffect(() => {
    render(canvas.current, hue, saturation, lightness, isHandleHover)
  }, [hue, saturation, lightness, isHandleHover])

  useEffect(() => {
    if (
      canvas.current !== null &&
      mouseX !== null &&
      mouseY !== null &&
      saturation !== null &&
      lightness !== null
    ) {
      let {width, height} = canvas.current

      let boxSize = 15
      let handleLeft = saturation * width - boxSize
      let handleRight = saturation * width + boxSize
      let handleTop = lightness * height - boxSize
      let handleBottom = lightness * height + boxSize

      setIsHandleHover(
        mouseX > handleLeft &&
          mouseX < handleRight &&
          mouseY > handleTop &&
          mouseY < handleBottom
      )
    }
  }, [mouseX, mouseY, saturation, lightness])

  return <canvas height={height} width={width} ref={canvasCallback}></canvas>
}

export default ColorPicker
