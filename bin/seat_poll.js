var ajax = require('./Ajax.js');

'http://ufv.ca/arfiles/Banner_Size_Sect_CR.txt'

// Returns the lines of data.
b.split('\n').filter(function(line){
	return line.substr(0,6).match(/\d{5}/)
}).map(function(line){
	return line.substr(1).split('|').map((arr) => (arr.trim()))
}).map(function(arr){
	var crn = ~~arr[0].substr(0,5);
	var max = ~~arr[1].split(' ').filter((i) => (i))[0];
	var enrolled = ~~arr[1].split(' ').filter((i) => (i))[1];
	var wait = ~~arr[3];

	return [crn,max,enrolled,wait];
});



var n = b.split('\n')[0].split(' ').filter((i) => (i))[3].split(':');
var time = ((n[0] * 60) + (~~n[1]));




if(oldTime !== null){
	if(time - oldTime){

	}
}


/*
	The protocol
	- Do a request, get old time
	- Do a request in constant intervals.
	- Once a change in time is detected,
	- Update based on the new interval
	
	- Check every interval, if not in an accepted error rate, update.
	- 



*/



/*
	Every 5 minutes, delete a thing
	
*/




function UFV(){
	this.baseURL = 'http://ufv.ca/arfiles/Banner_Size_Sect_CR.txt';
}

UFV.prototype.start = function(){
	var _this = this;

	ajax.get({
		url: this.baseURL,
		done: function(data){
			_this.getTime(data);
			_this.oldTime = _this.getTime(data);
		}
	})
}


/*
* UFV._getTime - accepts the data, returns the current time
*	@param {String} data - the data of the page
*	@returns {Integer} - the time in minutes
*/
UFV.prototype._getTime = function(data){
	var n = b.split('\n')[0].split(' ').filter((i) => (i))[3].split(':');
	return ((n[0] * 60) + (~~n[1]));
}