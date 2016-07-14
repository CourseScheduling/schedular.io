var ajax = require('./Ajax.js');

'http://ufv.ca/arfiles/Banner_Size_Sect_CR.txt'

// Returns the lines of data.
b.split('\n').filter(function(line){
	return line.substr(0,6).match(/\d{5}/)
}).map(function(line){
	return line.substr(1).split('|').map((arr) => (arr.trim()))
}).map(function(arr){
	var crn = arr[0].substr(0,5);
	var max = arr[1].substr();
});



var n = b.split('\n')[0].split(' ').filter((i) => (i))[2].split(':');
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



