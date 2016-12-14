function Login(options){
	var _username = this.username = document.getElementById(options.username);
	var _password = this.password = document.getElementById(options.password);
	var _form = this.form = document.getElementById(options.form);
	var _notif = this.notif = document.getElementById(options.notif);
	
	var _this = this;
	
	_form.onsubmit = function(){
		_this.go();
		return false;
	};
	
	[].forEach.call(_form.getElementsByTagName('input'),function(input){
		input.addEventListener('focus',function(){
			_this.hideError();
		});
	});
	
	
}


/*
	@method Login.go	-	sends the login values to the server
		- routes to the appropriate place dependant on the result
*/

Login.prototype.go = function(){
	var _this = this;
	
	//Make sure inputs are properly filled
	if(!this.filled())
		return;
		
	$.post({
		url: '/auth/login',
		data: {
			u: this.username.value,
			p: this.password.value
		},
		done: function(){
			_this.success.apply(_this,arguments)
		},
		error: function(){
			_this.error.apply(_this,arguments)
		}
	});
}
/*
	@method Login.filled	- checks if the inputs are filled and routes to error if bad
*/
Login.prototype.filled = function(){
	
	if(this.username.value.trim() === "" || this.password.value === ""){
		this.error({error:0});
		return false;
	}
	
	return true;
}


/*
	@method Login.success	- just simply reroute the user to the homepage
*/

Login.prototype.success	=	function(){
	var _this = this;
	this.notif.innerHTML = 'Marvelous!';
	Velocity(_this.notif,'slideDown','fast');
	setTimeout(function(){
		document.location = '/';
	},400);
}

/*
	@method Login.error - shows the appropriate error thing to the user
*/

Login.prototype.error = function(res){
	var _this = this; 
	var ERROR_CODE_MAP = {
		0: "Look, I can't log you in if you haven't put in your username and password...",
		1: "That username hasn't been registered, you can signup for it",
		2: "Yo, you put in your password wrong",
		3: "Bro, c'mon you haven't activated your account"
	};
	this.notif.innerHTML = ERROR_CODE_MAP[res.error];
	Velocity(this.notif,'slideDown','fast');
}

Login.prototype.hideError = function(){
	Velocity(this.notif,'slideUp');
}




var LoginAgent = new Login({
	notif: 'inp_notif',
	username: 'inp_username',
	password: 'inp_password',
	form: 'inp_form'
});