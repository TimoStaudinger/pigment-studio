import React, {useEffect, useState} from 'react'
import {useMeasure} from 'react-use'
import {labToHex, Lab, Hex} from '@pigmentstudio/convert'

import {
  getXScale,
  getYScale,
  addOrUpdateBadAreaPattern,
  addOrUpdateLinearGradient,
  addOrUpdateSVG,
  addOrUpdateLine,
  addOrUpdateDefs,
  addOrUpdateDots,
  addOrUpdateAreas
} from './chartUtils'

import styles from './Chart.module.css'
import {Shade} from '../../../types/color'
import NumberInput from '../../common/NumberInput'

const height = 200

const draw = (
  containerId: string,
  shades: Shade[],
  badAreas: {min: number; max: number}[][],
  maxValue: number,
  minValue: number,
  setIsInteracting: (isInteracting: boolean) => void,
  updateValue: (i: number, value: number) => void,
  convertLabToValue: (lab: Lab) => number,
  convertValueToHex: (i: number, value: number) => Hex,
  width: number
) => {
  let xScale = getXScale(shades.length, width)
  let yScale = getYScale(minValue, maxValue, height)

  let svg = addOrUpdateSVG(containerId, width, height)

  let defs = addOrUpdateDefs(svg)
  addOrUpdateLinearGradient(
    defs,
    `${containerId}-color-gradient`,
    shades.map(shade => labToHex(shade.lab))
  )
  addOrUpdateBadAreaPattern(defs, `${containerId}-bad-area-pattern`)

  addOrUpdateAreas(
    badAreas,
    `${containerId}-bad-area-pattern`,
    svg,
    xScale,
    yScale
  )

  addOrUpdateLine(
    shades.map(shade => convertLabToValue(shade.lab)),
    `${containerId}-color-gradient`,
    svg,
    xScale,
    yScale
  )

  addOrUpdateDots(
    shades.map(shade => [convertLabToValue(shade.lab), labToHex(shade.lab)]),
    svg,
    xScale,
    yScale,
    minValue,
    maxValue,
    setIsInteracting,
    updateValue,
    convertValueToHex
  )
}

interface Props {
  id: string
  shades: Shade[]
  updateValue: (i: number, value: number) => void
  convertLabToValue: (lab: Lab) => number
  convertValueToHex: (i: number, value: number) => Hex
  badAreas: {min: number; max: number}[][]
  maxValue: number
  minValue: number
  title: string
}

const Chart = ({
  id,
  shades,
  updateValue,
  convertLabToValue,
  convertValueToHex,
  badAreas,
  maxValue,
  minValue,
  title
}: Props) => {
  let [isInteracting, setIsInteracting] = useState(false)
  const [ref, {width}] = useMeasure()

  useEffect(() => {
    if (!isInteracting)
      draw(
        `chart-${id}`,
        shades,
        badAreas,
        maxValue,
        minValue,
        setIsInteracting,
        updateValue,
        convertLabToValue,
        convertValueToHex,
        width
      )
  }, [
    shades,
    id,
    isInteracting,
    maxValue,
    minValue,
    badAreas,
    convertLabToValue,
    convertValueToHex,
    updateValue,
    width
  ])

  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.values}>
        {shades.map((shade, i) => (
          <div className={styles.value}>
            <NumberInput
              value={convertLabToValue(shade.lab)}
              onChange={value => {
                updateValue(i, value)
                return value >= minValue && value <= maxValue
              }}
              allowMouseWheelChanges
            />
          </div>
        ))}
      </div>
      <div className={styles.chart} id={`chart-${id}`} ref={ref}></div>
    </div>
  )
}

export default Chart
