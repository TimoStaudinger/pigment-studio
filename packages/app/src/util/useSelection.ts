import {useParams, useHistory, generatePath} from 'react-router-dom'

interface UseSelection {
  paletteId: string | null
  selectedColorIndex: number | null
  selectedShadeIndex: number | null
  selectedView: number | null
  selectPalette: (paletteId: string) => void
  selectColor: (colorIndex: number) => void
  selectShade: (shadeIndex: number) => void
  selectView: (view: number) => void
  deselectPalette: () => void
  deselectColor: () => void
  deselectShade: () => void
}

const useSelection = (): UseSelection => {
  let history = useHistory()

  let {paletteId, colorIndex, shadeIndex, view} = useParams<{
    paletteId?: string
    colorIndex?: string
    shadeIndex?: string
    view?: string
  }>()

  const selectPalette = (paletteId: string) => history.push(`/${paletteId}`)
  const selectColor = (colorIndex: number, newShadeIndex?: number) =>
    history.push(
      generatePath('/:paletteId?/:colorIndex?/:shadeIndex?/:view?', {
        paletteId,
        shadeIndex: newShadeIndex ?? shadeIndex,
        view,
        colorIndex
      })
    )
  const selectShade = (shadeIndex: number) =>
    history.push(
      generatePath('/:paletteId?/:colorIndex?/:shadeIndex?/:view?', {
        paletteId,
        shadeIndex,
        view,
        colorIndex
      })
    )
  const selectView = (view: number) =>
    history.push(
      generatePath('/:paletteId?/:colorIndex?/:shadeIndex?/:view?', {
        paletteId,
        shadeIndex,
        view,
        colorIndex
      })
    )

  const deselectPalette = () => history.push('/')
  const deselectColor = () =>
    history.push(
      generatePath('/:paletteId?/:colorIndex?/:shadeIndex?/:view?', {
        paletteId
      })
    )
  const deselectShade = () =>
    history.push(
      generatePath('/:paletteId?/:colorIndex?/:shadeIndex?/:view?', {
        paletteId,
        colorIndex
      })
    )

  return {
    paletteId: paletteId ?? null,
    selectedColorIndex:
      colorIndex !== undefined ? parseInt(colorIndex, 10) : null,
    selectedShadeIndex:
      shadeIndex !== undefined ? parseInt(shadeIndex, 10) : null,
    selectedView: view !== undefined ? parseInt(view, 10) : null,
    selectPalette,
    selectColor,
    selectShade,
    selectView,
    deselectPalette,
    deselectColor,
    deselectShade
  }
}

export default useSelection
