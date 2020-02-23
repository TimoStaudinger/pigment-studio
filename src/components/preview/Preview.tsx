import React from 'react'
import {Color, HSL} from '../../types/color'

import styles from './Preview.module.css'

const hslToCSS = (hsl: HSL) =>
  `hsl(${hsl.hue}, ${Math.round(hsl.saturation * 100)}%, ${Math.round(
    hsl.lightness * 100
  )}%)`

const makeGetColor = (colors: Color[]) => (
  colorName: string,
  shadeName: string
) =>
  hslToCSS(
    colors
      .find(color => color.name === colorName)
      ?.shades.find(shade => shade.name === shadeName)?.hsl as HSL
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
          <span style={{color: getColor('Primary 1', '400')}}>
            Current Portfolio Value{' '}
          </span>
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
