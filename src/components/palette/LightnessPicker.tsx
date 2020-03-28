import React, {useRef, useEffect, useState, useCallback} from 'react'
import {useMeasure} from 'react-use'

import {convertHSLtoRGB, convertLabToRGB} from '../../util/color'
import {convertCoordsToOffset} from '../../util/canvas'
import {Lab} from '../../types/color'

import styles from './LightnessPicker.module.css'

interface Props {
  lab: Lab
  setLab: (hsl: Lab) => void
  minLightness?: number
  maxLightness?: number
  height?: number
  specificShade?: boolean
}

const LightnessPicker = ({
  lab,
  setLab,
  minLightness = 0,
  maxLightness = 359,
  height = 30,
  specificShade
}: Props): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)
  const [bufferedMinHue, setBufferedMinHue] = useState(minLightness)
  const [bufferedMaxHue, setBufferedMaxHue] = useState(maxLightness)

  useEffect(() => {
    if (!isDragging) {
      setBufferedMaxHue(maxLightness)
      setBufferedMinHue(minLightness)
    }
  }, [maxLightness, minLightness, isDragging])

  const canvasHeight = height
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [ref, {width}] = useMeasure()
  useEffect(() => setCanvasWidth(width), [width])

  const canvas = useRef<HTMLCanvasElement>(null)

  const render = useCallback(() => {
    if (canvas.current !== null) {
      let context = canvas.current.getContext('2d')

      let {width, height} = canvas.current

      if (context !== null) {
        context.clearRect(0, 0, width, height)

        let imageData = context.getImageData(0, 0, width, height)

        for (let y = 0; y < height - 10; y++) {
          for (let x = 0; x < width; x++) {
            const pixelOffset = convertCoordsToOffset(x, y, width)

            // let hue =
            //   (x / width) * (bufferedMaxHue - bufferedMinHue) + bufferedMinHue
            // let saturation = specificShade ? lab.saturation : 1
            // let lightness = specificShade ? lab.lightness : 0.5

            let {r, g, b} = convertLabToRGB({...lab, l: (x / width) * 100})

            imageData.data[pixelOffset + 0] = r
            imageData.data[pixelOffset + 1] = g
            imageData.data[pixelOffset + 2] = b
            imageData.data[pixelOffset + 3] = 255
          }
        }

        context.putImageData(imageData, 0, 0)

        let x = (lab.l / 100) * width
        // ((hue - bufferedMinHue) / (bufferedMaxHue - bufferedMinHue)) * width
        let yOffset = height - 10

        context.beginPath()
        context.moveTo(x, yOffset)
        context.fillStyle = '#eee'
        context.lineTo(x + 10, height)
        context.lineTo(x - 10, height)
        context.fill()
      } else console.log('`context` is null')
    } else console.log('`canvas.current` is null')
  }, [lab])

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvas.current !== null) {
      let {left} = canvas.current.getBoundingClientRect()
      let x = e.clientX - left

      if (isDragging && canvas.current !== null) {
        let {width} = canvas.current

        setLab({
          ...lab,
          l: (x / width) * 100
        })
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

      setLab({
        ...lab,
        l: (x / width) * 100
      })
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
    <div className={styles.picker} ref={ref}>
      {canvasWidth > 0 && (
        <canvas
          height={canvasHeight}
          width={canvasWidth}
          ref={canvas}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></canvas>
      )}
    </div>
  )
}

export default LightnessPicker
