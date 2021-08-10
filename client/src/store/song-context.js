import * as React from 'react'

const SongContext = React.createContext()

export const useSong = () => {
  const context = React.useContext(SongContext)

  if (!context) {
    throw new Error('useSong context hook must be used inside the Provider!')
  }

  return context
}

export const Provider = ({children}) => {
  const [currentSong, setCurrentSong] = React.useState({
    thumbnail: '/favicon.ico',
    title: 'Fetching Title...',
    artist: 'loading...',
  })
  const [playing, setPlaying] = React.useState(false)
  const [playlistId, setPlaylistId] = React.useState(null)
  const [playlist, setPlaylist] = React.useState([])
  const [original, setOriginal] = React.useState([])

  const value = React.useMemo(
    () => ({
      currentSong,
      playlist,
      setCurrentSong,
      setPlaylist,
      original,
      setOriginal,
      setPlaylistId,
      playlistId,
      setPlaying,
      playing,
    }),
    [currentSong, playlist, original, playlistId, playing]
  )

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>
}
