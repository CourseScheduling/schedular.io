var crypto = require('crypto')

var Token = {}
// This works for 2 months in seconds
const TOKEN_EXPIRY_TIME = 5184000

/**
 * @param  {String} username - the username of the person
 * @return {String}
 */
Token.generate = (username) => {
  var base = username

  base += '|' + (~~(Date.now() / 1000) + TOKEN_EXPIRY_TIME)

  var hmac = crypto.createHmac('sha1', global.API_SECRET)
  .update(base)
  .digest('hex')

  return hmac + '..' + base
}

/**
 * @param  {String} - the hmac hash of the thing
 * @return {Boolean}
 */
Token.validate = (hash) => {
  var hashParts = hash.split('..')
  if (+hashParts[1] < ~~(Date.now() / 1000)) {
    return false
  }

  var hmac = crypto.createHmac('sha1', global.API_SECRET)
  .update(hashParts[1])
  .digest('hex')

  return hmac === hashParts[0]
}

module.export = Token
