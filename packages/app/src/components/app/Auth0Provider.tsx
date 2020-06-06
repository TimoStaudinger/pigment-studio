import React, {useState, useEffect, useContext} from 'react'
import createAuth0Client, {
  Auth0ClientOptions,
  Auth0Client,
  GetIdTokenClaimsOptions,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
  PopupConfigOptions,
  LogoutOptions,
  IdToken,
  PopupLoginOptions
} from '@auth0/auth0-spa-js'
import {useHistory} from 'react-router-dom'

interface ContextType {
  isAuthenticated: boolean
  user: object | null
  loading: boolean
  popupOpen: boolean
  loginWithPopup: (
    options?: PopupLoginOptions,
    config?: PopupConfigOptions
  ) => Promise<void>
  handleRedirectCallback: () => void
  getIdTokenClaims: (options?: GetIdTokenClaimsOptions) => Promise<IdToken>
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>
  getTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<any>
  getTokenWithPopup: (options?: PopupConfigOptions) => Promise<string>
  logout: (options?: LogoutOptions) => void
}

export const Auth0Context = React.createContext<ContextType | null>(null)
export const useAuth0 = (): ContextType =>
  useContext(Auth0Context) as ContextType

interface Props extends Auth0ClientOptions {
  children: React.ReactNode
}

export const Auth0Provider = ({children, ...initOptions}: Props) => {
  const history = useHistory()

  const onRedirectCallback = (appState: any) => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
  const redirect_uri = window.location.origin

  const options: Auth0ClientOptions = {
    onRedirectCallback,
    redirect_uri,
    ...initOptions
  }

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<object | null>(null)
  const [auth0Client, setAuth0] = useState<Auth0Client>()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(options)
      setAuth0(auth0FromHook)

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const {appState} = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client!.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client!.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client!.handleRedirectCallback()
    const user = await auth0Client!.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (options?: GetIdTokenClaimsOptions) =>
          auth0Client!.getIdTokenClaims(options),
        loginWithRedirect: (options?: RedirectLoginOptions) =>
          auth0Client!.loginWithRedirect(options),
        getTokenSilently: (options?: GetTokenSilentlyOptions) =>
          auth0Client!.getTokenSilently(options),
        getTokenWithPopup: (options?: PopupConfigOptions) =>
          auth0Client!.getTokenWithPopup(options),
        logout: (options?: LogoutOptions) =>
          auth0Client!.logout({returnTo: window.location.origin, ...options})
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
