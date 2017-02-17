
var VALID_ACTIONS = {}


function View () {

}

View.prototype.reducer = function (state, event) {
  // Check to see if this action has a implementation registered for it.
  // If not, warn the dev and return the state.
  if (!VALID_ACTIONS[event.action]) {
    console.warn('Unknown action in ViewReducer: ', event.action)
    return state
  }

  return this[event.action](state, event)
}



View.prototype.add = function (state, event) {
  
}