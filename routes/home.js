var router = require('koa-router')();


router.get('/',function (){
	this.render('home/home');
});

router.get('/contact',function (){
	this.render('home/contact');
});

router.get('/about',function (){
	this.render('home/about');
});


module.exports = router;