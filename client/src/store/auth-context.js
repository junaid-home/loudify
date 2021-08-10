import * as React from 'react'

const UserContext = React.createContext()

export const useAuth = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useAuth context hook must be used inside the Provider!')
  }

  return context
}

export const Provider = ({children}) => {
  const [user, setUser] = React.useState(
    () => JSON.parse(localStorage.getItem('user')) || null
  )
  const [token, setToken] = React.useState(() => localStorage.getItem('token') || null)

  React.useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    }, 500)
  }, [token, user])

  const value = React.useMemo(
    () => ({
      user,
      token,
      setUser,
      setToken,
    }),
    [user, token]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
