const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 50
    },
    avatar: {
      type: String,
      required: true,
      minLength: 5
    },
    salt: {
      type: String,
      required: true,
      minLength: 5
    },
    password: {
      type: String,
      required: true,
      minLength: 5
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
  },
  {timestamps: true}
)

module.exports = mongoose.model('User', schema)
