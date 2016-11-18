window.Schedule_Order = []
window.Schedules = {}

function Controller () {
  this.scheduler = null
}

/**
 * Does the actual course scheduling
 * 
 * @return {Schedules} - returns the window.Schedules object
 */
Controller.prototype.schedule = function () {
  // Sort from least to greatest
  Courses.sort(function (a,b) {return b.mangled.length - a.mangled.length})
  // Execute the Scheduling
  // Prep the Schedules for viewing and sorting
  this.prep(this.scheduler())
  // Load the view
  App.View.render()
}

/**
 * Prepares the Schedules for rendering
 * 
 * @return {void}
 */
Controller.prototype.prep = function (schedules) {

  // The code for one schedule
  var uid = this.uuid()
  
  var time = 0
  var rating = 0
  var avail = 0
  var dist = 0

  Schedules[uid] = schedule
  Schedule_Order.push([
    uid,
    time,
    rating,
    avail,
    dist
  ]) 
}

/**
 * Sorts the Schedule_Order array by whatever options are sorted
 * 
 * @return {void}
 */
Controller.prototype.sort = function () {
  var _options = App.View.getOptions()
  switch (_options.sortType) {
    case 'TIME':
      Schedule_Order.sort(function (s1, s2) {
        return s2[0] - s1[0] 
      })
    break
    case 'PROF_RATING':
      Schedule_Order.sort(function (s1, s2) {
        return s2[1] - s1[1]
      })
    break
    case 'GRADE_DISTRIBUTION':
      Schedule_Order.sort(function (s1, s2) {
        return s2[1] - s1[1]
      })
    break
    case 'AVAILABILITY':
      Schedule_Order.sort(function (s1, s2) {
        return s2[2] - s1[2]
      })
    break
  }
  App.View.update()
}

/**
 * Returns a unique id that's RFC-4 compliant
 * 
 * @return {String} - the unique id
 */
Controller.prototype.uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
    return v.toString(16)
  })
}