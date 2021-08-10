import React from 'react'
import axios from 'axios'
import Loader from '../loader'
import SongCard from '../song-card'
import {useAuth} from '../../store/auth-context'

function LibrarySection() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState([])
  const {token} = useAuth()

  React.useEffect(() => {
    setLoading(true)
    axios
      .get('/library', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data)
        setLoading(false)
      })
  }, [token])

  return loading ? (
    <Loader />
  ) : (
    <div className='px-4 py-3'>
      <h2 className='text-3xl font-bold text-gray-100'>Playlists</h2>
      <div className='grid grid-rows-auto grid-cols-2 md:grid-cols-5 gap-4 my-4'>
        <div className='col-start-1 col-end-3 bg-gradient rounded'>
          <h2 className='text-3xl font-bold text-gray-100 mt-4 ml-4'>Liked Songs</h2>
          <h4 className='text-gray-100 ml-4 pb-4'>{data.length} Liked Songs</h4>
        </div>
        {data?.map((song, index) => (
          <SongCard key={song.title + index} data={song} />
        ))}
      </div>
    </div>
  )
}

export default LibrarySection
