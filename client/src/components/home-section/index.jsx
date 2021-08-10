import * as React from 'react'
import axios from 'axios'
import SongCard from '../song-card'
import Loader from '../loader'
import {useSong} from '../../store/song-context'

function HomeSection() {
  const {setPlaylist, setCurrentSong, setPlaylistId, setPlaying, playing} = useSong()
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    axios.get('/home').then((response) => {
      setData(response.data.data)
      if (!playing) {
        setPlaylistId('abc123')
        setPlaylist(response.data.data.top)
        setCurrentSong(response.data.data.top[0])
        setPlaying(false)
      }
    })
  }, [setCurrentSong, setPlaylist, setPlaylistId, setPlaying, playing])

  return !data ? (
    <Loader />
  ) : (
    <div className='px-4 py-3'>
      <h2 className='text-3xl font-bold text-gray-100'>Good evening</h2>
      <p className='text-gray-400 mt-1'>Never miss the top six songs of 2021.</p>
      <div className='grid grid-rows-6 grid-col-1  md:grid-rows-2 md:grid-cols-3 gap-4 my-4'>
        {data.top.map((song, index) => (
          <SongCard minimal key={song.title + index} data={song} />
        ))}
      </div>
      <h2 className='text-3xl font-bold text-gray-100'>Latest</h2>
      <p className='text-gray-400 mt-1'>Listen the most recent music of your choice.</p>
      <div className='grid grid-cols-2 grid-rows-3 md:grid-rows-1 md:grid-cols-5 gap-4 my-4'>
        {data.latest.map((song, index) => (
          <SongCard key={song.title + index} data={song} />
        ))}
      </div>
      <h2 className='text-3xl font-bold text-gray-100'>Prodasts</h2>
      <p className='text-gray-400 mt-1'>Learn about the most popular prodcasts.</p>
      <div className='grid grid-cols-2 grid-rows-3 md:grid-rows-1 md:grid-cols-5 gap-4 my-4'>
        {data.prodcasts.map((song, index) => (
          <SongCard key={song.title + index} data={song} />
        ))}
      </div>
      <h2 className='text-3xl font-bold text-gray-100'>Popular</h2>
      <p className='text-gray-400 mt-1'>Listen our most popular songs.</p>
      <div className='grid grid-cols-2 grid-rows-3 md:grid-rows-1 md:grid-cols-5 gap-4 my-4 mb-8'>
        {data.popular.map((song, index) => (
          <SongCard key={song.title + index} data={song} />
        ))}
      </div>
    </div>
  )
}

export default HomeSection
