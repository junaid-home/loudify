import * as React from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import Loader from '../loader'
import {useSong} from '../../store/song-context'
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdAccessTime,
  MdPlayArrow,
} from 'react-icons/md'

function PlayListDisplay() {
  const {
    setPlaylist,
    setCurrentSong,
    playlistId,
    setPlaylistId,
    setPlaying,
    playing,
    currentSong,
  } = useSong()
  const location = useLocation()
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const pathId = location.pathname.replace('/playlist/', '')

    axios.get(`/playlist/${pathId}`).then((response) => {
      console.log(response.data)
      setData(response.data.data)
      setIsPlaying(playlistId === response.data.data.id)
    })
  }, [location.pathname, playlistId])

  const TBody = ({songData, id}) => {
    const handlePlaySong = (songId) => {
      if (songId !== currentSong.id) {
        setPlaying(false)

        const songIndex = data.songs.findIndex((song) => song.id === songId)

        setPlaylist(data.songs)
        setPlaylistId(data.id)
        setCurrentSong(data.songs[songIndex])
        setPlaying(true)
      } else {
        if (playing) setPlaying(false)
        else setPlaying(true)
      }
    }

    return (
      <tbody className='hover:bg-gray-600'>
        <tr>
          <td>
            <div className='flex justify-center items-center'>
              <MdPlayArrow
                onClick={() => handlePlaySong(songData.id)}
                className='text-2xl text-gray-200 cursor-pointer'
              />
            </div>
          </td>
          <td className='px-6 py-4 whitespace-nowrap'>
            <div className='flex items-center text-gray-200'>
              <div className='flex-shrink-0 h-10 w-10'>{id + 1}</div>
            </div>
          </td>
          <td className='px-6 py-4 whitespace-nowrap flex items-center'>
            <img
              src={`http://localhost:9191/images/${songData.thumbnail}`}
              alt={songData.title}
              className='w-20'
            />
            <div className='text-md text-gray-300 truncate ml-3'>{songData.title}</div>
          </td>
          <td className='px-6 py-4 whitespace-nowrap'>
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-300'>
              {songData.artist}
            </span>
          </td>
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
            {songData.duration}
          </td>
        </tr>
      </tbody>
    )
  }

  return !data ? (
    <Loader />
  ) : (
    <div>
      <div className=' pb-4'>
        <h4 className='ml-5 font-medium text-gray-300 mt-9'>PLAYLIST</h4>
        <h1 className='ml-4 text-8xl font-extrabold text-gray-300'>{data.title}</h1>
        <h4 className='ml-5 font-medium text-gray-400 mt-5'>{data.caption}</h4>
        <h4 className='ml-5 font-medium text-gray-300'>
          Loudify . {data.songs.length} songs.
        </h4>
      </div>
      <div className='flex items-center justify-start py-3'>
        <div>
          {isPlaying && playing ? (
            <MdPauseCircleFilled className='icon text-5xl text-green' />
          ) : (
            <MdPlayCircleFilled className='icon text-5xl text-green' />
          )}
        </div>
      </div>
      <div>
        <div className='flex flex-col'>
          <div className='-my-2 overflow-hidden'>
            <div className='py-2 align-middle inline-block w-full'>
              <div className='shadow overflow-hidden border-b border-gray-200 '>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'
                      ></th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider'
                      >
                        #
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'
                      >
                        ALBUM OR PODCAST
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'
                      >
                        <MdAccessTime className='text-lg' />
                      </th>
                    </tr>
                  </thead>
                  {data.songs.map((song, index) => (
                    <TBody songData={song} id={index} key={index + song.title} />
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayListDisplay
