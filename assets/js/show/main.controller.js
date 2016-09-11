function Controller(){
	this.Schedules = [];
}

Controller.prototype.start = function(){
	if(!Courses.length)
		return Schedular.View.none();
	var $this = this;
	this.prep();
	this.schedule(function(){
		if(!$this.Schedules.length)
			return Schedular.View.none();
		Schedular.View.render(-1);
		Schedular.View.loading(false);
	});
}

Controller.prototype.prep = function(){
	
	window.Sections = {};
	for(var i = 0,ii = Courses.length;i < ii;i++){
		for(var type in Courses[i].sections){
			for(var c = 0,cc = Courses[i].sections[type].length;c < cc;c++){
				var _section = Courses[i].sections[type][c];
				Sections[_section.uniq] = _section;
			}
		}
	}
	
	window.ProfMap = {};
	for(var i = 0,ii = Profs.length;i < ii;i++){
		ProfMap[Profs[i].name] = Profs[i];
	}	
}

Controller.prototype.schedule = function(cb){
	Schedular.View.loading(1);
	var $this = this;
	setTimeout(function(){
	var TIME = Date.now();
	//We don't wanna do $this multiple times...
	if($this.Schedules.length)
		return $this.Schedules;
	
	
	//If you find collisions early you can save a lot of time.
	Courses.sort(function(a,b){return a.length - b.length;});
	
	var s01, e01, s02, e02, 
	s11, e11, s12, e12, 
	s21, e21, s22, e22, 
	s31, e31, s32, e32, 
	s41, e41, s42, e42, 
	s51, e51, s52, e52, 
	s61, e61, s62, e62;	
	var possible = Courses[0].mangled;
	for(var i = 1,ii = Courses.length;i < ii;i++){
		var _tCourse = Courses[i].mangled;
		var _tCL = _tCourse.length;
		var _temp = possible.slice(0);
		possible = [];
		for(var s = 0,ss = _temp.length; s < ss;s++){
			var _schedule = _temp[s];
			var _sL = _schedule.length;
			BadCombo:
			for(var c = 0,cc = _tCL;c < cc;c++){
				var _course = _tCourse[c]
				var _cL = _course.length;
				for(var cS = 0,cSS = _sL; cS < cSS;cS++){
					var _courseS = _schedule[cS];
					for(var m = 0,mm = _cL;m < mm;m++){
						var CObj = Sections[_course[m]].times;
						var CSObj = Sections[_courseS].times;
/*
						if (CSObj.times[n] && CObj.times[n]) {
							var s1 = CSObj.times[n][0];
							var e1 = CSObj.times[n][1];

							var s2 = CObj.times[n][0];
							var e2 = CObj.times[n][1];

							if((((s2>=s1)&&(s2<e1))||((e2>s1)&&(e2<e1)))||(((s1>=s2)&&(s1<e2))||((e1>s2)&&(e1<e2))))
								continue BadCombo;
						}
*/


							if(
							((CSObj[0] && CObj[0] && (s01 = CSObj[0][0]) && (s02 = CObj[0][0]) && (e01 = CSObj[0][1]) && (e02 = CObj[0][1])) && ((((s02>=s01)&&(s02<e01))||((e02>s01)&&(e02<e01)))||(((s01>=s02)&&(s01<e02))||((e01>s02)&&(e01<e02))))) ||
							((CSObj[1] && CObj[1] && (s11 = CSObj[1][0]) && (s12 = CObj[1][0]) && (e11 = CSObj[1][1]) && (e12 = CObj[1][1])) && ((((s12>=s11)&&(s12<e11))||((e12>s11)&&(e12<e11)))||(((s11>=s12)&&(s11<e12))||((e11>s12)&&(e11<e12))))) ||
							((CSObj[2] && CObj[2] && (s21 = CSObj[2][0]) && (s22 = CObj[2][0]) && (e21 = CSObj[2][1]) && (e22 = CObj[2][1])) && ((((s22>=s21)&&(s22<e21))||((e22>s21)&&(e22<e21)))||(((s21>=s22)&&(s21<e22))||((e21>s22)&&(e21<e22))))) ||
							((CSObj[3] && CObj[3] && (s31 = CSObj[3][0]) && (s32 = CObj[3][0]) && (e31 = CSObj[3][1]) && (e32 = CObj[3][1])) && ((((s32>=s31)&&(s32<e31))||((e32>s31)&&(e32<e31)))||(((s31>=s32)&&(s31<e32))||((e31>s32)&&(e31<e32))))) ||
							((CSObj[4] && CObj[4] && (s41 = CSObj[4][0]) && (s42 = CObj[4][0]) && (e41 = CSObj[4][1]) && (e42 = CObj[4][1])) && ((((s42>=s41)&&(s42<e41))||((e42>s41)&&(e42<e41)))||(((s41>=s42)&&(s41<e42))||((e41>s42)&&(e41<e42))))) ||
							((CSObj[5] && CObj[5] && (s51 = CSObj[5][0]) && (s52 = CObj[5][0]) && (e51 = CSObj[5][1]) && (e52 = CObj[5][1])) && ((((s52>=s51)&&(s52<e51))||((e52>s51)&&(e52<e51)))||(((s51>=s52)&&(s51<e52))||((e51>s52)&&(e51<e52))))) ||
							((CSObj[6] && CObj[6] && (s61 = CSObj[6][0]) && (s62 = CObj[6][0]) && (e61 = CSObj[6][1]) && (e62 = CObj[6][1])) && ((((s62>=s61)&&(s62<e61))||((e62>s61)&&(e62<e61)))||(((s61>=s62)&&(s61<e62))||((e61>s62)&&(e61<e62)))))) {
								continue BadCombo
							}
					}
				}	
				
				//Since $this ain't a bad combo, we can push it into possibilities array
				possible.push(_schedule.concat(_course));
			}
		}
	}
	
	
	var To = Infinity, Tn = -Infinity;
	var Do = Infinity, Dn = -Infinity;
	if(possible.length == 0){
		return Schedular.View.none();
	}
	var s = possible[0].length;
	for(var i = possible.length;i--;){
		var _schedule = possible[i];
		
		for(var c = s;c--;){
			_schedule[c] = Sections[_schedule[c]];
			var _section = _schedule[c];
			
			for(var p = 0,pp = ((_section.profs&&_section.profs.length)||0);p < pp;p++){
				var _name = _section.profs[p].name|| _section.profs[p]
				if(!ProfMap[_name])
					_section.profs[p] = {name:_name,rating:''};
				else
					_section.profs[p] = ProfMap[_name];
			}
			
		}
		
		// Calculate the course density
		// And the time Average
		var _density = 0;
		var _avgTime = [];
		for(var n = 0;n < 7;n++){
			var _times = [];
			for(var c = s;c--;){
				var _day = _schedule[c].times[n];
				if(_day){
					_times.push(_day);
				}
			}
			
			//Calculate the course density
			
			if(_times.length > 1){
				_times = _times.sort(function(a,b){a=a||0;b=b||0;return a[0]-b[0]})
				for(var t = 0,tt = _times.length-1;t < tt;t++){
					_density += _times[t+1][0]-_times[t][1];
				}
			}
			
			//Calculate the avg course time
			
			for(var t = 0,tt = _times.length;t < tt;t++){
				_avgTime.push(_times[t][0])
			}
		}
		_schedule.time = 0;
		for(var n = 0,nn = _avgTime.length; n < nn;n++){
			_schedule.time += _avgTime[n];
		}
		
		//Change the mins and maxs
		
		if((_schedule.time /= nn) < To){
			To = _schedule.time;
		}
		if(_schedule.time > Tn){
			Tn = _schedule.time;
		}
						
						
		if((_schedule.density = _density) < Do){
			Do = _schedule.density;
		}
		if(_schedule.density > Dn){
			Dn = _schedule.density;
		}
	}
	
	var deltaT = Tn - To;
	var deltaD = Dn - Do;
	
	
	//Set the scaled versions of the values
	for(var i = possible.length;i--;){
		var _schedule = possible[i];
		_schedule.time = (_schedule.time - To)/deltaT;
		_schedule.density = (_schedule.density - Do)/deltaD;
	}
	
	console.info('Finished scheduling in ' + (Date.now()-TIME) + 'ms');
	console.info(possible.length+' possible schedules!');
	$this.Schedules = possible;
	cb&&cb();
	return $this.Schedules;
	},50);
}



Controller.prototype.sort = function(){
	var _density = Schedular.View.sliderMap.density; 
	var _time = Schedular.View.sliderMap.time;
	var s = Date.now();
	this.Schedules.sort(function(a,b){
		return (Math.abs(a.time - _time)-Math.abs(b.time - _time)) || (Math.abs(a.time - _density)-Math.abs(b.time - _density));
	});
	console.info("Sorted in "+(Date.now()-s)+"ms");
}
