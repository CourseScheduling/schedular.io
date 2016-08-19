var router = require('koa-router')()
var Validator = require('./validate')

/** The signup route */
router.post('/api/v1/signup', function * () {

  var _inputs = {
    email: this.body.email,
    username: this.body.username,
    password: this.body.password
  }

  yield new Promise(function (resolve, reject) {
    Validator('signup', _inputs).then((data) => {
      Signup(_inputs)
    }, (error) => {
      reject(error)
    })
  })
})

/** The login route */
router.post('/api/v1/auth', function * () {

  var _inputs = {
    username: this.body.username,
    password: this.body.password
  }

  yield new Promise(function (resolve, reject) {
    Validator('login', _inputs).then((data) => {
      Auth(data)
    }, (error) => {
      reject(error)
    })
  })
})
module.exports = router
