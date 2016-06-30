var router = require('koa-router')();
var body = require('koa-body')();
var crypto = require('crypto');
var DB = {};


router.get('/u/reset', function *(){
	this.render('auth/reset')
});

router.post('/auth/reset', body, function *(){
	
	var $this = this;
	
	//Check to see if the user exists. Then find his password
	DB.find({
		field: 'username',
		value: this.body.u,
		from: 'userlogin'
	}).then(function (data){
		//If the user doesn't exist, exit with ERROR Code 1
		if(!data||data.length == 0)
			return $this.end({error:1});
		
		//Check if the password is the same.
		var _hashSalt = data.password.substr(0,10);
		var _hashedPass = crypto.createHash('sha512').update(_hashSalt+$this.body.p).digest('base64');
		
		//If the passwords aren't the same, exit with ERROR Code 2
		if(data.password.substr(10) !== _hashedPass){
			return $this.end({error:2});
		}
		
		//Since they're the same, fetch all the data
		DB.query().then(function(data){
			//set this into the session data
			
		});
	
	});
	
});



module.exports = router;