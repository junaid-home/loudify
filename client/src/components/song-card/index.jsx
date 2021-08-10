import {MdPlayCircleFilled, MdPauseCircleFilled} from 'react-icons/md'
import axios from 'axios'
import {useSong} from '../../store/song-context'
import {Link} from 'react-router-dom'

function SongCard({minimal, data}) {
  const {currentSong, setPlaylist, setCurrentSong, playing, setPlaying, playlist} =
    useSong()

  const handleSongPlay = (songId, playlistId) => {
    if (songId !== currentSong.id) {
      if (playlist.findIndex((x) => x.id === songId) > -1) {
        setPlaying(false)
        const songIndex = playlist.findIndex((song) => song.id === songId)
        setCurrentSong(playlist[songIndex])
        setPlaylist(playlist)
        setPlaying(true)
      } else {
        axios.get(`/playlist/${playlistId}`).then((response) => {
          setPlaying(false)
          const songIndex = response.data.data.songs.findIndex(
            (song) => song.id === songId
          )
          setCurrentSong(response.data.data.songs[songIndex])
          setPlaylist(response.data.data.songs)
          setPlaying(true)
        })
      }
    } else {
      if (playing) setPlaying(false)
      else setPlaying(true)
    }
  }

  return minimal ? (
    <div className='bg-gray-600 rounded-md overflow-hidden items-center flex justify-between pr-2'>
      <img
        className='w-20 h-20 object-cover'
        src={`http://localhost:9191/images/${data.thumbnail}`}
        alt={data.title}
      />
      <h3 className='ml-3 w-8/12 font-semibold truncate cursor-pointer hover:underline text-gray-100 text-lg'>
        <Link to={`/playlist/${data.playlistId}`}>{data.title}</Link>
      </h3>
      <div onClick={() => handleSongPlay(data.id, data.playlistId)}>
        {currentSong.id === data.id && playing ? (
          <MdPauseCircleFilled className='icon text-5xl text-green filter' />
        ) : (
          <MdPlayCircleFilled className='icon text-5xl text-green filter' />
        )}
      </div>
    </div>
  ) : (
    <div className='relative bg-gray-800 rounded-md overflow-hidden items-center flex flex-col p-2'>
      <div onClick={() => handleSongPlay(data.id, data.playlistId)}>
        {currentSong.id === data.id && playing ? (
          <MdPauseCircleFilled className='icon text-5xl text-green filter absolute top-55 right-1' />
        ) : (
          <MdPlayCircleFilled className='icon text-5xl text-green filter absolute top-55 right-1' />
        )}
      </div>
      <img
        className='w-11/12 mt-2 h-36 rounded object-fill'
        src={`http://localhost:9191/images/${data.thumbnail}`}
        alt={data.title}
      />
      <h3 className='cursor-pointer hover:underline self-start px-2 pt-3 font-semibold truncate w-full text-gray-100'>
        <Link to={`/playlist/${data.playlistId}`}>{data.title}</Link>
      </h3>
      <h4 className='self-start px-2 pb-3 font-normal text-sm  w-full text-gray-500'>
        {data.artist}
      </h4>
    </div>
  )
}

export default SongCard
