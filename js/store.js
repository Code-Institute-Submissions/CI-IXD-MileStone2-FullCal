function createStore(reducer) { // higher order intialState + no action
  let currentState = reducer( undefined, {} ) //object 

  return {
      getState: () => currentState,  //method on returned obj - gives us Current State
      dispatch: action => {         // takes action (as written below and pass to reducer)
        currentState = reducer(currentState, action) // current state and incoming action
      }
  }

}


const initialState = {
    favourites: []
}

function favouritesReducer(state = initialState, action){ // default state
    switch (action.type) {
        case "ADD_FAVOURITE": {
           const favourites = [ ...state.favourites, action.payload.favourite ]
           return { favourites  }
        }
        case "REMOVE_FAVOURITE" : {
            const favourites = state.favourites.filter(favourite => favourite.id !== action.payload.favourite.id)
            return { favourites }
        }

        default:
            return state

    }


}


const store = createStore(favouritesReducer)


export default store  // provides state obj with both methods get/dispatch (set/update current)