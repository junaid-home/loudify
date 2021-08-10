const mongoose = require('mongoose')
const fs = require('fs')
const $Song = require('../models/song')

async function getLikedSongs(req, res) {
  try {
    const songs = await $Song.find({likes: {$all: [mongoose.Types.ObjectId(req.userId)]}})

    res.status(200).json({data: songs})
  } catch (error) {
    res.json({message: `Something went wrong!`})
  }
}

async function searchSongByQuery(req, res) {
  try {
    if (!req.body.query) return res.json({message: 'query not provided'})

    const songs = await $Song.find({
      $or: [
        {title: {$regex: req.body.query, $options: 'i'}},
        {artist: {$regex: req.body.query, $options: 'i'}}
      ]
    })

    res.status(200).json({data: songs})
  } catch (error) {
    res.json({message: `Something went wrong!`})
  }
}

async function addLikeToSongAndUser(req, res) {
  try {
    const isValidSongId = mongoose.Types.ObjectId.isValid(req.body.id)
    if (!isValidSongId) return res.json({message: 'Invalid song id'})

    const song = await $Song.findOne({_id: req.body.id})
    if (!song) return res.json({message: 'no song found with the provided id'})

    const isLiked = song.likes.includes(req.userId)

    const operator = !isLiked ? '$addToSet' : '$pull'

    const updatedSong = await $Song.findOneAndUpdate(
      {_id: song.id},
      {[operator]: {likes: mongoose.Types.ObjectId(req.userId)}}
    )

    res.status(200).json({data: updatedSong})
  } catch (error) {
    res.json({message: `Something went wrong!`})
  }
}

async function getHomeData(req, res) {
  try {
    const topSongs = await $Song.find({category: 'top'}).sort({updatedAt: -1}).limit(6)

    const latestSongs = await $Song
      .find({category: 'latest'})
      .sort({updatedAt: -1})
      .limit(5)

    const prodcasts = await $Song
      .find({category: 'prodcasts'})
      .sort({updatedAt: -1})
      .limit(5)

    const popularSongs = await $Song
      .find({category: 'popular'})
      .sort({updatedAt: -1})
      .limit(5)

    res.status(200).json({
      data: {top: topSongs, latest: latestSongs, prodcasts, popular: popularSongs}
    })
  } catch (error) {
    res.json({message: `Something went wrong!`})
  }
}

async function streamAudioFromLocal(req, res) {
  if (!req.params.ID) return res.json({message: `No File Found!`})

  const path = `/music/${req.params.ID}`

  const stat = fs.statSync(path)
  if (!stat) return res.json({message: `No File Found!`})

  const fileSize = stat.size

  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
    const chunksize = end - start + 1

    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    }
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
}

module.exports.getLikedSongs = getLikedSongs
module.exports.searchSongByQuery = searchSongByQuery
module.exports.addLikeToSongAndUser = addLikeToSongAndUser
module.exports.getHomeData = getHomeData
module.exports.streamAudioFromLocal = streamAudioFromLocal
