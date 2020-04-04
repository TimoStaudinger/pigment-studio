import {useLocalStorage} from 'react-use'

import {Palette} from '../types/color'
import {Lab} from '@pigmentstudio/convert'
import {generateFromTemplate, generateBlank} from './sample'

interface UsePalettes {
  palettes: Palette[]
  palette: Palette | null
  setLab: (
    lab: Lab,
    updatedColorIndex?: number,
    updatedShadeIndex?: number
  ) => void
  setPaletteName: (name: string) => void
  setColorName: (name: string, updatedColorIndex?: number) => void
  createNewPaletteFromTemplate: () => string
  createNewPaletteFromScratch: () => string
  deletePalette: () => void
}

const usePalettes = (
  paletteId: string | null,
  colorIndex: number | null,
  shadeIndex: number | null
): UsePalettes => {
  const [palettes, setPalettes] = useLocalStorage<Palette[]>('palettes', [])

  const setLab = (
    lab: Lab,
    updatedColorIndex?: number,
    updatedShadeIndex?: number
  ) => {
    setPalettes((palettes) =>
      palettes.map((palette) =>
        paletteId === palette.id
          ? {
              ...palette,
              colors: palette.colors.map((color, currentColorIndex) =>
                currentColorIndex === (updatedColorIndex ?? colorIndex)
                  ? {
                      ...color,
                      shades: color.shades.map((shade, currentShadeIndex) =>
                        currentShadeIndex === (updatedShadeIndex ?? shadeIndex)
                          ? {...shade, lab: lab}
                          : shade
                      )
                    }
                  : color
              )
            }
          : palette
      )
    )
  }

  const setPaletteName = (name: string) =>
    setPalettes((palettes) =>
      palettes.map((palette) =>
        palette.id === paletteId ? {...palette, name} : palette
      )
    )

  const setColorName = (name: string, updatedColorIndex?: number) =>
    setPalettes((palettes) =>
      palettes.map((palette) =>
        palette.id === paletteId
          ? {
              ...palette,
              colors: palette.colors.map((color, i) =>
                i === (updatedColorIndex ?? colorIndex)
                  ? {
                      ...color,
                      name
                    }
                  : color
              )
            }
          : palette
      )
    )

  const createNewPaletteFromTemplate = () => {
    let newPalette = generateFromTemplate()
    setPalettes((palettes) => [...palettes, newPalette])
    return newPalette.id
  }
  const createNewPaletteFromScratch = () => {
    let newPalette = generateBlank()
    setPalettes((palettes) => [...palettes, newPalette])
    return newPalette.id
  }
  const deletePalette = () =>
    setPalettes((palettes) =>
      palettes.filter((palette) => palette.id !== paletteId)
    )

  let palette = palettes.find((palette) => palette.id === paletteId) ?? null

  return {
    palettes,
    palette,
    setLab,
    setPaletteName,
    setColorName,
    createNewPaletteFromTemplate,
    createNewPaletteFromScratch,
    deletePalette
  }
}

export default usePalettes
