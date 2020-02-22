import React, {useRef, useEffect, useState} from 'react'

import {convertHSLtoRGB} from '../../util/color'
import {convertCoordsToOffset} from '../../util/canvas'
import {HSL} from '../../types/color'

import styles from './HuePicker.module.css'

const canvasWidth = 300
const canvasHeight = 30

interface Props {
  hsl: HSL
  setHSL: (hsl: HSL) => void
}

const HuePicker = ({hsl, setHSL}: Props): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)

  const canvas = useRef<HTMLCanvasElement>(null)

  const render = () => {
    let {hue} = hsl

    if (canvas.current !== null) {
      let context = canvas.current.getContext('2d')

      let {width, height} = canvas.current

      if (context !== null) {
        context.clearRect(0, 0, width, height)

        let imageData = context.getImageData(0, 0, width, height)

        for (let y = 0; y < height - 10; y++) {
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

        let x = (hue / 360) * width
        let yOffset = height - 10

        context.beginPath()
        context.moveTo(x, yOffset)
        context.fillStyle = '#eee'
        context.lineTo(x + 10, height)
        context.lineTo(x - 10, height)
        context.fill()
      } else console.log('`context` is null')
    } else console.log('`canvas.current` is null')
  }

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvas.current !== null) {
      let {left} = canvas.current.getBoundingClientRect()
      let x = e.clientX - left

      if (isDragging && canvas.current !== null) {
        let {width} = canvas.current

        setHSL({...hsl, hue: (x / width) * 360})
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

      setHSL({...hsl, hue: (x / width) * 360})
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

export default HuePicker
