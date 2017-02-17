fetch('http://localhost:5000/api/v1/ubc/courses?courses=CPSC%20110,CPSC%20121,MATH%20221,MATH%20220,CSPC%20210,APSC%20160').then((resp) => resp.json()).then(function(a){courses = a , main()})
var sections = {}
var main_courses = []

function main () {
  // Set up sections
  console.log('Setting up sections')
  courses.forEach((course) => {
    for(var type in course.sections) {
      course.sections[type].forEach((section) => {
        sections[section.uniq] = section
        section.time = [0,0,0,0,0]
        var c = 0
        var sum = 0
        for(var day in section.times) {
          if (day < 0) continue
          c++
          var start = (section.times[day][0] - 480) / 30
          var end = (section.times[day][1] - 480) / 30
          sum += (start+end)/2
          for(var i = start; i < end; i++) {
            section.time[day - 1] |= (1 << i)
          }

        }
        section.sortTime = (sum/c)
      })
    }
  })
  console.log('Finished Dec->Bin Time')
  
  console.log('Finished Setting up sections')
  // Decimal to Binary time conversion
  courses.forEach((course) => {
    course.mangled.forEach((mangled) => {
      mangled.title = mangled.join(',')
      var sortT = 0
      mangled.time = mangled.reduce((acc, section) => {
        sortT += sections[section].sortTime || 0
        return [
          acc[0] | sections[section].time[0],
          acc[1] | sections[section].time[1],
          acc[2] | sections[section].time[2],
          acc[3] | sections[section].time[3],
          acc[4] | sections[section].time[4]
        ]
      }, [0,0,0,0,0])
      mangled.sortTime = sortT / mangled.length
    })
  })

  // Set up the courses for traversal
  courses.forEach((c) => {
    main_courses.push(c.mangled)
  })
  main_courses.sort((a,b) => (a.length - b.length))
  courseLength = main_courses.length

  par()
}

function go (){
    
  lastTime = Date.now() + 200

  main_courses[0].forEach((course) => {
    state = []
    console.log('Going through one course')
    GoGoRecurse(0,0,0,0,0, course, 1, state)
    console.log('Done,', state)
  })
  }




function GoGoRecurse (m,t,w,r,f, nextMangled, count, state) {
  var time = nextMangled.time
  if (Date.now() >= lastTime) {
    asdfjlk;
  }
  // If the state, intersects with the others, remove it.
  if (m&time[0] || 
      t&time[1] || 
      w&time[2] || 
      r&time[3] || 
      f&time[4]) {
    return
  }

  // Check if this is a terminal node.
  if (courseLength == count) {
    state.push({
      name: nextMangled.title
    })
    return
  }

  var children = []
  state.push({
    name: nextMangled.title,
    children: children
  })


  // Since this isn't a terminal node, iterate through the courses, and recurse.
  var course = main_courses[count]
  for (var i = 0, ii = course.length; i < ii; i++) {
    cur = course[i]

    GoGoRecurse(m|time[0],t|time[1],w|time[2],r|time[3],f|time[4], cur, count + 1, children)
  }
}

schedules = []


function clean (state, cur, count) {
  if (count == courseLength - 1) {
    schedules.push(cur)
  }

  if (!state.children)
    return

  var future = state.children
  for(var i = 0, ii = future.length; i < ii; i++)
    clean(future[i], cur + ',' + state.name, count + 1  )
}


















