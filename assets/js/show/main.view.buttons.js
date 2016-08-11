View.prototype.enableButtons = function(){

}

View.prototype.button = function(el,type){

	//Find this button's parent
	var parent = el.parentNode;
	while(!parent.classList.contains('schedule__wrapper')){
		parent = parent.parentNode;
	}

	var index = +(parent.getAttribute('data-schedule__index'));
	var uniqs = Schedular.Controller.Schedules[index].map(function(section){
		return section.uniq;
	})
	new Modal({
		type: 'body',
		header: 'Here they are',
		temp: true,
		body: uniqs
	});
}