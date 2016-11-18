var router = require('koa-router')();


router.get('/course',function *(){
	this.render('main/course')
});

module.exports = router;