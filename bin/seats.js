global.seats.on('message', function(m){
	switch(m.type){
		case 'E': //Error
			console.log('ERROR In The Seat Department');
			console.log(m.data);
		break;
		case 'S': //Seats
			global.seats = m.data;
		break;
	}
});


































module.exports = {};