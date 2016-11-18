/**
 * Creates a scheduler
 * @param {Number} num_courses - the number of courses
 * @return {Function} - A function to do scheduling
 */
var CreateScheduler = function (num_courses) {
  var VARIABLE_NAMES = 'abcdefghijklmnop'
  var VARIABLE_NAMES_CAPS = 'ABCDEFGHIJKLMNOP'
  var MAX_SCHEDULING_TIME = 10000;
  var scheduler = []
  
  var build = function(prev_letter, current_num) {

    if (current_num == num_courses) {
      var END_TEMPLATE  = [
        'for (var z = 0; z < ZL; z++) {',
          'if (Date.now() > perf) return possible;',
          'var course_z = Z_C[d];',
          'var time_z = course_z.times;',
          'if (mon_'+prev_letter+'&time_z[0] || tue_'+prev_letter+'&time_z[1] || wed_'+prev_letter+'&time_z[2] || thu_'+prev_letter+'&time_z[3] || fri_'+prev_letter+'&time_z[4]) {',
            'continue;',
          '}',
          'next_'+prev_letter+'.push([course_z]);',
        '}'
      ]
      return END_TEMPLATE
    }

    var cur_letter = VARIABLE_NAMES[current_num]
    var cur_cap = VARIABLE_NAMES_CAPS[current_num]
    return [
      'for (var '+cur_letter+' = 0; '+cur_letter+' < '+cur_cap+'L; '+cur_letter+'++) {' +
        'var course_'+cur_letter+' = '+cur_cap+'_C['+cur_letter+'];\n' +
      'var time_'+cur_letter+' = course_'+cur_letter+'.times;\n' +

      'mon_'+cur_letter+' = time_'+cur_letter+'[0];\n' +
      'tue_'+cur_letter+' = time_'+cur_letter+'[1];\n' +
      'wed_'+cur_letter+' = time_'+cur_letter+'[2];\n' +
      'thu_'+cur_letter+' = time_'+cur_letter+'[3];\n' +
      'fri_'+cur_letter+'= time_'+cur_letter+'[4];\n' +

      'if (mon_'+prev_letter+'&mon_'+cur_letter+' || tue_'+prev_letter+'&tue_'+cur_letter+' || wed_'+prev_letter+'&wed_'+cur_letter+' || thu_'+prev_letter+'&thu_'+cur_letter+' || fri_'+prev_letter+'&fri_'+cur_letter+') {' +
        'continue;\n' +
      '}\n' +

      'mon_'+cur_letter+' |= mon_'+prev_letter+';\n' +
      'tue_'+cur_letter+' |= tue_'+prev_letter+';\n' +
      'wed_'+cur_letter+' |= wed_'+prev_letter+';\n' +
      'thu_'+cur_letter+' |= thu_'+prev_letter+';\n' +
      'fri_'+cur_letter+' |= fri_'+prev_letter+';\n' +
      'var next_'+cur_letter+' = [course_'+cur_letter+'];\n' +
      'next_'+prev_letter+'.push(next_'+cur_letter+');\n',
        build(cur_letter, current_num + 1),
      '}'
    ]
    var cur_letter = VARIABLE_NAMES[current_num]
  }

  var START_TEMPLATE = [
    'var perf = Date.now() + ' + MAX_SCHEDULING_TIME + ';' + 
    'var possible = [];' +
    'for (var a = 0; a < AL; a++) {' +
        'var course_a = A_C[a];' +
        'var time_a = course_a.times;' +
        'var next_a = [course_a];' +
        '' +
        'possible.push(next_a);' +
        '' +
        'mon_a = time_a[0];' +
        'tue_a = time_a[1];' +
        'wed_a = time_a[2];' +
        'thu_a = time_a[3];' +
        'fri_a = time_a[4];',
      build('a',1),
    '}',
    'return possible;'
  ]

  var var_count = 1

  
  // If the number of courses > 3
  for (var i = 0; i < num_courses - 1; i++) {
    // Declare the length variables and stuff
    scheduler.push(VARIABLE_NAMES_CAPS[i] + 'L = Courses['+i+'].mangled.length;\n')
    scheduler.push(VARIABLE_NAMES_CAPS[i] + '_C =  Courses['+i+'].mangled;\n')
  }

  scheduler.push('ZL = Courses['+(num_courses - 1)+'].mangled.length;\n')
  scheduler.push('Z_C =  Courses['+(num_courses - 1)+'].mangled;\n')

  scheduler.push(START_TEMPLATE)



  var flatten = function (arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, [])
  }


  return Function(flatten(scheduler).join(''))
}

window.CreateScheduler = CreateScheduler