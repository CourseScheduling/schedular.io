var router = require('koa-router')()
var async = require('async')
var Mongo = require('monk')
var Token = require('../../bin/token')
var Validator = require('./validator')

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /[^(A-Z)(a-z)(0-9)_-]/g

/**
 * The giant function object used for validation
 * @param {String} username
 * @param {String} email
 * @param {Function} good
 * @param {Function} bad
 */
function Validator (type, username, email, good, bad) {
  switch(type){
    case 'signup':
    async.series([
      (callback) => {
        Validator.syntax({
          email: email, 
          username: username
        }, callback)
      }, (callback) => {
        Validator.exists(email, username, callback)
      }
    ], (error) => {
      if (error) {
        bad(error)
      } else {
        good()
      }
    })
    break;
    case 'login':
    async.waterfall([
      (callback) => {
        Validator.syntax({
          email: email,
          username: username
        }, callback)
      }, (callback) => {
        Validator.exists(email, username, callback)
      }, (callback, user) => {
        Validator
      }
    ], (error) => {
      if (error) {
        bad(error)
      } else {
        good()
      }
    })

    break;
  }
}

/**
 * The function used to check if the email and username is good
 * @param  {Object} inputs
 * @param  {Function} callback
 * @return
 */
Validator.syntax = (email, username, callback) => {
  var domain = email.split('@')[1]

  if (!global.domainList[domain]) return callback('EMAIL DOMAIN')
  if (!email.test(EMAIL_REGEX)) return callback('EMAIL INVALID')
  if (username.test(USERNAME_REGEX)) return callback('USERNAME INVALID')

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

  var _option = {_id: 1}

  Mongo.get('User').find(_query, _option).then(function (data) {
    if (!data.length) {
      return callback(data[0])
    }

    if (data[0].username === username) callback('USERNAME TAKEN')
    else callback('EMAIL TAKEN')
  })
}

/** The signup route */
router.post('/api/v1/signup', function * () {
  var _email = this.body.email
  var _username = this.body.username
  var _password = this.body.password

  yield new Promise(function (resolve, reject) {
    Validator('signup', _username, _email, resolve, reject)
  })
})

/** The login route */
router.post('/api/v1/auth', function * () {
  var _username = this.body.username
  var _password = this.body.password

  yield new Promise(function (resolve, reject){
    Validator('login', _username, _password, resolve, reject)
  })
})
module.exports = router
