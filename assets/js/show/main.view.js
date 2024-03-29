function View(){
	this.sliderMap = {
		time: 0.5,
		density: 0
	};
	
	this._sCounter = 0;
	this._templates = {};
	this._disabled = false;
	
	this.enableInfinite();
	this.enableResponsive();
	this.enableSliders();
}







View.prototype.render = function(num){

	var _start = Date.now();
	var _schedules = Schedular.Controller.Schedules;
	var _container = document.getElementById('schedule__scrollWrap');
	num = num||10;
	
	//If there's a disabled flag up, we can't continue.
	if(this._disabled)
		return false;

	//If there's a refresh signaled, clear the container and only show 2 for speed reasons
	if(num == -1){
		this._sCounter = 0;
		num = 2;
		
		while(_container.children.length > 0){
			_container.removeChild(_container.children[0]);
		}
		
	}
	
	//If there aren't enough schedules to show, shorten num
	if((this._sCounter + num) >= _schedules.length){
		num = _schedules.length - this._sCounter;
	}
	
	//Show all the schedules and reset num
	var _final = num + this._sCounter;
	for(var i = this._sCounter;i < _final;i++){
		_container.appendChild(this.makeSchedule(_schedules[i]));
	}	
	
	this._sCounter += num;
	
	console.info("Finished rendering " + num + " schedules in" + (Date.now()-_start) + "ms");

}


View.prototype.makeSchedule = function(schedule){
	var _wrapper = this.gen('schedule__wrapper');
	var _course = _wrapper.getElementsByClassName('schedule__blockContainer')[0];
	
	for(var i = 0;i < schedule.length;i++){
		_course.appendChild(this.makeBlocks(schedule[i]));
	}
	this.addProfs(_wrapper,schedule);
	
	return _wrapper;
}

View.prototype.gen = function(template){
	var _temp = this._templates[template];
	if(_temp)
		return _temp.cloneNode(true);
	
	var _templateContainer = document.getElementById('templates');
	
	var _temp = _templateContainer.getElementsByClassName(template)[0];
	this._templates[template] = _temp;
	
	return _temp.cloneNode(true);
}

View.prototype.addProfs = function(wrapper,schedule){
	var _profs = wrapper.getElementsByClassName('schedule__info')[0];
	var _sum = 0,_count=0;
	for(var i = 0,ii = schedule.length;i < ii;i++){
		var _schedule = schedule[i];
		for(var p = 0,pp = _schedule.profs.length;p < pp;p++){
			var _line = this.gen('schedule__infoLine');
			var _b = document.createElement('br');
			_line.children[0].innerHTML = _schedule.title+' '+_schedule.section;
			console.log(_schedule.profs)
			_line.children[1].innerHTML = _schedule.profs[p].name||'{Unknown}';
			_line.children[2].innerHTML = _schedule.profs[p].rating||'';
				
			_line.children[0].style.color = UTIL.helper.color.bgColor(_schedule.title)
			_profs.appendChild(_line);
			_profs.appendChild(_b);
			if(_schedule.profs[p].rating){
				_sum+=_schedule.profs[p].rating
				++_count;
			}
		}
	}
		
	wrapper.getElementsByClassName('schedule__avgRating')[0].innerHTML = (_sum/_count).toFixed(2);
		
		
}

View.prototype.makeBlocks = function(section){
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

View.prototype.blockListen = function(element,times,day){
	var _time = times[day];
	var days =  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	var time1 = UTIL.helper.time.convert(_time[0]);
	var time2 = UTIL.helper.time.convert(_time[1]);
	var _tip;
	
	_tip = Tips.init(element,days[day]+' | '+time1+' — '+time2)
}

View.prototype.enableInfinite	=	function(){
	var _this = this;
	window.onscroll = function(ev) {
		//This is what JQUery does to get document height.
		var body = document.body,
		html = document.documentElement;

		var height = Math.max( body.scrollHeight, body.offsetHeight, 
													 html.clientHeight, html.scrollHeight, html.offsetHeight );
		
		//We don't want to touch the bottom
    if ((window.innerHeight + window.scrollY) >= height * 0.75) {
			console.log(window.innerHeight,window.scrollY, height);
			_this.render();
		}
	};
}

View.prototype.enableResponsive = function(){
	

}
View.prototype.enableSliders = function(){
	var _this = this;
	var _blobs = document.getElementsByClassName('slider__blob');
	[].forEach.call(_blobs,function(blob){
		var clicked = false;
		blob.listen({
			mousedown: function(){clicked = true;},
			touchstart: function(){clicked = true;}
		});
		document.listen({
			touchcancel: function(){clicked = false;},
			touchend: function(){clicked = false;},
			mouseup: function(){clicked = false;},
			mousemove: function(e){
		
				var bigY = blob.parentNode.getBoundingClientRect().top;
				var bigX = blob.parentNode.getBoundingClientRect().left;

				var newX = (e.clientX - bigX - 10);

				if(clicked&&!(newX > 150 || newX < 0)){
					blob.style.left =  newX + 'px';
					_this.sliderMap.time = newX/150;
					Schedular.Controller.sort();
					_this.render(-1);
					//blob.previousSibling.style.width = newX + 'px';
				}
			},
			touchmove:function(e){
				var bigY = blob.parentNode.getBoundingClientRect().top;
				var bigX = blob.parentNode.getBoundingClientRect().left;

				var newX = (e.targetTouches[0].pageX - bigX - 10);

				if(clicked&&!(newX > 150 || newX < 0)){
					blob.style.left =  newX + 'px';
					_this.sliderMap.time = newX/150;
					Schedular.Controller.sort();
					_this.render(-1);
					//blob.previousSibling.style.width = newX + 'px';

				}
			}
		});
	});
}

View.prototype.none = function(){
	//Show that there are no schedules to show.
	var _container = document.getElementById('schedule__scrollWrap');
	var _msg = this.gen('none__big');
	this._disabled = true;
	_container.appendChild(_msg);
}





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
