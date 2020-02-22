import React, {useRef, useEffect, useState} from 'react'

import {convertCoordsToOffset} from '../../util/canvas'
import {convertHSLtoRGB} from '../../util/color'
import {HSL} from '../../types/color'

import styles from './ShadePicker.module.css'

const canvasWidth = 300
const canvasHeight = 300

interface Props {
  hsl: HSL
  setHSL: (hsl: HSL) => void
}

const ShadePicker = ({hsl, setHSL}: Props): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)

  const canvas = useRef<HTMLCanvasElement | null>(null)

  const render = () => {
    if (canvas.current !== null) {
      let context = canvas.current.getContext('2d')

      let {width, height} = canvas.current

      if (context !== null) {
        let {hue, saturation, lightness} = hsl

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

          let x = saturation * width
          let y = (1 - lightness) * height

          context.beginPath()
          context.lineWidth = 1
          context.strokeStyle = lightness > 0.5 ? '#111' : '#fff'
          context.arc(x, y, 8, 0, Math.PI * 2, true)
          context.stroke()
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
        setHSL({...hsl, saturation: x / width, lightness: 1 - y / height})
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

      setHSL({...hsl, saturation: x / width, lightness: 1 - y / height})
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