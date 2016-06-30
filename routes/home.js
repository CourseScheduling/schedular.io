var router = require('koa-router')();


router.get('/',function (){
	
	this.render('home/home');
	
});


module.exports = router;