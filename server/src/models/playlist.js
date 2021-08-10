const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 30
    },
    caption: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50
    },
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
  },
  {timestamps: true}
)

module.exports = mongoose.model('Playlist', schema)
