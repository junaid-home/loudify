const tokenizer = require('../utils/tokenizer')

function checkAuth(req, res, next) {
  const token = req.headers?.authorization?.replace('Bearer ', '')
  if (!token) return res.status(400).json({message: 'Token not Provided!'})

  const isValid = tokenizer.verify(token)
  if (!isValid) return res.status(400).json({message: 'Token is not Acceptable!'})

  req.userId = JSON.parse(tokenizer.decode(token).payload).id

  next()
}

module.exports = checkAuth
