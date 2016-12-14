var router = require('koa-router')();
var body = require('koa-body')();
var bcrypt = require('bcryptjs');
var DB = require('../../bin/db');


router.get('/u/login', function *(){
	this.render('auth/login')
});

router.post('/auth/login', body, function *(){
	//Check to see if the user exists. Then find his password
	var _this = this;
	
	this.type = "application/json";
	this.status = 500;
	
	this.body = yield (done) => {
		DB.find({
			query: [
				[["username","=",this.request.body.u]]
			],
			from: 'user.userlogin'
		}).then((data) => {
			//If the user doesn't exist, exit with ERROR Code 1
			if(!data||data.length == 0)
				return done(null,{error:1});

			//Check if the password is the same.
			var _hashSalt = data[0].password.substr(0,10);
			var _hashedPass = crypto.createHash('sha512').update(_hashSalt+_this.request.body.p).digest('base64');

			//If the passwords aren't the same, exit with ERROR Code 2
			if(data[0].password.substr(10) !== _hashedPass)
				return done(null,{error:2});
			
			//Grab all this user's info
			DB.find({
				query: [
					[["id","=",data[0].userId]]
				],
				from: 'user.user'
			}).then((data) => {
				
				var _token = "";
				
				_token += global.universities[data.universityId].prefex;
				
				Date.wno
				global.API_SECRET;
				bcrypt.hashSync(global.API_SECRET+_token);
				
				
				this.status = 200;
				//Toss it in memcached session
				done(null,{success: 1});
			});
		});
	}

});


module.exports = router;