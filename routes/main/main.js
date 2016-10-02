var router = require('koa-router')();


router.get('/c',function *(){
	this.render('main/create');
});

router.get('/s',function *(){
	this.render('main/s');
});

router.get('/b',function *(){
	this.render('main/board');
});

module.exports = router;