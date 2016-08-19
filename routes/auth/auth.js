var Mongo = require('monk')
var Token = require('../../bin/Token')
var bcrypt = require('bcryptjs')

/**
* An authentication function, checks to see if the user is the user
* @param {Object} data The data returned by the server
* @param {Object} user The data that the user sent
*/
function Auth(data, user){
  var Upass = user.password
  var Spass = data.password
  var authObj = {}

  return new Promise((resolve, reject) => {
    bcrypt.compare(Upass, Spass, (err, res) => {
      if(!res){
        reject('PASSWORD BAD')
      }

      authObj.token = Token.generate(data.username)
      resolve(authObj)
    })
  })
}




module.exports = Auth