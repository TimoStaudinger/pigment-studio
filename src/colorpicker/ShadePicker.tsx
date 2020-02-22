import React, {useRef, useEffect, useState} from 'react'
import {convertCoordsToOffset} from '../util/canvas'
import {convertHSLtoRGB} from '../util/color'

import styles from './ShadePicker.module.css'

const canvasWidth = 200
const canvasHeight = 200

interface Props {
  hue: number | null
  saturation: number | null
  lightness: number | null
  setSaturation: (saturation: number) => void
  setLightness: (lightness: number) => void
}

const ShadePicker = ({
  hue = null,
  saturation = null,
  lightness = null,
  setSaturation,
  setLightness
}: Props): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)

  const canvas = useRef<HTMLCanvasElement | null>(null)

  const render = () => {
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
            let y = (1 - lightness) * height

            context.beginPath()
            context.lineWidth = 1
            context.strokeStyle = lightness > 0.5 ? '#111' : '#fff'
            context.arc(x, y, 8, 0, Math.PI * 2, true)
            context.stroke()
          } else console.log('`saturation` or `lightness` is null')
        } else console.log('`hue` is null')
      } else console.log('`context` is null')
    } else console.log('`canvas.current` is null')
  }

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvas.current !== null) {
      let {left, top} = canvas.current.getBoundingClientRect()

      let x = e.clientX - left
      let y = e.clientY - top

      if (isDragging && canvas.current !== null) {
        let {width, height} = canvas.current
        setSaturation(x / width)
        setLightness(1 - y / height)
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

      setSaturation(x / width)
      setLightness(1 - y / height)
      setIsDragging(true)
    }
  }
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  useEffect(() => {
    if (canvas.current) render()
  })

  return (
    <div className={styles.picker}>
      <canvas
        height={canvasHeight}
        width={canvasWidth}
        ref={canvas}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  )
}

export default ShadePicker
