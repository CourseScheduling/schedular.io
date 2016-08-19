var router = require('koa-router')();


router.get('/', () => {
  this.render('home/home');
});

router.get('/contact', () => {
  this.render('home/contact');
});

router.get('/about', () => {
  this.render('home/about');
});

/** The following are the authentication views */
router.get('/u/login', () => {
  this.render('auth/login')
})

router.get('/u/signup', () => {
  this.render('auth/signup')
})

router.get('/u/reset', () => {
  this.render('auth/reset')
})

module.exports = router;