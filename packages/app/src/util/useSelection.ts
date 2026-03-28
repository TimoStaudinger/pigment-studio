import {useParams, useNavigate, generatePath} from 'react-router-dom'

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
  let navigate = useNavigate()

  let {paletteId, colorIndex, shadeIndex, view} = useParams<{
    paletteId?: string
    colorIndex?: string
    shadeIndex?: string
    view?: string
  }>() as {
    paletteId?: string
    colorIndex?: string
    shadeIndex?: string
    view?: string
  }

  const selectPalette = (paletteId: string) => navigate(`/${paletteId}`)
  const selectColor = (colorIndex: number, newShadeIndex?: number) =>
    navigate(
      generatePath('/:paletteId/:colorIndex/:shadeIndex/:view', {
        paletteId: paletteId!,
        shadeIndex: String(newShadeIndex ?? shadeIndex ?? 0),
        view: view ?? '0',
        colorIndex: String(colorIndex)
      })
    )
  const selectShade = (shadeIndex: number) =>
    navigate(
      generatePath('/:paletteId/:colorIndex/:shadeIndex/:view', {
        paletteId: paletteId!,
        shadeIndex: String(shadeIndex),
        view: view ?? '0',
        colorIndex: colorIndex!
      })
    )
  const selectView = (view: number) =>
    navigate(
      generatePath('/:paletteId/:colorIndex/:shadeIndex/:view', {
        paletteId: paletteId!,
        shadeIndex: shadeIndex!,
        view: String(view),
        colorIndex: colorIndex!
      })
    )

  const deselectPalette = () => navigate('/')
  const deselectColor = () => navigate(`/${paletteId}`)
  const deselectShade = () => navigate(`/${paletteId}/${colorIndex}`)

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
