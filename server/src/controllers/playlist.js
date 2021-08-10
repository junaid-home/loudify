const $Playlist = require('../models/playlist')

async function getPlaylistById(req, res) {
  try {
    const id = req.params.ID

    const playlist = await $Playlist.findOne({_id: id}).populate('songs')

    res.status(200).json({data: playlist})
  } catch (error) {
    res.json({message: `No Playlist found with the provided id`})
  }
}

module.exports.getPlaylistById = getPlaylistById
