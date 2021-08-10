import * as React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import formatTime from '../../utils/format-time'
import ProgressBar from '../progress-bar'
import {useAuth} from '../../store/auth-context'
import {
  MdFavorite,
  MdFavoriteBorder,
  MdVolumeUp,
  MdVolumeOff,
  MdShuffle,
  MdRepeat,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md'

function PlayerDisplay({
  isMuted,
  audioRef,
  sontData,
  setIsLiked,
  isLiked,
  isShuffled,
  shufflePlaylist,
  playPreviousSong,
  playPauseToggle,
  isPlaying,
  playNextSong,
  shouldRepeat,
  setShouldRepeat,
  handleMuteVolume,
  volumeRef,
  progressRef,
  currentTime,
  duration,
}) {
  const {token} = useAuth()

  const handleSongLike = (songId) => {
    setIsLiked((prev) => !prev)
    axios
      .post(
        '/like',
        {id: songId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_response) => {})
  }

  return (
    <div className='w-screen overflow-hidden select-none border-t-2 border-gray-700 bg-gray-900 fixed bottom-0 left-0 right-0 py-2 z-50 md:py-3'>
      <audio
        muted={isMuted}
        ref={audioRef}
        src={`http://127.0.0.1:9191/music/${sontData.media}`}
        preload='metadata'
      ></audio>
      <div className='md:hidden text-center w-full border-b-2 border-gray-700  pb-2  mb-1 px-3'>
        <h3 className='font-ligh text-sm leading-5 text-gray-300 cursor-pointers truncate'>
          <Link to={`/playlist/${sontData.playlistId}`}>{sontData.title}</Link>
        </h3>
      </div>
      <div className='flex justify-between px-3'>
        <div className='md:flex justify-between items-center w-1/4 hidden'>
          <div className='flex justify-start h-full items-center'>
            <img
              className='shadow w-16 h-full object-fill rounded-sm'
              alt='album cover'
              src={`http://localhost:9191/images/${sontData.thumbnail}`}
            />
            <div>
              <h3 className='font-normal  text-base mx-3 text-gray-300 leading-5 cursor-pointer hover:underline'>
                <Link to={`/playlist/${sontData.playlistId}`}>{sontData.title}</Link>
              </h3>
              <p className='text-xs text-gray-500  mx-3 '>{sontData.artist}</p>
            </div>
          </div>
          <div onClick={() => handleSongLike(sontData.id)}>
            {!isLiked ? (
              <MdFavoriteBorder className='icon' />
            ) : (
              <MdFavorite className='icon text-green' />
            )}
          </div>
        </div>
        <div className='w-full ml-1 mr-1  md:ml-0 md:mr-0 md:w-1/2 flex items-center justify-center flex-col'>
          <div className='flex items-center'>
            <div
              className='justify-self-start block mr-9 md:hidden'
              onClick={() => setIsLiked((prev) => !prev)}
            >
              {!isLiked ? (
                <MdFavoriteBorder className='icon' />
              ) : (
                <MdFavorite className='icon text-green' />
              )}
            </div>
            <MdShuffle
              className={`icon ml-4 mr-2 ${isShuffled ? 'text-green' : ''}`}
              onClick={shufflePlaylist}
            />
            <MdSkipPrevious onClick={playPreviousSong} className='icon' />
            <div onClick={playPauseToggle}>
              {isPlaying ? (
                <MdPauseCircleFilled className='icon text-4xl text-gray-100' />
              ) : (
                <MdPlayCircleFilled className='icon text-4xl text-gray-100' />
              )}
            </div>
            <MdSkipNext onClick={playNextSong} className='icon' />
            <MdRepeat
              onClick={() => setShouldRepeat((prev) => !prev)}
              className={`icon ml-4  ${shouldRepeat ? 'text-green' : ''}`}
            />
            <div className='block mr-2 ml-9 md:hidden' onClick={handleMuteVolume}>
              {isMuted ? (
                <MdVolumeOff className='icon' />
              ) : (
                <MdVolumeUp className='icon text-green' />
              )}
            </div>
          </div>
          <div className='flex justify-between w-full items-center mt-1'>
            <p className='text-gray-400 mr-2'>{formatTime(currentTime)}</p>
            <ProgressBar
              progressRef={progressRef}
              audioRef={audioRef}
              duration={duration}
            />
            <p className='text-gray-400 ml-2'>{formatTime(duration)}</p>
          </div>
        </div>
        <div className='hidden md:flex mr-2 md:w-1/6 items-center justify-end pr-3'>
          <div className='mr-2' onClick={handleMuteVolume}>
            {isMuted ? <MdVolumeOff className='icon' /> : <MdVolumeUp className='icon' />}
          </div>
          <div className='w-full hidden md:block mr-2'>
            <ProgressBar volume progressRef={volumeRef} audioRef={audioRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerDisplay
