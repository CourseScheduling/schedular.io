function Model(){
	this.Courses = [];
	this.Sections = {};
}

Model.prototype.fetch = function(cb){
	var _this = this;
	var _c = window.getParam('c');
	this.get('courses',{courses: _c},function(data){

		var _profs = {};
		//Extract Profs
		for(var i = 0, ii = data.length;i < ii;i++){
			var _sections = data[i].sections;
			for(var c = 0,cc = _sections.C.length;c < cc;c++){
				var _section = _sections.C[c];
				_section.profs.forEach(function(name){
					_profs[name]=1
				});
			}
			for(var l = 0,ll = _sections.L.length;l < ll;l++){
				var _section = _sections.L[l];
				_section.profs.forEach(function(name){
					_profs[name]=1
				});
			}
			for(var t = 0,tt = _sections.T.length;t < tt;t++){
				var _section = _sections.T[t];
				_section.profs.forEach(function(name){
					_profs[name]=1
				});
			}
		}
		
		//This is kinda hacky, but some of the profs are {None}
		_profs = {
			profs: Object.keys(_profs).join(',').replace(/\{None\},/g,'').split(',')
		};
		window.Courses = data;
		
		_this.get('profs',_profs,function(profs){
			window.Profs = profs;
			Schedular.Controller.start();
		});
	});
}


Model.prototype.get	=	function(type,params,callback){
	var _queryString = "";
	var _university = UTIL.helper.localStorage.get('UNIVERSITY');
	for(var key in params){
		_queryString += [key,"=",params[key], "&"].join('');
	}
	_queryString += 'token=' + UTIL.helper.localStorage.get('API_TOKEN');
	$.get({
		url: '/api/v1/'+_university+'/'+type+'/?'+_queryString,
		json: true,
		done: function(data){
			callback&&callback(data);
		}
	});
}