const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 30
    },
    artist: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20
    },
    thumbnail: {
      type: String,
      required: true,
      minLength: 5
    },
    duration: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 5
    },
    media: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    playlistId: {type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}
  },
  {timestamps: true}
)

module.exports = mongoose.model('Song', schema)
