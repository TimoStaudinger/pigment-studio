import React, {useRef, useEffect, useState} from 'react'
import {useMeasure} from 'react-use'
import classnames from 'classnames'
import {labToRGB, Lab} from '@pigmentstudio/convert'

import {convertCoordsToOffset} from '../../../util/canvas'
import {isPointOnHandle2D} from '../../../util/coordinates'
import {throttle} from '../../../util/throttle'

import styles from './ShadePicker.module.css'

const fractionToAB = (fraction: number) => fraction * 256 - 128
const abToFraction = (ab: number) => (ab + 128) / 256

interface Props {
  lab: Lab
  setLab: (lab: Lab) => void
}

const ShadePicker = ({lab, setLab}: Props): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false)

  const [canvasWidth, setCanvasWidth] = useState(0)
  const [ref, {width}] = useMeasure()
  useEffect(() => setCanvasWidth(width), [width])

  const canvas = useRef<HTMLCanvasElement | null>(null)

  const render = throttle(() => {
    if (canvas.current !== null) {
      let context = canvas.current.getContext('2d')

      let {width, height} = canvas.current

      if (context !== null) {
        context.clearRect(0, 0, width, height)

        let imageData = context.getImageData(0, 0, width, height)

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixelOffset = convertCoordsToOffset(x, y, width)

            let aFraction = x / width
            let bFraction = y / height

            let rgb = labToRGB(
              {
                l: lab.l,
                a: fractionToAB(aFraction),
                b: fractionToAB(bFraction)
              },
              true
            )

            if (rgb) {
              imageData.data[pixelOffset + 0] = rgb?.r ?? 255
              imageData.data[pixelOffset + 1] = rgb?.g ?? 0
              imageData.data[pixelOffset + 2] = rgb?.b ?? 0
              imageData.data[pixelOffset + 3] = 255
            }
          }
        }

        context.putImageData(imageData, 0, 0)

        if (!isDragging) {
          let {l, a, b} = lab
          let x = ((a + 128) / 256) * width
          let y = ((b + 128) / 256) * height

          let rgb = labToRGB(lab, true)

          context.beginPath()
          context.lineWidth = 1
          context.strokeStyle = l > 50 || rgb === null ? '#111' : '#fff'
          context.arc(x, y, 8, 0, Math.PI * 2, true)
          context.stroke()
        }
      } else console.log('`context` is null')
    } else console.log('`canvas.current` is null')
  }, 15)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvas.current !== null) {
      let {left, top} = canvas.current.getBoundingClientRect()

      let x = e.clientX - left
      let y = e.clientY - top

      if (isDragging && canvas.current !== null) {
        let {width, height} = canvas.current
        setLab({
          ...lab,
          a: fractionToAB(x / width),
          b: fractionToAB(y / height)
        })
      } else setIsDragging(false)
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

      if (
        isPointOnHandle2D(
          x,
          y,
          width,
          height,
          abToFraction(lab.a),
          abToFraction(lab.b)
        )
      ) {
        setIsDragging(true)
      }
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
    if (canvas.current && !isDragging) render()
  })

  useEffect(() => {
    if (canvas.current) render()
  }, [isDragging]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={classnames(styles.picker, {
        [styles.isDraggingOverLight]: isDragging && lab.l >= 50,
        [styles.isDraggingOverDark]: isDragging && lab.l < 50
      })}
      ref={ref}
    >
      {canvasWidth > 0 && (
        <canvas
          height={canvasWidth}
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

export default ShadePicker
