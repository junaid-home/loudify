const path = require('path')
const express = require('express')
const cors = require('cors')

const checkAuth = require('./middlewares/auth')
const {getPlaylistById} = require('./controllers/playlist')
const {createNewUser, authorizeUser} = require('./controllers/user')
const {
  getLikedSongs,
  searchSongByQuery,
  addLikeToSongAndUser,
  getHomeData
} = require('./controllers/song')

const app = express()

app.use(express.json())
app.use(cors({origin: 'http://localhost:3000', methods: 'GET,POST,OPTION'}))

app.get('/api/v1/home', getHomeData)
app.get('/api/v1/playlist/:ID', getPlaylistById)
app.get('/api/v1/library', checkAuth, getLikedSongs)
app.post('/api/v1/search', searchSongByQuery)
app.post('/api/v1/like', checkAuth, addLikeToSongAndUser)
app.post('/api/v1/user/create', createNewUser)
app.post('/api/v1/user/authorize', authorizeUser)
app.get('/api/v1/song/:ID')

app.use(express.static(path.join(__dirname, '../public')))

app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, '../public/frontend/index.html'))
)

module.exports = app
