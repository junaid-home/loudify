/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import shuffleArray from '../../utils/shuffle-array'
import {useSong} from '../../store/song-context'
import PlayerDisplay from '../player-display'

function Player() {
  const audioRef = React.useRef()
  const animationRef = React.useRef(null)
  const volumeRef = React.useRef()
  const progressRef = React.useRef()

  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [isMuted, setIsMuted] = React.useState(false)
  const [isLiked, setIsLiked] = React.useState(false)
  const [isShuffled, setIsShuffled] = React.useState(false)
  const [autoPlay, setAutoPlay] = React.useState(false)
  const [shouldRepeat, setShouldRepeat] = React.useState(false)

  const {
    currentSong,
    setCurrentSong,
    playlist,
    setPlaylist,
    original,
    setOriginal,
    playing,
    setPlaying,
  } = useSong()

  // Pause / Play when playing state changes
  React.useEffect(() => {
    if (playing) {
      audioRef.current.play()
      setAutoPlay(true)
      animationRef.current = requestAnimationFrame(handleTimeWhilePlaying)
    } else {
      audioRef.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }, [playing])

  // set song Like
  React.useEffect(() => {
    setIsLiked(currentSong?.likes?.includes('123456'))
  }, [currentSong?.likes])

  // calcule and set duration
  React.useEffect(() => {
    const seconds = Math.floor(audioRef.current.duration)

    if (!isNaN(seconds)) setDuration(seconds)
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

  // play song if autoPlay is enabled
  React.useEffect(() => {
    if (autoPlay) {
      setTimeout(() => {
        audioRef.current.play()
        setPlaying(true)
      }, 500)
    }
  }, [audioRef.current?.readyState, autoPlay])

  // update progressbar's width
  React.useEffect(() => {
    progressRef.current.style.width = `${(currentTime / duration) * 100}%`
  }, [currentTime, duration])

  // handle shuffle playlist
  const shufflePlaylist = () => {
    const shuffled = isShuffled

    if (!shuffled) {
      setOriginal(JSON.parse(JSON.stringify(playlist)))
      setPlaylist(JSON.parse(JSON.stringify(shuffleArray(playlist))))
      setIsShuffled(true)
    } else {
      setPlaylist(JSON.parse(JSON.stringify(original)))
      setOriginal([])
      setIsShuffled(false)
    }
  }

  const playNextSong = () => {
    const isPrevPlaying = playing
    if (!shouldRepeat) {
      const currentSongIndex = playlist.findIndex((x) => x.id === currentSong.id)
      audioRef.current.currentTime = 0

      if (currentSongIndex < playlist.length - 1) {
        setPlaying(false)
        setCurrentSong(playlist[currentSongIndex + 1])
      } else {
        setCurrentSong(playlist[0])
        setPlaying(false)
      }

      isPrevPlaying && setPlaying(true)
      isPrevPlaying && setAutoPlay(true)
    } else {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setPlaying(true)
    }
  }

  const playPreviousSong = () => {
    const isPrevPlaying = playing
    if (!shouldRepeat) {
      const currentSongIndex = playlist.findIndex((x) => x.id === currentSong.id)

      audioRef.current.currentTime = 0

      if (currentSongIndex > 0) {
        setPlaying(false)
        setCurrentSong(playlist[currentSongIndex - 1])
      } else {
        setCurrentSong(playlist[playlist.length - 1])
        setPlaying(false)
      }

      isPrevPlaying && setPlaying(true)
      isPrevPlaying && setAutoPlay(true)
    } else {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setPlaying(true)
    }
  }

  // play next song when current song is fully played!
  React.useEffect(() => {
    audioRef.current.onended = () => {
      playNextSong()
    }
  }, [currentSong.id, playlist, shouldRepeat])

  // animation handler
  const handleTimeWhilePlaying = React.useCallback(() => {
    const current = audioRef.current.currentTime
    if (!isNaN(current)) {
      setCurrentTime(current)

      animationRef.current = requestAnimationFrame(handleTimeWhilePlaying)
    }
  }, [])

  // toggle play/pause
  const playPauseToggle = React.useCallback(() => {
    const prevState = playing

    if (!prevState) {
      audioRef.current.play()
      setPlaying(true)

      animationRef.current = requestAnimationFrame(handleTimeWhilePlaying)
    } else {
      audioRef.current.pause()
      setPlaying(false)

      cancelAnimationFrame(animationRef.current)
    }
  }, [playing, handleTimeWhilePlaying])

  // toggle mute / unmute volume
  const handleMuteVolume = () => {
    const muted = isMuted
    setIsMuted(!muted)
    if (!muted) {
      volumeRef.current.style.width = '0%'
      audioRef.current.volume = 0
    } else {
      volumeRef.current.style.width = '100%'
      audioRef.current.volume = 1
    }
  }

  // keyPress Listener
  React.useEffect(() => {
    const handlePlayPause = (evt) => {
      if (evt.code === 'Space') {
        evt.preventDefault()
        playPauseToggle()
      } // press "space" to toggle play/pause
      if (evt.code === 'KeyV') handleMuteVolume() // press "V"to toggle mute
    }
    document.addEventListener('keydown', handlePlayPause)

    return () => document.removeEventListener('keydown', handlePlayPause)
  }, [playPauseToggle, isMuted])

  return (
    <PlayerDisplay
      sontData={currentSong}
      audioRef={audioRef}
      progressRef={progressRef}
      volumeRef={volumeRef}
      currentTime={currentTime}
      duration={duration}
      handleMuteVolume={handleMuteVolume}
      isMuted={isMuted}
      isLiked={isLiked}
      setIsLiked={setIsLiked}
      isPlaying={playing}
      isShuffled={isShuffled}
      shouldRepeat={shouldRepeat}
      setShouldRepeat={setShouldRepeat}
      playPauseToggle={playPauseToggle}
      playNextSong={playNextSong}
      playPreviousSong={playPreviousSong}
      shufflePlaylist={shufflePlaylist}
    />
  )
}

export default Player
