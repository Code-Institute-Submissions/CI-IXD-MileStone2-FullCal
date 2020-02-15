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
          case "ADD_FAVOURITE": { // scope for favs
              // const addedFavourite = action.payload.favourite
              // const favourites = [ ...state.favourites, addedFavourite ]
             // return { favourites } // state obj
             // Needs intermediary step as mutated array (new scope for const declaration - and has to be called 'favourites')
             const favourites = [ ...state.favourites, action.payload.favourite ]
             return { favourites  }
          }
          case "REMOVE_FAVOURITE" : {
             // const removedFavourite = action.payload.favourite
              const favourites = state.favourites.filter(favourite => favourite.id !== action.payload.favourite.id)
              return { favourites } // obj
          }
  
          default:
              return state
  
      }
  
  
  }
  
  // const action = { type: "ADD_FAVOURITRE", payload: { favourite: {title: "strory1", id:1 } } } // test story/object
  
  const store = createStore(favouritesReducer)
  
  // store.dispatch(action) // dispatch only takes an action
  // console.log(store.getState())
  
  export default store  // provides state obj with both methods get/dispatch (set/update current)