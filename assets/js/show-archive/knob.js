[].forEach.call(document.getElementsByClassName('knob'), function (knob) {
	knob.height = knob.width = 100
	setCanvas(knob.getContext('2d'))
	knob.addEventListener('mousedown', function (e) {
		
		drawThing(knob.getContext('2d'),
			Math.atan2((e.offsetY - 50),(e.offsetX - 50)), Math.PI / 10)

		console.log(e.offsetX, e.offsetY)
	})
})


function setCanvas(ctx) {
	ctx.imageSmoothingEnabled = true
	ctx.strokeStyle = '#26A65B'
	ctx.lineWidth = 1.5
	ctx.beginPath()
	ctx.arc(50,50,49,0,2*Math.PI)
	ctx.stroke()
	drawThing(ctx, 0, Math.PI / 5)
}


function drawThing(ctx, loc, width) {
	ctx.lineWidth = 14
	ctx.beginPath()
	ctx.arc(50,50,40,loc - width/2,loc + width/2)
	ctx.stroke()
}