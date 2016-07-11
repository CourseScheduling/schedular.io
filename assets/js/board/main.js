function Board(options){
	this.board = options.board;
	this.bHeight = parseInt(window.getComputedStyle(this.board).height);
}

Board.prototype.add = function(timeArr,name,temp){
	var _make = UTIL.helper.element.create;
	var _style = UTIL.helper.element.editStyle;
	var _uniqid = '$block_'+Math.random().toString(36).substr(10);
	// TimeArr is an array of time block.
	// Each timeBlock should be of the following format
	// [START_TIME, END_TIME, DAY]
	// All times are in minutes, and day is 0-6, Mon-Sun

	for(var i = 0,ii = timeArr.length;i < ii;i++){
		var _start = timeArr[i][0];
		var _end = timeArr[i][1];
		var _day = (timeArr[i][2] + 1)%7;
	
		var _actHeight = _block

		var _block = _make('div',{dataBlock: _uniqid, class: 'board__timeBlock '+_uniqid, html: name});
		_style(_block,{
			top: ((100 * _start) / this.bHeight) + '%',
			left: ((100 / 7) * _day) + '%',
			height: ((100 * (_end - _start)) / this.bHeight)+ '%',
			backgroundColor: UTIL.helper.color.bgColor(name),
			opacity: (1 - (0.5*~~temp))
		});
		this.board.appendChild(_block);
	}
	return _uniqid;
}

Board.prototype.remove = function(_uniqid){
	var _board = this.board;
	var _blocks = _board.getElementsByClassName(_uniqid);
	while(_blocks.length)
		_board.removeChild(_blocks[0]);
}


var Board = new Board({
	board: document.getElementById('board__blockContainer')
});