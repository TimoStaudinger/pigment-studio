import React, {useEffect} from 'react'
import * as d3 from 'd3'

import {convertLabToHex, convertLabToRGBStrict} from '../../util/color'
import {Shade} from '../../types/color'

import styles from './LightnessChart.module.css'

const height = 200
const width = 400

const draw = (containerId: string, shades: Shade[]) => {
  let container = document.querySelector(`#chart-${containerId}`)
  if (container) container.innerHTML = ''

  let xScale = d3
    .scaleLinear()
    .domain([-0.5, shades.length - 0.5])
    .range([0, width])

  let yScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height, 0])

  let svg = d3
    .select(`#chart-${containerId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  let defs = svg.append('defs')

  let line = d3
    .line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d[1]))
    .curve(d3.curveMonotoneX)

  // svg
  //   .append('g')
  //   .attr('class', 'x axis')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(d3.axisBottom(xScale))

  // svg
  //   .append('g')
  //   .attr('class', 'y axis')
  //   .call(d3.axisLeft(yScale))

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

  let pattern = defs
    .append('pattern')
    .attr('id', `${containerId}-diagonal-stripes`)
    .attr('width', '3')
    .attr('height', '4')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('patternTransform', 'rotate(60)')
  pattern
    .append('rect')
    .attr('width', '1')
    .attr('height', '4')
    .attr('transform', 'translate(0,0)')
    .attr('fill', '#c1ccd9')

  svg
    .append('path')
    .datum(shades.map((shade, i): [number, number] => [i, shade.lab.l]))
    .attr('stroke-width', 4)
    .attr('fill', 'none')
    .attr('stroke', `url(#${containerId}-linear-gradient)`)
    .attr('class', 'line')
    .attr('d', line)

  svg
    .selectAll('.dot')
    .data(shades.map((shade, i): [number, number] => [i, shade.lab.l]))
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
    .data(shades.map((shade, i): [number, number] => [i, shade.lab.l]))
    .enter()
    .append('circle')
    .attr('class', 'dot-main')
    .attr('fill', d => '#' + convertLabToHex(shades[d[0]].lab))
    .attr('stroke', d => '#fff')
    .attr('cx', (d, i) => xScale(i))
    .attr('cy', d => yScale(d[1]))
    .attr('r', 4)
  // .on('mouseover', function(a, b, c) {
  //   console.log(a)
  //   this.attr('class', 'focus')
  // })

  // svg
  // .append('g')
  // .attr('class', 'axislabels')
  // .attr('style', 'transform: translateY(0)')
  // .call(d3.axisBottom(xScale).tickFormat(d => String(d)))
  // .call(g => {
  //   g.selectAll('.domain').remove()
  //   g.selectAll('.tick line').remove()
  //   g.selectAll('.tick').attr('style')
  // })

  const calculateBadAreasMin = (shades: Shade[], fixed: 'l' | 'c' | 'h') => {
    let badAreas = shades.map(shade => {
      for (let l = 0; l <= 100; l++) {
        let rgb = convertLabToRGBStrict({...shade.lab, l})
        if (rgb === null) continue

        return {min: 0, max: l - 1}
      }

      return {min: 0, max: 0}
    })

    return badAreas
  }
  const calculateBadAreasMax = (shades: Shade[], fixed: 'l' | 'c' | 'h') => {
    let badAreas = shades.map(shade => {
      for (let l = 100; l >= 0; l--) {
        let rgb = convertLabToRGBStrict({...shade.lab, l})
        if (rgb === null) continue

        return {min: l + 1, max: 100}
      }

      return {min: 100, max: 100}
    })

    console.log(badAreas)

    return badAreas
  }

  const drawArea = (area: {min: number; max: number}[]) => {
    const calculateArea = d3
      .area<{min: number; max: number}>()
      .x((value, i) => xScale(i))
      .y0(value => yScale(value.min))
      .y1(value => yScale(value.max))
      .curve(d3.curveCardinal)
    svg
      .append('path')
      .attr('fill', `url(#${containerId}-diagonal-stripes)`)
      .attr('stroke', '#c1ccd9')
      .attr('opacity', 0.5)
      .attr('class', 'pointer-events-none')
      // @ts-ignore
      .attr('d', calculateArea(area))
  }

  let badAreasMin = calculateBadAreasMin(shades, 'l')
  let badAreasMax = calculateBadAreasMax(shades, 'l')

  drawArea(badAreasMin)
  drawArea(badAreasMax)
}

interface Props {
  id: string
  shades: Shade[]
}

const LightnessChart = ({id, shades}: Props) => {
  useEffect(() => {
    draw(id, shades)
  }, [shades, id])

  return (
    <div>
      <div className={styles.title}>Lightness</div>
      <div className={styles.values}>
        {shades.map(shade => (
          <div className={styles.value}>{Math.round(shade.lab.l)}</div>
        ))}
      </div>
      <div className={styles.chart} id={`chart-${id}`}></div>
    </div>
  )
}

export default LightnessChart
