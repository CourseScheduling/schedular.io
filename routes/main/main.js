var router = require('koa-router')();


router.get('/c',function *(){
	this.render('main/create');
});

router.get('/s',function *(){
	this.render('main/show');
});


module.exports = router;