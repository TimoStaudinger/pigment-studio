import React, {useRef, useEffect, useState, useCallback} from 'react'
import {convertCoordsToOffset} from '../util/canvas'
import {convertHSLtoRGB} from '../util/color'
import {isInBoundingBox} from '../util/coordinates'

interface Props {
  hue: number | null
  saturation: number | null
  lightness: number | null
  setSaturation: (saturation: number) => void
  setLightness: (lightness: number) => void
  width?: number
  height?: number
}

const isPointOnHandle = (
  x: number,
  y: number,
  width: number | null,
  height: number | null,
  saturation: number | null,
  lightness: number | null,
  padding: number = 15
): boolean => {
  if (
    saturation !== null &&
    lightness !== null &&
    width !== null &&
    height !== null
  ) {
    return isInBoundingBox(
      x,
      y,
      saturation * width,
      lightness * height,
      padding
    )
  } else return false
}

const ColorPicker = ({
  hue = 250,
  saturation = null,
  lightness = null,
  setSaturation,
  setLightness,
  width = 400,
  height = 400
}: Props): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const canvas = useRef<HTMLCanvasElement | null>(null)

  const render = (): void => {
    if (canvas.current !== null) {
      let context = canvas.current.getContext('2d')

      let {width, height} = canvas.current

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
            context.arc(x, y, isHovering ? 15 : 10, 0, Math.PI * 2, true)
            context.stroke()
          } else console.log('`saturation` or `lightness` is null')
        } else console.log('`hue` is null')
      } else console.log('`context` is null')
    } else console.log('`canvas.current` is null')
  }

  const [mouseX, setMouseX] = useState<number | null>(null)
  const [mouseY, setMouseY] = useState<number | null>(null)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvas.current !== null) {
      let {left, top} = canvas.current.getBoundingClientRect()

      let x = e.clientX - left
      let y = e.clientY - top

      setMouseX(x)
      setMouseY(y)

      if (isDragging && canvas.current !== null) {
        let {width, height} = canvas.current
        setSaturation(x / width)
        setLightness(y / height)
      }
    }
  }
  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvas.current !== null) {
      let {width, height} = canvas.current
      let {left, top} = canvas.current.getBoundingClientRect()

      let x = e.clientX - left
      let y = e.clientY - top

      if (isPointOnHandle(x, y, width, height, saturation, lightness))
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
    if (canvas.current !== null && mouseX !== null && mouseY !== null) {
      let {width, height} = canvas.current
      setIsHovering(
        isPointOnHandle(mouseX, mouseY, width, height, saturation, lightness)
      )
    }
  }, [mouseX, mouseY, saturation, lightness])

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

export default ColorPicker
