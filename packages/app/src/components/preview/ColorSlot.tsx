import React, {ReactNode, useState} from 'react'
import {useDrop} from 'react-dnd'
import classnames from 'classnames'
import {labToRGB, Lab} from '@pigmentstudio/convert'

import {Color, Shade} from '../../types/color'

import styles from './ColorSlot.module.css'

const labToCSS = (lab: Lab) => {
  let {r, g, b} = labToRGB(lab)
  return `rgb(${r}, ${g}, ${b})`
}

const getColor = (colors: Color[], colorName: string, shadeName: string) =>
  colors
    .find(color => color.name === colorName)
    ?.shades.find(shade => shade.name === shadeName) as Shade

interface Props {
  colors: Color[]
  children: (color: string) => ReactNode
  defaultColorName: [string, string]
}

const ColorSlot = ({defaultColorName, colors, children}: Props) => {
  const [shade, setShade] = useState<Shade>(
    getColor(colors, defaultColorName[0], defaultColorName[1])
  )

  const [{canDrop, isOver}, drop] = useDrop({
    accept: 'color',
    drop: () => ({name: 'Dustbin'}),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const [
    {canDrop: canDropBackground, isOver: isOverBackground},
    dropBackground
  ] = useDrop({
    accept: 'color',
    drop: () => ({name: 'Dustbin'}),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const [{canDrop: canDropBorder, isOver: isOverBorder}, dropBorder] = useDrop({
    accept: 'color',
    drop: () => ({name: 'Dustbin'}),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  return (
    <span
      className={classnames(styles.potentiallyDroppableElement, {
        [styles.droppableElement]: canDrop
      })}
      style={{}}
      ref={drop}
    >
      {children(labToCSS(shade.lab))}

      {canDrop && (isOver || isOverBackground || isOverBorder) && (
        <span className={styles.attributeDropZones}>
          <span
            className={classnames(styles.attributeDropZone, {
              [styles.dropping]: isOverBackground
            })}
            ref={dropBackground}
            style={{}}
          >
            Background
          </span>
          <span
            className={classnames(styles.attributeDropZone, {
              [styles.dropping]: isOverBorder
            })}
            ref={dropBorder}
            style={{}}
          >
            Border
          </span>
        </span>
      )}
    </span>
  )
}

export default ColorSlot
