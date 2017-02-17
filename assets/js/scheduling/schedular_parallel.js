/**
 * This scheduling algorithm is inteded to run on a seperate thread in the browser.
 * As such, this is going to be executed only when need be.
 */

function par() {


  // First sort all the mangled sections from starting to end time. 
  // This should be done on the server.
  main_courses.forEach(function(course) {
    course.sort(function (a, b) {
      return a.sortTime - b.sortTime
    })
  })

  var start = performance.now()
  var state = FindGood(0,[],0,0,0,0,0)

  console.info('Finding optimal schedule took: ', performance.now() - start, 'ms.')
  console.info('Optimal schedule is: ', state.join(','))
  console.log(eval(state.map((i) => (sections[i] && sections[i].sortTime || 0)).join('+'))/state.length)
}

function FindGood (count,state,m,t,w,r,f) {
  if (count >= courseLength) {
    return state
  }

  var cur = main_courses[count]

  for (var i = 0, ii = cur.length; i < ii; i++) {
    course = cur[i]
    time = course.time

    if ((m&time[0] || 
      t&time[1] || 
      w&time[2] || 
      r&time[3] || 
      f&time[4])) {
      continue
    }

    return FindGood(count + 1, state.concat([course.join(',')]), m|time[0], t|time[1], w|time[2], r|time[3], f|time[4])
    
  }
}