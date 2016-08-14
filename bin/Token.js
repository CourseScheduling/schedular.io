var crypto = require('crypto')

var Token = {}

Token.validate = (hash) => {
  var hashArray = hash.split('..')
  
  var crypto.createHmac('sha1', global.API_SECRET).update().digest()
}



module.export = Token
