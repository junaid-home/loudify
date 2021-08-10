import * as React from 'react'

const SearchContext = React.createContext()

export const useSearch = () => {
  const context = React.useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch context hook must be used inside the Provider!')
  }

  return context
}

export const Provider = ({children}) => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const value = React.useMemo(
    () => ({
      data,
      setData,
      loading,
      setLoading,
    }),
    [data, loading]
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
