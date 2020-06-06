import React from 'react'

import {Palette} from '../../types/color'
import Button from '../common/Button'

import styles from './Toolbar.module.css'
import DocumentAdd from '../icons/DocumentAdd'
import Trash from '../icons/Trash'
import ExternalLink from '../icons/ExternalLink'
import {useAuth0} from '../app/Auth0Provider'

interface Props {
  selectedPalette: Palette | null
  showSplash: () => void
  exportPalette: () => void
  deletePalette: () => void
}

const Toolbar = ({
  selectedPalette,
  showSplash,
  exportPalette,
  deletePalette
}: Props) => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarItem}>
        <Button
          onClick={showSplash}
          toolbar
          icon={<DocumentAdd />}
          text="New Palette"
        />
      </div>

      {selectedPalette ? (
        <>
          <div className={styles.toolbarItem}>
            <Button
              onClick={exportPalette}
              toolbar
              icon={<ExternalLink />}
              text="Export"
            />
          </div>
          <div className={styles.toolbarItem}>
            <Button
              onClick={deletePalette}
              toolbar
              icon={<Trash />}
              text="Delete Palette"
            />
          </div>
        </>
      ) : null}

      {!isAuthenticated && (
        <div className={styles.toolbarItem}>
          <Button onClick={() => loginWithRedirect({})} toolbar text="Login" />
        </div>
      )}
      {isAuthenticated && (
        <div className={styles.toolbarItem}>
          <Button onClick={() => logout()} toolbar text="Log out" />
        </div>
      )}
    </div>
  )
}
export default Toolbar
