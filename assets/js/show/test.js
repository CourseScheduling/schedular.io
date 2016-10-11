TimeArr = []
Courses.forEach(function(course,i){
	c = []
	TimeArr.push(c)
	console.log(i)
	course.mangled.forEach(function (mangled,n) {
		var times = [
			"0b000000000000000000000000000000000000000000000000000000000000",
			"0b000000000000000000000000000000000000000000000000000000000000",
			"0b000000000000000000000000000000000000000000000000000000000000"
		]
		mangled.forEach(function (sec, l) {
			s = Sections[sec].times
		})
	})
})

