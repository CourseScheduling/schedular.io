//Intialize the constants
var DROP_SPEED = 100;

/*
*	@class Instant
*		@param {JSON Object} options
*			@key {Node} input
*			@key {Node} dropDown
*			@key {Node} courseTemplate
*/

function Instant(options){
	
	//Create the private variables
	this.input = options.input;
	this.dropDown = options.dropDown;
	this.courseContainer = options.courseContainer;
	this.buttons = options.buttons;
	this.templates = {};
	this.courses = {};
	this._courseHash = {};
	//Create the templates
	for(var template in options.templates){
		this.templates[template] = options.templates[template].cloneNode(true);
		this.templates[template].id = "";
	}
	
	//Invoke the event listeners
	this.listen();
	
	
	
	//Add the courses to the containers
	var _courses = UTIL.helper.localStorage.get('courses')||{};
	for(var course in _courses){
		this.addCourse(course)();
		this.courses[course] = 1;
	}
	UTIL.helper.localStorage.set('courses',_courses);
	
	return this;
}


/*
*	Instant.Listen - the method that sets all the listeners needed	
*/

Instant.prototype.listen = function(){
	var _this = this;
	var _input = this.input;
	
	_input.addEventListener('keyup',function(e){
		
		var _val = _input.value.trim();
		
		//If the input is empty we don't have to do anything
		if(!_val)
			return _this.hideDrop();
		
		//We don't care about non alphanumeric characters
		_val = _val.replace(/[^a-zA-Z\d\s:]/g,'');
		
		//Search for the courses and output them
		_this.query(_val,function(data){
			
			//Fill and show the dropdown with the course data
			_this.fillDrop(data);
			_this.showDrop();
		});
		
	});
	
	[].forEach.call(this.buttons,function(button){
		button.addEventListener('click',function(){
			document.location = button.getAttribute('href')+'?c='+Object.keys(_this.courses).join(',');
		});
	});
}

/*
*	Instant.query - hit the API with the value
*		@param {String} value
*/

Instant.prototype.fillDrop = function(data){
	
	//Clear the dropdown
	while(this.dropDown.children.length)
		this.dropDown.removeChild(this.dropDown.children[0]);
	
	for(var i = 0,ii = data.length;i < ii;i++){
		var _result = this.templates.result.cloneNode(true);
		_result.getElementsByClassName('result__header')[0].innerHTML = data[i].title;
		_result.getElementsByClassName('result__body')[0].innerHTML = data[i].name;
		_result.onclick	=	this.addCourse(_result, data[i].title);
		this.dropDown.appendChild(_result);
	}
}


/*
*	Instant.query - hit the API with the value
*		@param {String} value - the query from the input
*		@param {Function} callback - the callback to recieve the returned value
*/

Instant.prototype.query = function(value,callback){
	var _this = this;
	var _token = UTIL.helper.localStorage.get('token');
	var _uni = UTIL.helper.localStorage.get('UNIVERSITY');
	var _url = ('/api/v1/'+_uni+'/search?q='+value);
	
	$.get({
		token: _token,
		url: _url,
		done:	callback
	});
}



/*
*	Instant.hideDrop - the method that removes everything in the dropdown and hides it if needed
*/

Instant.prototype.hideDrop = function(){
	var _this = this;
	var _drop = this.dropDown;
	
	if(_drop.style.display !== 'block'){
		return;
	}
	
	Velocity(_drop,'slideUp',DROP_SPEED);
}


/*
*	Instant.showDrop - the method that slides the dropdown if necessary
*/

Instant.prototype.showDrop = function(){
	var _this = this;
	var _drop = this.dropDown;
	
	if(_drop.style.display == 'block'){
		return;
	}
	
	Velocity(_drop,'slideDown',DROP_SPEED);
}


/*
*	Instant.addCourse - the method that adds the course to the courseContainer
*/

Instant.prototype.addCourse = function(el, course){
	var _this = this;
	var _make = UTIL.helper.element.create;
	var hover = function(_sec,section){
		var things = [];
		_sec.addEventListener('mouseover',function(){
			var timeArr = [];
			console.log(section)
			var time = section.times;
			for(var i = 0;i < 7;i++){
				if(!time[i]) continue;
				timeArr.push(time[i].concat([i]));
			}
			things.push(Board.add(timeArr,section.title,false))
		});

		_sec.addEventListener('mouseout',function(){
			things.forEach(function(b){Board.remove(b)});
			things = [];
		});
	}
	return function(){
		_this.getCourse(course, function(a){
			a = a[0]
			var wrap = el.getElementsByClassName('result__sections')[0];
			for(var type in a.sections){
				if(a.sections[type].length){
					wrap.appendChild(_make('div',{class:'result__sections result__sections--divider'}));

					for(var i = 0, ii = a.sections[type].length;i < ii;i++){
						var _sec = _make('div',{class:'result__section',html: a.sections[type][i].section});
						wrap.appendChild(_sec);
						hover(_sec,a.sections[type][i]);
					}
				}
			}
			Velocity(wrap, 'slideDown',DROP_SPEED);
		});
		/*
		_this.hideDrop();
		
		if(_this.courses[course])
			return;
		
		var _coursesTemp = UTIL.helper.localStorage.get('courses');
		_coursesTemp[course] = 1;
		_this.courses[course] = 1;
		UTIL.helper.localStorage.set('courses',_coursesTemp);
		
		
		var _course = _this.templates.course.cloneNode(true);
		_course.style.backgroundColor = UTIL.helper.color.bgColor(course);
		_course.getElementsByClassName('course__text')[0].innerHTML = course;
		
		_this.courseContainer.appendChild(_course);
		_course.addEventListener('click',_this.destroyCourse(_course,course));
		_this.input.value = '';*/
	}
}


/*
*	Instant.destroyCourse - the method that adds the course to the courseContainer
*/

Instant.prototype.destroyCourse = function(course,title){
	var _this = this;
	
	return function(e){
		delete _this.courses[title]
		var _coursesTemp = UTIL.helper.localStorage.get('courses');
		delete _coursesTemp[title];
		UTIL.helper.localStorage.set('courses',_coursesTemp);
		course.parentNode.removeChild(course);
	}
	
}


/*
*	Instant.getCourse - grabs the course and all the section data from the API
*/

Instant.prototype.getCourse = function(title, callback){
	var _this = this;
	var _token = UTIL.helper.localStorage.get('token');
	var _uni = UTIL.helper.localStorage.get('UNIVERSITY');
	var _url = ('/api/v1/'+_uni+'/courses?courses='+title);
	if(this._courseHash[title]){
		return callback&&callback(this._courseHash[title]);
	}

	$.get({
		token: _token,
		url: _url,
		done: function(data){
			_this._courseHash[title] = data;
			callback&&callback(data);
		}
	});
}


//Create the instant object
window.Instant = new Instant({
	input: document.getElementById('instant__input'),
	dropDown: document.getElementById('dropdown'),
	courseContainer: document.getElementById('courseContainer'),
	templates:{
		result: document.getElementById('resultTemplate')
	}
});







/*
* This is to fetch the university in case we can't find one
*/
if(!UTIL.helper.localStorage.get('UNIVERSITY')){

	new Modal({
		type: 'select',
		header: "<strong>Hey!</strong> What university do you go to?",
		options: {
			sfu: 'SFU - Simon Fraser University',
			ufv: 'UFV - University of the Fraser Valley'
		},
		onChoice: function(uni){
			UTIL.helper.localStorage.set('UNIVERSITY',uni,Date.now());
		}
	});

}
