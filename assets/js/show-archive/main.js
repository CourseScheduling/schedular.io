Schedular = {};

Schedular.Model = new Model();
Schedular.Controller = new Controller();
Schedular.View = new View();


(function main(){
	Schedular.Model.fetch();
})();

/*
window.getParam = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}




function WaterFall(goArray,callback){
	var _counter = 0;
	var _data = [];
	var _spin = function(dataNow){
		goArray[_counter](dataNow,function(dataNext,dataFuture){
				_data.push(dataFuture);
			if(++_counter == goArray.length){
				callback(_data);
			}else{
				_spin(dataNext)
			}
		});
	};
	_spin();
	
}



var Courses = [];
var Sections = {};



function Schedular(){
	this.mobile = false;
	this.Courses = {};
	this.fetch(function(){
	
		this.prep();
		this.schedule();
		this.render(-1);

	});
	
	return this;
}

Schedular.prototype.fetch = function(cb){
	
	var _this = this;

	WaterFall([
		function(data,cb){
			$.get({
				url: '/api/v1/ufv/courses?courses='+window.getParam('c'),
				json: true,
				done: function(data){

					var _profs = [];
					//Extract Profs
					for(var i = 0, ii = data.length;i < ii;i++){
						var _sections = data[i].sections;
						for(var c = 0,cc = _sections.C.length;c < cc;c++){
							var _section = _sections.C[c];
							_profs = _profs.concat(_section.profs);
						}
						for(var l = 0,ll = _sections.L.length;l < ll;l++){
							var _section = _sections.L[l];
							_profs = _profs.concat(_section.profs);
						}
						for(var t = 0,tt = _sections.T.length;t < tt;t++){
							var _section = _sections.T[t];
							_profs = _profs.concat(_section.profs);
						}
					}

					cb(_profs,data);
				}
			});

		},function(data,cb){
			$.get({
				url: '/api/v1/ufv/profs?names='+data.join(','),
				json: true,
				done: function(data){
					cb(null,data);
				}
			});
		}
	],function(res){
		_this.Courses = res[0];
		_this.Profs = res[1];
		cb.bind(_this)();
	});

}


Schedular.prototype.prep = function(){
	var Courses = this.Courses;
	this.Sections = {};
	for(var i = 0,ii = Courses.length;i < ii;i++){
		for(var c = 0,cc = Courses[i].sections.C.length;c < cc;c++){
			var _section = Courses[i].sections.C[c];
			this.Sections[_section.uniq] = _section;
		}
		for(var l = 0,ll = Courses[i].sections.L.length;l < ll;l++){
			var _section = Courses[i].sections.L[l];
			this.Sections[_section.uniq] = _section;
		}
		for(var t = 0,tt = Courses[i].sections.T.length;t < tt;t++){
			var _section = Courses[i].sections.T[t];
			this.Sections[_section.uniq] = _section;
		}
	}
}


Schedular.prototype.render = function(num){
	var START = Date.now();
	var _container = document.getElementById('schedule__scrollWrap');
	if(num == -1){
		while(_container.children.length)
			_container.removeChild(_container.children[0]);
		num = 2;
	}
	
	for(var g = 0;g<num;g++){
		var _frag = document.createDocumentFragment();
		var _wrapper = T.gen((this.mobile?'m-courseWrap':'courseWrap'));

		for(var i = 0,ii = this.schedules[0].length;i < ii;i++){

			//Generate blocks for each course and add them to _frag
			_frag.appendChild(this.makeBlocks(this.schedules[g][i]));
		}

		//Add the entire frag object to the wrapper
		_wrapper.getElementsByClassName('schedule__blockContainer')[0].appendChild(_frag);
		_container.appendChild(_wrapper);
	}
	
	console.info('Rendered in '+(Date.now()-START)+'ms');
}




Schedular.prototype.makeBlocks = function(section){
	var _frag = document.createDocumentFragment(); 
	for(var day in section.times){
		if(day<0||day>6)
			continue;
		var _block = UTIL.helper.element.create('div',{class:'schedule__s'});
		this.blockListen(_block,section.times,day);
		var _time = section.times[day];
		UTIL.helper.element.editStyle(_block,{
			top: [((_time[0]-480)/900)*100,'%'].join(''),
			left: [(day%6+1)*(100/7),'%'].join(''),
			height: [((_time[1]-_time[0])/840)*100,'%'].join('')
		});

		_block.style.lineHeight = _block.clientHeight;

		var name = UTIL.helper.element.create('div',{class:'schedule__s__name'});
		name.innerHTML = section.title;
		name.style.backgroundColor = UTIL.helper.color.bgColor(section.title);

		_block.appendChild(name);
		_frag.appendChild(_block);
	}
	return _frag;
}

Schedular.prototype.blockListen = function(element,times,day){
	var _time = times[day];
	var days =  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	var time1 = UTIL.helper.time.convert(_time[0]);
	var time2 = UTIL.helper.time.convert(_time[1]);
	var _tip;
	
	_tip = Tips.init(element,days[day]+' | '+time1+' — '+time2)
}





Schedular.prototype.mobile = function(on){

	if(this.mobile == on)
		return;
	
	this.mobile = on;
	this.render(-1);
	
}






Schedular.prototype.sort = function(Ts){
//
//	var Ts = getTimeSliderValue();
//	var Ds = getDensitySliderValue();
//	
	var Time = Date.now();
	this.schedules.sort(function(a,b){	
		return Math.abs(Ts-a.avgtime)-Math.abs(Ts-b.avgtime);
	});
	
	console.info('Sorted Schedules in '+(Date.now() - Time)+ 'ms');
	
	
	


}







Schedular = new Schedular();


window.onresize = function(){
	if(window.innerWidth < 1100)
		Schedular.mobile(true);
	else
		Schedular.mobile(false);
};

// A prototype for ToolTips


function Tips(){
	var _tip = UTIL.helper.element.create('div',{id:'Tips-toolTip'});
	document.body.appendChild(_tip);
	this._tip = _tip;
}

Tips.prototype.init	=	function(block,msg){
	var _this = this;
	block.onmouseover = function(){
		_this.show(block,msg);
	}
	block.onmouseout = function(){
		_this.hide(block,msg);
	}
}

Tips.prototype.show = function(block,msg){
	var calcOffset = function(element) {
			var top = 0, left = 0;
			do {
					top += element.offsetTop  || 0;
					left += element.offsetLeft || 0;
					element = element.offsetParent;
			} while(element);

			return [top,left];
	};

	var _offset = calcOffset(block);
	UTIL.helper.element.editStyle(this._tip,{
		top: _offset[0]-30,
		display: 'block'
	});
	this._tip.innerHTML = msg;
	
	var _left = _offset[1]+(parseInt(window.getComputedStyle(block).width)/2) - (parseInt(window.getComputedStyle(this._tip).width)/2)
	this._tip.style.left = _left;
	
}
Tips.prototype.hide = function(block){
	this._tip.style.display = 'none';
}
Tips = new Tips();

//The thing that we can put templates into and regenerate

function Template(templates){
	for(var template in templates){
		this[template] = templates[template];
	}
}

Template.prototype.gen	=	function(name){
	return this[name].cloneNode(true);
}


var _templates = document.getElementById('templates');

T = new Template({
	courseWrap: _templates.getElementsByClassName('schedule__wrapper')[0]
});*/