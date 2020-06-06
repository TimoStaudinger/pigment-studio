import React from 'react'

import {Palette} from '../../types/color'
import Button from '../common/Button'

import UserMenu from './user-menu/UserMenu'
import Toolbar from '../common/Toolbar'
import ToolbarItem from '../common/ToolbarItem'

import DocumentAdd from '../icons/DocumentAdd'
import Trash from '../icons/Trash'
import ExternalLink from '../icons/ExternalLink'

interface Props {
  selectedPalette: Palette | null
  showSplash: () => void
  exportPalette: () => void
  deletePalette: () => void
}

const Actions = ({
  selectedPalette,
  showSplash,
  exportPalette,
  deletePalette
}: Props) => {
  return (
    <Toolbar>
      <ToolbarItem>
        <Button
          onClick={showSplash}
          toolbar
          icon={<DocumentAdd />}
          text="New Palette"
        />
      </ToolbarItem>

      {selectedPalette && (
        <>
          <ToolbarItem>
            <Button
              onClick={exportPalette}
              toolbar
              icon={<ExternalLink />}
              text="Export"
            />
          </ToolbarItem>
          <ToolbarItem>
            <Button
              onClick={deletePalette}
              toolbar
              icon={<Trash />}
              text="Delete Palette"
            />
          </ToolbarItem>
        </>
      )}

      <UserMenu />
    </Toolbar>
  )
}
export default Actions
