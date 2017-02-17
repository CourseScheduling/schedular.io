

/* Events to Modify View */
var ReducerMap = {}
ReducerMap['VIEW'] = (new View()).reducer

// Set up a root reducer to route all the events.
function RootReducer (state, event) {
  var reducer = ReducerMap[event.type]

  if (!reducer) {
    console.warn('Unknown Event: ', event.type)
    return state
  }

  return reducer(state, event)
}

var store = Redux.createStore(RootReducer, localStorage['STORE']||{})
