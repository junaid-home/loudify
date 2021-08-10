import * as React from 'react'

function ProgressBar({duration, progressRef, audioRef, volume}) {
  const progressContainerRef = React.useRef()

  const updateProgressBar = (evt) => {
    const offsetWidth = evt.nativeEvent.offsetX + 1
    const totalWidth = progressContainerRef.current.getBoundingClientRect().width
    const percentage = (offsetWidth * 100) / totalWidth

    if (!volume) {
      progressRef.current.style.width = `${percentage.toFixed(2)}%`
      const currentTime = duration * (percentage / 100)

      audioRef.current.currentTime = currentTime
      return
    }

    progressRef.current.style.width = `${percentage.toFixed(2)}%`
    audioRef.current.volume = (percentage / 100).toFixed(4) - 0.05
  }

  return (
    <div
      ref={progressContainerRef}
      onMouseUp={updateProgressBar}
      className={`w-full h-1_5 cursor-pointer select-none ${
        volume && 'mr-4'
      } progress-container`}
    >
      <div className={`w-full knobb-container bg-gray-400 h-full rounded `}>
        <div
          style={{width: !volume ? '0%' : '100%'}}
          ref={progressRef}
          className={`h-full relative rounded bg-gray-600 active-progress ${
            volume && 'bg-green'
          }`}
        >
          <span
            className={`progress-bar-knobb ${
              volume ? 'inline-block' : 'hover:inline-block'
            }`}
          ></span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
