var router = require('koa-router')();


router.get('/', function * () {
  this.render('home/home');
});

router.get('/contact', function * () {
  this.render('home/contact');
});

router.get('/faq', function * () {
  this.render('home/faq');
});

/** The following are the authentication views */
router.get('/u/login', function * () {
  this.render('auth/login')
})

router.get('/u/signup', function * () {
  this.render('auth/signup')
})

router.get('/u/reset', function * () {
  this.render('auth/reset')
})

module.exports = router;