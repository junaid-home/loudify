import * as React from 'react'

const DrawerContext = React.createContext()

export const useDrawer = () => {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error('useDrawer context hook must be used inside the Provider!')
  }

  return context
}

export const Provider = ({children}) => {
  const [open, setOpen] = React.useState(false)

  const value = React.useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open]
  )

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}
