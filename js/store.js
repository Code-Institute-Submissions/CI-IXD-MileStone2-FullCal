import getEvents from "./requests.js"

class Store {
    constructor() {
        this.favourites = JSON.parse(localStorage.getItem("favourites")) || []
        this.events = JSON.parse(sessionStorage.getItem("events")) || getEvents()  // you can await constructor
    }
    add(show){
        this.favourites = [...this.favourites, show]
    }
    remove(showId){
        this.favourites = this.favourites.filter( favourite => favourite.id !== showId)
    }
    save() {
        localStorage.setItem("favourites", JSON.stringify(this.favourites))
    }
    checkFavs(showId) {
        return this.favourites.some(favourite => Number(favourite.id) === Number(showId)) // show obj is in favs ?
    }
}

const store = new Store()

export default store


// function createStore(reducer) { // higher order intialState + no action
//     let currentState = reducer( undefined, {} ) //object 
  
//     return {
//         getState: () => currentState,  //method on returned obj - gives us Current State
//         dispatch: action => {         // takes action (as written below and pass to reducer)
//           currentState = reducer(currentState, action) // current state and incoming action
//         }
//     }
  
//   }
  
  
//   const initialState = {
//       favourites: [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-07T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}]
//   }
  
//   function favouritesReducer(state = initialState, action){ // default state
//       switch (action.type) {
//           case "ADD_FAVOURITE": { // scope for favs
//               // const addedFavourite = action.payload.favourite
//               // const favourites = [ ...state.favourites, addedFavourite ]
//              // return { favourites } // state obj
//              // Needs intermediary step as mutated array (new scope for const declaration - and has to be called 'favourites')
//              const favourites = [ ...state.favourites, action.payload.favourite ]
//              return { favourites  }
//           }
//           case "REMOVE_FAVOURITE" : {
//              // const removedFavourite = action.payload.favourite
//               const favourites = state.favourites.filter(favourite => favourite.id !== action.payload.favourite.id)
//               return { favourites } // obj
//           }
  
//           default:
//               return state
  
//       }
  
  
//   }
  
//   // const action = { type: "ADD_FAVOURITRE", payload: { favourite: {title: "strory1", id:1 } } } // test story/object
  
//   const store = createStore(favouritesReducer)
  
//   // store.dispatch(action) // dispatch only takes an action
//   // console.log(store.getState())
  
//   export default store  // provides state obj with both methods get/dispatch (set/update current)