var ajax = require('./Ajax.js');

'http://ufv.ca/arfiles/Banner_Size_Sect_CR.txt'

// Returns the lines of data.

/*b.split('\n').filter(function(line){
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

*/
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
	// This is 10 minutes
	this.NORMAL_INTERVAL = 120000;
	this.BASE_URL = 'http://ufv.ca/arfiles/Banner_Size_Sect_CR.txt';
	this._oldTime = 0;
	this._interval = 0;
	this.data = null;
}


/*
* UFV.start - starts the polling, begins by trying to find the update time
*/

UFV.prototype.start = function(){
	var _this = this;

	ajax.get({
		url: this.BASE_URL,
		done: function(data){
			_this._getTime(data);
			_this._oldTime = _this._getTime(data);
			_this._sync(_this.NORMAL_INTERVAL);
			_this.data = _this.parse(data);
		}
	});
}


/*
* UFV._getTime - accepts the data, returns the current time
*   @param {String} data - the data of the page
*   @returns {Integer} - the time in minutes
*/

UFV.prototype._getTime = function(data){
	var n = b.split('\n')[0].split(' ').filter((i) => (i))[3].split(':');
	return ((n[0] * 60) + (~~n[1]));
}


/*
* UFV.parse - accepts the data, returns the parsed stuff as an object
*   @param {String} data - the data of the page
*   @returns {Object} - the object containing all the seat data
*/

UFV.prototype.parse = function(data){
	var Obj = {};

	data.split('\n').filter(function(line){
		return line.substr(0,6).match(/\d{5}/)
	}).map(function(line){
		return line.substr(1).split('|').map((arr) => (arr.trim()))
	}).map(function(arr){
		var crn = ~~arr[0].substr(0,5);
		var max = ~~arr[1].split(' ').filter((i) => (i))[0];
		var enrolled = ~~arr[1].split(' ').filter((i) => (i))[1];
		var wait = ~~arr[3];
		Obj[crn] = [max,enrolled,wait];
	});

	return Obj;
}


/*
* UFV._sync - starts the setInterval and tries to sync it
*/

UFV.prototype._sync = function(){
	var _this = this;
	setInterval(function(){
		var newTime = _this.get();
		if((newTime  - _this._oldTime) > 0){

		}

	},this.NORMAL_INTERVAL);
}



global.universities = {
	UFV: new UFV()
};