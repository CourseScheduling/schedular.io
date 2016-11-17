Cache = {}
function color (col) {
	var colors = ['#EB9532','#BF55EC','#D2527F','#F7CA18','#26A65B']

	if (Cache[col]) return Cache[col]
	
	return (Cache[col] = colors[Object.keys(Cache).length])
}

var Info = document.getElementById('info__template')
var Schedule = document.getElementById('schedule__template')
Schedule.id = Info.id = ''

function view (schedule) {
	var s = Schedule.cloneNode(true)
	var infoBox = document.createElement('div')
	infoBox.classList.add('schedule__infoBox')
	document.getElementById('schedule__container').appendChild(s)

	var canvas = document.createElement('canvas')
	canvas.height = canvas.width = 248
	var ctx = canvas.getContext('2d')
	s.appendChild(canvas)
	s.appendChild(infoBox)
	var infoBox = s.getElementsByClassName('schedule__infoBox')[0]

	schedule.forEach(function (course) {
		var inf = Info.cloneNode(1)
    ctx.font = "11px Open Sans"
    ctx.textAlign = 'center'
    for (var i in course.times) {
      ctx.fillStyle = color(course.title)
      roundRect(ctx,((i * 35.42) + 35.42),((course.times[i][0] - 480)) /5, 33,((course.times[i][1]- course.times[i][0]) / 5),2,true)
      
    }
		inf.getElementsByClassName('strip__course')[0].innerHTML = course.title
		inf.getElementsByClassName('strip__course')[0].style.backgroundColor = ctx.fillStyle
		inf.getElementsByClassName('strip__seats')[0].innerHTML = ~~(Math.random() * 10) + ' seats'
		inf.getElementsByClassName('strip__prof')[0].innerHTML = course.profs[0].name||course.profs[0]

		infoBox.appendChild(inf)
	})
}

for (var i = 0;i < 10;i++) {
	view(schedules[i])
}


function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
ctx.lineWidth = 0.3
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }

}
