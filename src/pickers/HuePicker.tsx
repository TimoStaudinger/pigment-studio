import React, {useRef, useEffect, useState} from 'react'
import {convertHSLtoRGB} from '../util/color'
import {convertCoordsToOffset} from '../util/canvas'
import {isPointOnHandle1D} from '../util/coordinates'

interface Props {
  hue: number | null
  setHue: (hue: number) => void
  width?: number
  height?: number
}

const HuePicker = ({
  hue,
  setHue,
  width = 400,
  height = 50
}: Props): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const canvas = useRef<HTMLCanvasElement>(null)

  const render = () => {
    if (canvas.current !== null) {
      let context = canvas.current.getContext('2d')

      let {width, height} = canvas.current

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

        if (hue !== null) {
          let x = (hue / 360) * width

          context.beginPath()
          context.moveTo(x, 0)
          context.lineWidth = 3
          context.strokeStyle = '#222'
          context.shadowColor = '#fff'
          context.shadowBlur = 2
          context.lineTo(x, height)
          context.stroke()
        } else console.log('`hue` is null')
      } else console.log('`context` is null')
    } else console.log('`canvas.current` is null')
  }

  const [mouseX, setMouseX] = useState<number | null>(null)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvas.current !== null) {
      let {left} = canvas.current.getBoundingClientRect()
      let x = e.clientX - left

      setMouseX(x)

      if (isDragging && canvas.current !== null) {
        let {width} = canvas.current
        setHue((x / width) * 360)
      }
    }
  }
  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvas.current !== null) {
      let {width} = canvas.current
      let {left} = canvas.current.getBoundingClientRect()

      let x = e.clientX - left

      if (isPointOnHandle1D(x, width, hue !== null ? hue / 360 : null))
        setIsDragging(true)
    }
  }
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsHovering(false)
  }

  useEffect(() => {
    if (canvas.current !== null && mouseX !== null) {
      let {width} = canvas.current

      setIsHovering(
        isPointOnHandle1D(mouseX, width, hue !== null ? hue / 360 : null)
      )
    }
  }, [mouseX, hue])

  useEffect(() => {
    if (canvas.current) render()
  })

  return (
    <canvas
      height={height}
      width={width}
      ref={canvas}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    ></canvas>
  )
}

export default HuePicker
