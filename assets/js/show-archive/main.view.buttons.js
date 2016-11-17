/*View.prototype.enableButtons = function(){

}

View.prototype.button = function(el,type){

	//Find this button's parent
	var parent = el.parentNode;
	while(!parent.classList.contains('schedule__wrapper')){
		parent = parent.parentNode;
	}

	var index = +(parent.getAttribute('data-schedule__index'));
	var uniqs = Schedular.Controller.Schedules[index].map(function(section){
		return '<span style="font-family:Open Sans;font-weight: 400;color: #999">'+section.title+' | '+section.section+': </span>'+section.uniq;
	}).join('<br>');
	var uniqContainer = document.createElement('div');
	uniqContainer.style = 'margin-top: 50px;font-size: 14px;font-weight: 600;font-family: Varela Round';
	uniqContainer.innerHTML = uniqs;


	new Modal({
		type: 'body',
		header: 'Here they are',
		temp: true,
		body: uniqContainer
	});
}*/