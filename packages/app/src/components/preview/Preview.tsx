import React from 'react'
import {labToRGB, Lab} from '@pigmentstudio/convert'

import {Color} from '../../types/color'
import ColorSlot from './ColorSlot'

import styles from './Preview.module.css'

const labToCSS = (lab: Lab) => {
  let {r, g, b} = labToRGB(lab)
  return `rgb(${r}, ${g}, ${b})`
}

const makeGetColor = (colors: Color[]) => (
  colorName: string,
  shadeName: string
) =>
  labToCSS(
    colors
      .find(color => color.name === colorName)
      ?.shades.find(shade => shade.name === shadeName)?.lab as Lab
  )

interface Props {
  colors: Color[]
}

const Preview = ({colors}: Props) => {
  const getColor = makeGetColor(colors)

  return (
    <div
      className={styles.background}
      style={{backgroundColor: getColor('Neutral', '100')}}
    >
      <div
        style={{backgroundColor: getColor('Primary 1', '900')}}
        className={styles.header}
      >
        <h1 style={{color: getColor('Primary 1', '000')}}>My Portfolio</h1>
        <p
          className={styles.currentValue}
          style={{color: getColor('Primary 2', '400')}}
        >
          <ColorSlot colors={colors} defaultColorName={['Primary 1', '400']}>
            {(color: string) => (
              <span style={{color}}>Current Portfolio Value </span>
            )}
          </ColorSlot>
          <br />
          USD 1,645,091.49
        </p>
      </div>

      <div className={styles.body}>
        <div
          style={{
            backgroundColor: getColor('Primary 2', '000'),
            borderColor: getColor('Primary 2', '800')
          }}
          className={styles.search}
        />

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <div
              className={styles.panel}
              style={{
                backgroundColor: getColor('Neutral', '000'),
                borderColor: getColor('Neutral', '300'),
                boxShadow: `1px 1px 2px 1px ${getColor('Neutral', '200')}`
              }}
            >
              <h2 style={{color: getColor('Primary 1', '900')}}>Basic Info</h2>
            </div>
            <div
              className={styles.panel}
              style={{
                backgroundColor: getColor('Neutral', '000'),
                borderColor: getColor('Neutral', '300'),
                boxShadow: `1px 1px 2px 1px ${getColor('Neutral', '200')}`
              }}
            >
              <h2 style={{color: getColor('Primary 1', '900')}}>
                Asset Allocation
              </h2>
            </div>
          </div>
          <div className={styles.stocks}>
            <div
              className={styles.panel}
              style={{
                backgroundColor: getColor('Neutral', '000'),
                borderColor: getColor('Neutral', '300'),
                boxShadow: `1px 1px 2px 1px ${getColor('Neutral', '200')}`
              }}
            >
              <h2 style={{color: getColor('Primary 1', '900')}}>Stocks</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
