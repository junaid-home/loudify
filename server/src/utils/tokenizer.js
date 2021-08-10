const jws = require('jws')

class Tokenizer {
  constructor(key) {
    this.key = key
  }

  tokenize(payload) {
    return jws.sign({
      header: {alg: 'HS256'},
      payload: payload,
      secret: this.key
    })
  }

  verify(token) {
    return jws.verify(token, 'HS256', this.key)
  }

  decode(token) {
    return jws.decode(token)
  }
}

module.exports = new Tokenizer(process.env.JWT_SECRET)
