global.API_SECRET = "No, sir, I do not bite my thumb at you, sir, but I bite my thumb, sir.";

var Koa = require('koa');
var Gzip = require('koa-gzip');
var Logger = require('koa-logger');
var Static = require('koa-static');
var Jade = require('koa-jade');
var ChildProcess = require('child_process');

var api = require('./routes/api');
var home = require('./routes/home');/*
var login = require('./routes/auth/login');
var signup = require('./routes/auth/signup');*/
var main = require('./routes/main/main');

//require('./bin/seats')

var app = Koa();

var jade = new Jade({
	viewPath:'./views',
	noCache: true,
	app:app
});

app.use(Gzip());
app.use(Logger());

app.use(home.routes());
app.use(api.routes());/*
app.use(login.routes());
app.use(signup.routes());*/
app.use(main.routes());

app.use(Static('./assets',{
	hidden: false,
	maxage: 3
}));

app.listen(5000);
console.log('Schedular is Listening on port 5000');