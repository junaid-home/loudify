const joi = require('joi')

function validateUser(user) {
  const schema = joi.object({
    email: joi.string().email().required().min(3).max(50),
    name: joi.string().required().min(3).max(15),
    avatar: joi.string().required().uri().min(5),
    password: joi.string().required().min(6).max(30)
  })

  return schema.validate(user)
}

function validateCredentials(credentials) {
  const schema = joi.object({
    email: joi.string().email().required().min(3).max(50),
    password: joi.string().required().min(6).max(30)
  })

  return schema.validate(credentials)
}

module.exports.validateUser = validateUser
module.exports.validateCredentials = validateCredentials
