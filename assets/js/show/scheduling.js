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




function Prep () {
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

