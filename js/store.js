function createStore(reducer){ // higher under function
    let currentState = reducer(undefined, {}) // initial state no action - create store

    return {
        getState: () => currentState,
        dispatch: action => {    // pass on the action to the reducer
           currentState = reducer(currentState, action) // prev state + new action
        }
    }
}


const initialState = {
    favourites: []
}

function favouritesReducer(state = initialState, action){ // default empty array for state
    switch (action.type) {
     case "ADD_FAVOURITE": {
        const addedFavourite = action.payload.favourite
        const favourites = [...state.favourites, addedFavourite]
        return { favourites }
    }
    case "REMOVE_FAVOURITE": {
        const filtered = state.favourites.filter( favourite => favourite.id !== action.payload.favourite.id )
        return { filtered }
    }
    default:
        return state

    }

}

const action = { type: "ADD_FAVOURITE", payload: { favourite: {title: "story1", id: 1} } }

const store = createStore(favouritesReducer)

store.dispatch(action)
console.log(store.getState())


export default store