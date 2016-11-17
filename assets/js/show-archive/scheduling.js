function Prep () {
  for (var c = Courses.length; c--;) {
    var mangled = Courses[c].mangled
    var mangle = []
    var types = mangled[0].length

    for (var m = mangled.length; m--;) {
      var mon = 0, tue = 0, wed = 0, thu = 0, fri = 0
      for (var t = types; t--;) {
        var time = Sections[mangled[m][t]].times
        t0 = time[0] 
        t1 = time[1] 
        t2 = time[2] 
        t3 = time[3]
        t4 = time[4]
        t0 && (mon |= t0[0])
        t1 && (tue |= t1[0])
        t2 && (wed |= t2[0])
        t3 && (thu |= t3[0])
        t4 && (fri |= t4[0])
      }
      mangle = [mon, tue, wed, thu, fri]
    }
    Courses[c].mangled.times = mangle 
  }
}
var start = performance.now() + 10000;

Courses.sort((a,b) => (a.mangled.length - b.mangled.length))
// So the course with the least section combinations will be put here
var Schedules = Courses[0].mangled.map((i) => {
  n = [i]
  n.times = i.times.slice(0)
  return n
})

// Iterate through the rest of the courses
for(var c = 1, cc = Courses.length - 2; c < cc; c++) {
  var course = Courses[c].mangled
  var temp = []
  for(var i = Schedules.length;i--;){
    var k = Schedules[i]
    k.times = Schedules[i].times.slice(0)
    temp.push(k)
  }
  Schedules = []
  // Iterate through all the current schedules
  for (var s = 0, ss = temp.length; s < ss; s++){
    var schedule = temp[s].times
    // Iterate through all the sections in that course
    for (var m = 0, mm = course.length; m < mm; m++) {
      if(performance.now() > start) {
        console.log(Schedules.length,s)
        asdfasdfh;
      }
      var section = course[m].times
      // If there's a intersection, go to the next section
      if ((schedule[0] & section[0])
        || (schedule[1] & section[1])
        || (schedule[2] & section[2])
        || (schedule[3] & section[3])
        || (schedule[4] & section[4])) {
        continue
      }

      n = temp[s].concat([course[m]])
      n.times = [
        schedule[0] | section[0],
        schedule[1] | section[1],
        schedule[2] | section[2],
        schedule[3] | section[3],
        schedule[4] | section[4]
      ]
      Schedules.push(n)
    }
  }
}





function makeBin (obj) {
  for(var a = 5;a--;){
    if(!obj[a]) {
      obj[a] = 0
      continue
    }
    var n = "000000000000000000000000000000".split('')
    var s = obj[a][0]
    var e = obj[a][1]

    for(var i = ((s - 480) / 30);i < ((e - 480) / 30);i++){
      n[~~(30 - i)] = '1'
    }
    obj[a] = parseInt(n.join(''),2)
  }
  return obj
}



var timeHash = {}

for (var c = Courses.length; c--;) {
  for(var m = Courses[c].mangled.length; m--;) {
    for(var t = Courses[c].mangled[m].length;t--;){
      var th = JSON.stringify(Sections[Courses[c].mangled[m][t]].times)
      if(timeHash[th])
        timeHash[th].push(Courses[c].mangled[m][t])
      else
        timeHash[th] = [Courses[c].mangled[m][t]]
    }
  }
}




































// Start the tree
var Tree = Courses[0].mangled.map((i) => {
  n = [i]
  n.times = i.times.slice(0)
  return n
})



function Schedules(schedule, Courses, l,) {
  schedule
  for(var i = 0;i < Courses[l].mangled.length;i++) {
    Courses[l].mangled[i]
  }
}
  


























var Tree = {}

function recurse (layer, time) {
  if (Courses.length == (layer + 1)) {
    return
  }
  var cur = Courses[layer + 1].mangled
  for (var i = 0, ii = cur.length; i < ii; i++) {
    var s = cur[i]
    
  }
}
















function re(loc, layers, num) {
  var layer = layers[num]
  for (var l = 0, ll = loc.length; l < ll; l++) {
    var cur = loc[l] 
    for (var i = 0, ii = layer.length; i < ii; i++) {
      if
      cur[1] = [

      ]
    }
  }
}







['MATHMM!!',
  [
    ['CHEM',[['PHYS',[1,2,3,5,5]],['PHYS',[1,2,3,5,5]],['PHYS',[1,2,3,5,5]]]],
    ['CHEM',[['PHYS',[1,2,3,5,5]],['PHYS',[1,2,3,5,5]],['PHYS',[1,2,3,5,5]]]],
    ['CHEM',[['PHYS',[1,2,3,5,5]],['PHYS',[1,2,3,5,5]],['PHYS',[1,2,3,5,5]]]]
  ]
]

var Map = []
var mon = 0, tue = 0, wed = 0, thu = 0, fri = 0

































































/**
 * START EVERYTHING HERE
 */

/** Make everything int based */
function makeBin (obj) {
  var arr = []
  for(var a = 5;a--;){
    if(!obj[a]) {
      arr[a] = 0
      continue
    }
    var n = "000000000000000000000000000000".split('')
    var s = obj[a][0]
    var e = obj[a][1]

    for(var i = ((s - 480) / 30);i < ((e - 480) / 30);i++){
      n[~~(30 - i)] = '1'
    }
    arr[a] = parseInt(n.join(''),2)
  }
  return arr
}

for (var s in Sections) { 
  Sections[s].times = makeBin(Sections[s].times)
}


(function Prep () {
  for (var c = Courses.length; c--;) {
    var mangled = Courses[c].mangled
    var types = mangled[0].length

    for (var m = mangled.length; m--;) {
      var mon = 0, tue = 0, wed = 0, thu = 0, fri = 0
      for (var t = types; t--;) {
        var time = Sections[mangled[m][t]].times
        mon |= time[0]
        tue |= time[1]
        wed |= time[2]
        thu |= time[3]
        fri |= time[4]
      }
      Courses[c].mangled[m].times = [mon, tue, wed, thu, fri]
    }
  }
})()




perf = Date.now() + 3000
/**
 * NOW SCHEDULE
 * 
 * Course[0] = Math // 20
 * Course[1] = Chem // 30
 * Course[2] = Phys // 40
 * Course[3] = Biol // 50
 */

var Schedules = []
Courses.sort((a,b) => (b.mangled.length - a.mangled.length))
for (var a = 0; a < Courses[0].mangled.length; a++) {
  var course_a = Courses[0].mangled[a]
  var time_a = course_a.times

  var next_a = [course_a]
  Schedules.push(next_a)
  mon_a = time_a[0]
  tue_a = time_a[1]
  wed_a = time_a[2]
  thu_a = time_a[3]
  fri_a = time_a[4]

  for (var b = 0; b < Courses[1].mangled.length; b++) {
    var course_b = Courses[1].mangled[b]
    var time_b = course_b.times

    mon_b = time_b[0]
    tue_b = time_b[1]
    wed_b = time_b[2]
    thu_b = time_b[3]
    fri_b = time_b[4]

    if (mon_a&mon_b || tue_a&tue_b || wed_a&wed_b || thu_a&thu_b || fri_a&fri_b) {
      continue
    }

    mon_b |= mon_a
    tue_b |= tue_a
    wed_b |= wed_a
    thu_b |= thu_a
    fri_b |= fri_a

    var next_b = [course_b]
    next_a.push(next_b)

    for (var c = 0; c < Courses[2].mangled.length; c++) {
      var course_c = Courses[2].mangled[c]
      var time_c = course_c.times

      mon_c = time_c[0]
      tue_c = time_c[1]
      wed_c = time_c[2]
      thu_c = time_c[3]
      fri_c = time_c[4]

      if (mon_b&mon_c || tue_b&tue_c || wed_b&wed_c || thu_b&thu_c || fri_b&fri_c) {
        continue
      }

      mon_c |= mon_b
      tue_c |= tue_b
      wed_c |= wed_b
      thu_c |= thu_b
      fri_c |= fri_b

      var next_c = [course_c]
      next_b.push(next_c)

      for (var d = 0; d < Courses[3].mangled.length; d++) {
        if (Date.now() > perf) ahsdugo;
        var course_d = Courses[3].mangled[d]
        var time_d = course_d.times

        if (mon_c&time_d[0] || tue_c&time_d[1] || wed_c&time_d[2] || thu_c&time_d[3] || fri_c&time_d[4]) {
          continue
        }
        next_c.push([course_d])
      }
    }
  }
}