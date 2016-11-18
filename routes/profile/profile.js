var router = require('koa-router')();


router.get('/profile', function * () {
  this.render('profile/index')
})

module.exports = router;