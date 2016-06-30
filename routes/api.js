var router = require('koa-router')();
var Mongo = require('../bin/mongo');
var bcrypt = require('bcryptjs');


router.prefix('/api/v1/:uni/');


//Make sure the token is valid and that the uni is the one that this uses


router.use(function *(next){
	this.type = 'application/json';
	/*

	var _declareError = function (){
		this.status = 500;
		this.body = {
			error: 'bad token'
		};
	}
	
	//Replace the query token and this token with the parsed token
	var _token = this.query.token = (this.query.token||"").split('..--..');
	
	if(_token.length!==2)
		return _declareError();
	
	if(!bcrypt.compareSync(global.SECRET+_token[0],_token[1])){
		
		//Don't let any expired tokens go through
		if(parseInt(_token[0].split('|')[1])<Date.now())
			_declareError();
		else
			yield next;
		
	}else{
		
		_declareError();
		
	}
*/
	yield next;
});


/*
*	@route Courses
*		@param {String} courses , comma seperated list of all the courses requested
*/

router.get('/courses',function *(){
	var _this = this;
	
	// Grab the university collection from the url parameter
	var _UniCol = Mongo.get(this.params.uni.split('/')[0]);
	
	// Grab the wanted university course codes
	var _CourseArray = (((this.query.courses)||"").split(','))||[];
	console.log(_CourseArray)
	// Grab the courses based on the course codes
	if(_CourseArray.length == 0){
		this.body = {error: "NCS"};
		return;
	}
	if(_CourseArray.length >= 12){
		this.body = {error: "TMC"};
		return;
	}
	
	yield (callback) => {
		console.log(this.params.uni);
		_UniCol.find({title:{$in:_CourseArray}},{ fields:{_id:0} },(e,d) => {
			if(e)
				return callback(e);
			_this.body = d;
			console.log(e);
			callback(null,d);
		});
	}
	
});



/*
*	@route search
*		@param {String} query , comma seperated list of all the courses requested
*/

router.get('/search',function *(){
	var _this = this;
	
	//Grab the university collection
	var _UniCol = Mongo.get(this.params.uni.split('/')[0]);
	
	//We don't want any non-alphanumeric chars messing up the regex
	var _q = this.query.q.replace(/[^\d\sA-Za-z]/,'');
	
	//This is the query object that we're sending. And make it a regex #mongo
	var _query = new RegExp(_q,'i');
	console.log(_query);
	//Yield the mongo search
	yield new Promise((resolve,reject) => {
		_UniCol.find({title: _query},{fields:{title: 1,name: 1,_id: 0},limit:5},(err,docs) => {
			if(err)
				return reject(Error(err));
			this.body = docs;
			resolve();
		});
	});
	
});



/*
*	@route Profs
*		@param {String} names , comma seperated list of the names of all the profs requested
*/

router.get('/profs',function *(){
	var _this = this;
	
	//Get the university collection
	var _UniCol = Mongo.get(this.params.uni.split('/')[0]+'Prof');
	
	//Get the prof names
	var _profs = this.query.profs.split(',');
	
	//Yield the mongo search
	yield new Promise((resolve,reject) => {
		_UniCol.find({name:{$in:_profs}},{_id: 0},(err,docs) =>{
			if(err)
				return reject(Error(err));
			this.body = docs;
			resolve();
		});
	});
	
});


module.exports = router;




