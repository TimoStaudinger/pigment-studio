import React, {useEffect} from 'react'
import * as d3 from 'd3'

import {convertLabToHex} from '../../util/color'
import {Shade, Lab} from '../../types/color'

import styles from './LightnessChart.module.css'

const height = 200
const width = 400

const hueMax = 0
const hueMin = 360
const radToDeg = (rad: number) => (rad / Math.PI) * 180 + (rad > 0 ? 0 : 360)
const calculateHue = ({a, b}: Lab) => radToDeg(Math.atan2(b, a))

const draw = (containerId: string, shades: Shade[]) => {
  let container = document.querySelector(`#chart-hue-${containerId}`)
  if (container) container.innerHTML = ''

  let xScale = d3
    .scaleLinear()
    .domain([-0.5, shades.length - 0.5])
    .range([0, width])

  let yScale = d3
    .scaleLinear()
    .domain([hueMin, hueMax])
    .range([height, 0])

  let svg = d3
    .select(`#chart-hue-${containerId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  let defs = svg.append('defs')

  let line = d3
    .line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d[1]))
    .curve(d3.curveMonotoneX)

  const linearGradient = defs
    .append('linearGradient')
    .attr('id', `${containerId}-linear-gradient`)
    .attr('gradientTrasform', 'rotate(90)')
  shades.forEach((shade, i) => {
    linearGradient
      .append('stop')
      .attr('offset', `${(100 * i) / shades.length}%`)
      .attr('stop-color', '#' + convertLabToHex(shade.lab))
  })

  svg
    .append('path')
    .datum(
      shades.map((shade, i): [number, number] => [i, calculateHue(shade.lab)])
    )
    .attr('stroke-width', 4)
    .attr('fill', 'none')
    .attr('stroke', `url(#${containerId}-linear-gradient)`)
    .attr('class', 'line')
    .attr('d', line)

  svg
    .selectAll('.dot')
    .data(
      shades.map((shade, i): [number, number] => [i, calculateHue(shade.lab)])
    )
    .enter()
    .append('circle')
    .attr('class', 'dot-border')
    .attr('fill', d => '#fff')
    .attr('stroke', d => '#ccc')
    .attr('cx', (d, i) => xScale(i))
    .attr('cy', d => yScale(d[1]))
    .attr('r', 5)

  svg
    .selectAll('.dot')
    .data(
      shades.map((shade, i): [number, number] => [i, calculateHue(shade.lab)])
    )
    .enter()
    .append('circle')
    .attr('class', 'dot-main')
    .attr('fill', d => '#' + convertLabToHex(shades[d[0]].lab))
    .attr('stroke', d => '#fff')
    .attr('cx', (d, i) => xScale(i))
    .attr('cy', d => yScale(d[1]))
    .attr('r', 4)
}

interface Props {
  id: string
  shades: Shade[]
}

const HueChart = ({id, shades}: Props) => {
  useEffect(() => {
    draw(id, shades)
  }, [shades, id])

  return (
    <div>
      <div className={styles.title}>Hue</div>
      <div className={styles.values}>
        {shades.map(shade => (
          <div className={styles.value}>
            {Math.round(calculateHue(shade.lab))}
          </div>
        ))}
      </div>
      <div className={styles.chart} id={`chart-hue-${id}`}></div>
    </div>
  )
}

export default HueChart
