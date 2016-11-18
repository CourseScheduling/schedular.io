function View () {
  this.num_out = 0
  this.active = null
}

View.prototype.update = function() {
  var num = this.num_out
  // Clear everything  
  this.clear()
  // Return the same of schedules out
  for (var i = 0; i < num; i++) {
    this.render(Schedules[Schedule_Order[i][0]])
  }
}