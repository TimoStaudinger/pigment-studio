import React, {useEffect} from 'react'
import * as d3 from 'd3'

import {convertLabToHex, convertLabToRGBStrict} from '../../util/color'
import {Shade, Lab} from '../../types/color'

import styles from './LightnessChart.module.css'

const height = 200
const width = 400

const radToDeg = (rad: number) => (rad / Math.PI) * 180 + (rad > 0 ? 0 : 360)
const calculateHue = ({a, b}: Lab) => radToDeg(Math.atan2(b, a))

const chromaMax = 128 * Math.sqrt(2)
const chromaMin = 0
const calculateChroma = ({a, b}: Lab) => Math.sqrt(a * a + b * b)

const applyChromaToLab = (lab: Lab, chroma: number) => {
  let hue = calculateHue(lab)

  let a = chroma * Math.cos((hue / 180) * Math.PI)
  let b = chroma * Math.sin((hue / 180) * Math.PI)

  return {...lab, a, b}
}

const draw = (containerId: string, shades: Shade[]) => {
  let container = document.querySelector(`#chart-chroma-${containerId}`)
  if (container) container.innerHTML = ''

  let xScale = d3
    .scaleLinear()
    .domain([-0.5, shades.length - 0.5])
    .range([0, width])

  let yScale = d3
    .scaleLinear()
    .domain([chromaMin, chromaMax])
    .range([height, 0])

  let svg = d3
    .select(`#chart-chroma-${containerId}`)
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

  svg
    .append('path')
    .datum(
      shades.map((shade, i): [number, number] => [
        i,
        calculateChroma(shade.lab)
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
        calculateChroma(shade.lab)
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
        calculateChroma(shade.lab)
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
      for (let c = chromaMin; c <= chromaMax; c++) {
        let rgb = convertLabToRGBStrict(applyChromaToLab(shade.lab, c))
        if (rgb === null) continue

        return {min: chromaMin, max: c - 1}
      }

      return {min: chromaMin, max: chromaMin}
    })

    return badAreas
  }
  const calculateBadAreasMax = (shades: Shade[], fixed: 'l' | 'c' | 'h') => {
    let badAreas = shades.map(shade => {
      for (let c = chromaMax; c >= chromaMin; c--) {
        let rgb = convertLabToRGBStrict(applyChromaToLab(shade.lab, c))
        if (rgb === null) continue

        return {min: c + 1, max: chromaMax}
      }

      return {min: chromaMax, max: chromaMax}
    })

    console.log(badAreas)

    return badAreas
  }

  let badAreasMin = calculateBadAreasMin(shades, 'c')
  let badAreasMax = calculateBadAreasMax(shades, 'c')

  console.log(badAreasMin, badAreasMax)

  const areaMin = d3
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
    .attr('d', areaMin(badAreasMin))

  const areaMax = d3
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
    .attr('d', areaMax(badAreasMax))
}

interface Props {
  id: string
  shades: Shade[]
}

const ChromaChart = ({id, shades}: Props) => {
  useEffect(() => {
    draw(id, shades)
  }, [shades, id])

  return (
    <div>
      {' '}
      <div className={styles.title}>Chroma</div>
      <div className={styles.values}>
        {shades.map(shade => (
          <div className={styles.value}>
            {Math.round(calculateChroma(shade.lab))}
          </div>
        ))}
      </div>
      <div className={styles.chart} id={`chart-chroma-${id}`}></div>
    </div>
  )
}

export default ChromaChart
