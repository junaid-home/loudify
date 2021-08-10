const $User = require('../models/user')
const hasher = require('../utils/hasher')
const tokenizer = require('../utils/tokenizer')
const {validateCredentials, validateUser} = require('../validators/user')

async function createNewUser(req, res) {
  try {
    const {error} = validateUser(req.body)
    if (error) return res.json({message: error.details[0].message})

    const encrypted = await hasher.hash(req.body.password)

    const user = await $User.create({
      ...req.body,
      password: encrypted.hash,
      salt: encrypted.salt
    })

    const token = tokenizer.tokenize({id: user.id})

    user.password = undefined
    user.salt = undefined

    res.status(201).json({token, user})
  } catch (error) {
    if (error.message.startsWith('E11000')) {
      return res.json({message: 'Email Already Exist, Please Login!'})
    }
    res.json({message: error.message})
  }
}

async function authorizeUser(req, res) {
  try {
    const {error} = validateCredentials(req.body)
    if (error) return res.json({message: error.details[0].message})

    const user = await $User.findOne({email: req.body.email})
    if (!user) return res.json({message: 'Incorrect email / password'})

    const isValidPassword = await hasher.verifyHash(
      req.body.password,
      user.salt,
      user.password
    )
    if (!isValidPassword) return res.json({message: 'Incorrect email / password'})

    const token = tokenizer.tokenize({id: user.id})

    user.password = undefined
    user.salt = undefined

    res.status(201).json({token, user})
  } catch (error) {
    res.json({message: error.message})
  }
}

module.exports.createNewUser = createNewUser
module.exports.authorizeUser = authorizeUser
