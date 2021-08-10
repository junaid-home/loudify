require('dotenv').config()
const mongoose = require('mongoose')
const toJson = require('@meanie/mongoose-to-json')

const PORT = process.env.PORT || 4000

mongoose.plugin(toJson)
const app = require('./app')

app.listen(PORT, () => console.log(`[ OK ] Listening on port ${PORT}`))

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
mongoose.connect(process.env.DATABASE_URL, opts, (err) => {
  if (err) {
    console.log('[ ERROR ] Failed to connect with database!', err)
    return
  }

  console.log('[ OK ] Connected to database!')
})
