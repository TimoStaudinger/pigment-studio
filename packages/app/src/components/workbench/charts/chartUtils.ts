import * as d3 from 'd3'
import {Hex} from '@pigmentstudio/convert'

export const addOrUpdateSVG = (
  containerId: string,
  width: number,
  height: number
): d3.Selection<SVGSVGElement, unknown, HTMLElement, any> => {
  let container = d3.select(`#${containerId}`)

  let svg = container.select<SVGSVGElement>('svg')
  if (!svg.size()) svg = container.append('svg')
  svg.attr('width', width).attr('height', height)

  return svg
}

export const addOrUpdateDefs = (
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
): d3.Selection<SVGDefsElement, unknown, HTMLElement, any> => {
  let existingDefs = svg.select<SVGDefsElement>('defs')
  if (existingDefs.size()) return existingDefs

  return svg.append('defs')
}

export const addOrUpdateBadAreaPattern = (
  defs: d3.Selection<SVGDefsElement, unknown, HTMLElement, any>,
  id: string
) => {
  defs
    .append('pattern')
    .attr('id', id)
    .attr('width', '3')
    .attr('height', '4')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('patternTransform', 'rotate(60)')
    .append('rect')
    .attr('width', '1')
    .attr('height', '4')
    .attr('transform', 'translate(0,0)')
    .attr('fill', '#c1ccd9')
}

export const addOrUpdateLinearGradient = (
  defs: d3.Selection<SVGDefsElement, unknown, HTMLElement, any>,
  id: string,
  colors: string[]
) => {
  let gradient = defs.select<SVGLinearGradientElement>('linearGradient')
  if (!gradient.size()) gradient = defs.append('linearGradient')

  gradient.attr('id', id)

  let stops = gradient.selectAll('stop').data(colors)
  stops
    .enter()
    .append('stop')
    .attr('offset', (_, i) => `${(100 * i) / (colors.length - 1)}%`)
    .attr('stop-color', (d) => '#' + d)
  stops.exit().remove()
  stops
    .transition()
    .duration(100)
    .attr('offset', (_, i) => `${(100 * i) / (colors.length - 1)}%`)
    .attr('stop-color', (d) => '#' + d)
}

export const getXScale = (itemCount: number, width: number) =>
  d3
    .scaleLinear()
    .domain([-0.5, itemCount - 0.5])
    .range([0, width])

export const getYScale = (minValue: number, maxValue: number, height: number) =>
  d3.scaleLinear().domain([minValue, maxValue]).range([height, 0])

export const getLineGenerator = (
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>
) =>
  d3
    .line<number>()
    .x((_, i) => xScale(i))
    .y((d) => yScale(d))
    .curve(d3.curveMonotoneX)

export const addOrUpdateLine = (
  values: number[],
  gradientId: string,
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>
) => {
  let lineGenerator = getLineGenerator(xScale, yScale)

  if (svg.select('.line').size()) {
    svg.select('.line').attr('stroke', `url(#${gradientId})`)
    svg
      .select('.line')
      .datum(values)
      .transition()
      .duration(100)
      .attr('d', lineGenerator)
  } else {
    svg
      .append('path')
      .datum(values)
      .attr('stroke-width', 4)
      .attr('fill', 'none')
      .attr('stroke', `url(#${gradientId})`)
      .attr('class', 'line')
      .attr('d', lineGenerator)
  }
}

export const addOrUpdateDots = (
  values: [number, string][],
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  minValue: number,
  maxValue: number,
  setIsInteracting: (isInteracting: boolean) => void,
  updateValue: (i: number, value: number) => void,
  convertValueToHex: (i: number, value: number) => Hex
) => {
  let groups = svg.selectAll('g.dot').data(values)

  groups.select<SVGCircleElement>('circle.dot-main').call(
    d3
      .drag<SVGCircleElement, [number, string]>()
      .on('start', (_, i, dots) => {
        setIsInteracting(true)
      })
      .on('drag', (d, i, dots) => {
        const newVal = yScale.invert(d3.event.y)

        if (newVal > maxValue || newVal < minValue) return

        const dot = dots[i]
        d3.select(dot).attr('cy', yScale(newVal))

        d3.select(svg.selectAll(`g.dot`).nodes()[i])
          .select('circle.dot-border')
          .attr('cy', yScale(newVal))

        let line = svg.select<SVGPathElement>('path.line')
        line
          .datum(
            (line.datum() as number[]).map((val, curr) =>
              i === curr ? newVal : val
            )
          )
          .attr('d', getLineGenerator(xScale, yScale))

        let currentColor = `#${convertValueToHex(i, newVal)}`
        let gradient = svg.selectAll('linearGradient stop')
        d3.select(gradient.nodes()[i]).attr('stop-color', currentColor)
        d3.select(dots[i]).attr('fill', currentColor)

        updateValue(i, yScale.invert(d3.event.y))
      })
      .on('end', () => setIsInteracting(false))
  )

  let groupsEnter = groups.enter().append('g').attr('class', 'dot')
  groupsEnter
    .append('circle')
    .attr('class', 'dot-border')
    .attr('fill', (_) => '#fff')
    .attr('stroke', (_) => '#ccc')
    .attr('cx', (_, i) => xScale(i))
    .attr('cy', (d) => yScale(d[0]))
    .attr('r', 5)
  groupsEnter
    .append('circle')
    .attr('class', 'dot-main')
    .attr('fill', (d) => '#' + d[1])
    .attr('stroke', (_) => '#fff')
    .attr('cx', (_, i) => xScale(i))
    .attr('cy', (d) => yScale(d[0]))
    .attr('r', 4)
    .on('mouseenter', (_, i, dots) => d3.select(dots[i]).attr('r', 7))
    .on('mouseleave', (_, i, dots) => d3.select(dots[i]).attr('r', 4))

  let transition = groups.transition().duration(100)
  transition
    .select('.dot-border')
    .attr('cx', (_, i) => xScale(i))
    .attr('cy', (d) => yScale(d[0]))
  transition
    .select('.dot-main')
    .attr('fill', (d) => '#' + d[1])
    .attr('cx', (_, i) => xScale(i))
    .attr('cy', (d) => yScale(d[0]))
  let groupsExit = groups.exit().remove()
  groupsExit.selectAll('circle').attr('r', 0)
}

export const addOrUpdateAreas = (
  areas: {min: number; max: number}[][],
  fillId: string,
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>
) => {
  const calculateArea = d3
    .area<{min: number; max: number}>()
    .x((_, i) => xScale(i))
    .y0((value) => yScale(value.min))
    .y1((value) => yScale(value.max))
    .curve(d3.curveCardinal)

  let groups = svg.selectAll('path.area').data(areas)

  groups
    .enter()
    .insert('path', 'g')
    .attr('class', 'area')
    .attr('fill', `url(#${fillId})`)
    .attr('stroke', '#c1ccd9')
    .attr('opacity', 0.5)
    .attr('d', calculateArea)

  groups.transition().duration(100).attr('d', calculateArea)

  groups.exit().remove()
}
