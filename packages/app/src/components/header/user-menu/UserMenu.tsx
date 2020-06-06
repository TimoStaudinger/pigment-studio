import React from 'react'
import {Menu, MenuButton, MenuList, MenuItem} from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import {useAuth0} from '../../app/Auth0Provider'
import Button from '../../common/Button'
import ToolbarItem from '../../common/ToolbarItem'

import styles from './UserMenu.module.css'

const UserMenu = () => {
  const {logout, isAuthenticated, loginWithPopup, user} = useAuth0()

  return (
    <>
      {!isAuthenticated && (
        <ToolbarItem>
          <Button onClick={() => loginWithPopup()} toolbar text="Login" />
        </ToolbarItem>
      )}

      {isAuthenticated && (
        <ToolbarItem>
          <Menu>
            <MenuButton className={styles.selector}>
              {user && user.given_name}
              <img
                className={styles.profilePicture}
                alt="Avatar"
                src={user?.picture}
              />
            </MenuButton>

            <MenuList className={styles.popover}>
              <MenuItem onSelect={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </ToolbarItem>
      )}
    </>
  )
}

export default UserMenu
