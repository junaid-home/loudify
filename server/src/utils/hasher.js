const crypto = require('crypto')

class Hasher {
  async hash(str) {
    const salt = crypto.randomBytes(16).toString('hex')

    return new Promise((resolve, reject) => {
      crypto.pbkdf2(str, salt, 1000, 64, 'sha512', (error, x) => {
        if (error) reject(error)

        resolve({hash: x.toString('hex'), salt})
      })
    })
  }

  async verifyHash(str, salt, hash) {
    const reHash = await new Promise((resolve, reject) => {
      crypto.pbkdf2(str, salt, 1000, 64, 'sha512', (error, x) => {
        if (error) reject(error)

        resolve(x.toString('hex'))
      })
    })

    return reHash === hash
  }
}

module.exports = new Hasher()
