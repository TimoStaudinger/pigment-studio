import React, {useEffect, useState} from 'react'
import * as d3 from 'd3'
import {useMeasure} from 'react-use'

import {convertLabToHex} from '../../util/color'
import {Shade, Lab} from '../../types/color'

import styles from './Chart.module.css'

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
  width: number
) => {
  let container = document.querySelector(`#${containerId}`)
  if (container) container.innerHTML = ''

  let xScale = d3
    .scaleLinear()
    .domain([-0.5, shades.length - 0.5])
    .range([0, width])

  let yScale = d3
    .scaleLinear()
    .domain([minValue, maxValue])
    .range([height, 0])

  let svg = d3
    .select(`#${containerId}`)
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

  badAreas.forEach(drawArea)

  svg
    .append('path')
    .datum(
      shades.map((shade, i): [number, number] => [
        i,
        convertLabToValue(shade.lab)
      ])
    )
    .attr('stroke-width', 4)
    .attr('fill', 'none')
    .attr('stroke', `url(#${containerId}-linear-gradient)`)
    .attr('class', 'line')
    .attr('d', line)

  svg
    .selectAll('.dot')
    .data(
      shades.map((shade, i): [number, number] => [
        i,
        convertLabToValue(shade.lab)
      ])
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
      shades.map((shade, i): [number, number] => [
        i,
        convertLabToValue(shade.lab)
      ])
    )
    .enter()
    .append('circle')
    .attr('class', 'dot-main')
    .attr('fill', d => '#' + convertLabToHex(shades[d[0]].lab))
    .attr('stroke', d => '#fff')
    .attr('cx', (d, i) => xScale(i))
    .attr('cy', d => yScale(d[1]))
    .attr('r', 4)
    .on('mouseenter', (_, i, dots) => d3.select(dots[i]).attr('r', 7))
    .on('mouseleave', (_, i, dots) => d3.select(dots[i]).attr('r', 4))
    .call(
      d3
        .drag<SVGCircleElement, [number, number]>()
        .on('start', (_, i, dots) => {
          setIsInteracting(true)
          d3.select(dots[i]).attr('fill', 'limegreen')
          console.log('asdf')
        })
        .on('drag', (d, i, dots) => {
          const newY = yScale.invert(d3.event.y)

          if (newY > maxValue || newY < minValue) return

          const dot = dots[i]
          d3.select(dot).attr('cy', yScale(newY))

          // @ts-ignore
          const dotBorder = svg.selectAll('.dot-border')._groups[0][i]
          d3.select(dotBorder).attr('cy', yScale(newY))

          console.log('foo')

          updateValue(i, yScale.invert(d3.event.y))

          // d.x = newY
          svg
            .select('.line')
            .datum(
              shades.map((shade, i): [number, number] => [
                i,
                convertLabToValue(shade.lab)
              ])
            )
            .attr('d', line)
        })
        .on('end', () => setIsInteracting(false))
    )

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
}

interface Props {
  id: string
  shades: Shade[]
  updateValue: (i: number, value: number) => void
  convertLabToValue: (lab: Lab) => number
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
    updateValue,
    width
  ])

  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.values}>
        {shades.map(shade => (
          <div className={styles.value}>
            {convertLabToValue(shade.lab).toFixed(1)}
          </div>
        ))}
      </div>
      <div className={styles.chart} id={`chart-${id}`} ref={ref}></div>
    </div>
  )
}

export default Chart
