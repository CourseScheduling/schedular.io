var async = require('async')
var Mongo = require('monk')

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /[^(A-Z)(a-z)(0-9)_-]/g

/**
 * The giant function object used for validation
 * @param {Object} inputs
 * @param {Function} good
 * @param {Function} bad
 */
function Validator (type, inputs) {
  return new Promise((resolve, reject) => {
    async.waterfall([
      (callback) => {
        Validator.syntax(type, inputs, callback)
      }, (callback) => {
        Validator.exists(inputs, callback)
      }
    ], (error, data) => {
      if (error) {
        return reject(error)
      }

      resolve(data)
    })
  })
}

/**
 * The function used to check if the email and username is good
 * @param  {Object} inputs
 * @param  {Function} callback
 * @return
 */
Validator.syntax = (type, inputs, callback) => {
  var email = inputs.email
  var username = inputs.username

  if (!username || username.test(USERNAME_REGEX)) return callback('USERNAME INVALID')

  if (type == 'singup') {
    var domain = email.split('@')[1]

    if (!global.domainList[domain]) return callback('EMAIL DOMAIN')
    if (!email.test(EMAIL_REGEX)) return callback('EMAIL INVALID')

  }
  callback(null)
}

/**
 * The function used to query the database to check if it's good
 * @param  {String} email
 * @param  {String} username
 * @param  {Function} callback
 * @return
 */
Validator.exists = (email, username, callback) => {
  var _query = {
    $or: [
      {username: username},
      {email: email}
    ]
  }

  var _option = {username: 1, password: 1, _id: 0}

  Mongo.get('User').find(_query, _option).then(function (data) {
    if (!data.length) {
      return callback(data[0])
    }

    if (data[0].username === username) callback('USERNAME TAKEN')
    else callback('EMAIL TAKEN')
  })
}

module.exports = Validator
