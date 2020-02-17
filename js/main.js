import view from "../utils/view.js"
import {default as getEvents} from "./requests.js"
import Event from "../components/Event.js"
import {printCheckboxes, checkboxListeners} from "../components/Checkboxes.js"
import store from "./store.js"
import renderEventModal from "../components/Modal.js";
import checkFavourites from "../utils/checkFavourites.js";


export default async function render(){
  // await getEvents()
  console.log((store.events).length)
  const hasEvents = store.events.length > 0
  hasEvents? renderEvents() : view.innerHTML = `No events found!`

  $('#fullCalModal').on('hidden.bs.modal', function (event) {
    // console.log("Modal closed")
    renderEvents() // refresh on Modal Close
  })
  
} 

 

function renderEvents(){
  const events = store.events
  
  if($(".favBtn").length ){
  } else {
  let favBtn = document.createElement("button")
  favBtn.classList.add("favBtn")
  favBtn.innerText = "Favs"
  document.querySelector("h1").append(favBtn)
  }
  // const { favourites } = store
  // console.table(favourites)
  // events.map(event => console.table(event.id, store.checkFavs(event.id)))

  view.innerHTML = `
  <div>
    ${events.map((event, i) => Event( {...event, index: i+1, isFavourited: store.checkFavs(event.id) })).join('')}
  </div>
  `
  printCheckboxes()
  checkboxListeners()
  pListeners()
 // listen for modal.close event and re-render
 $("favBtn").on("click", console.table(store.favourites))
}

            

function pListeners(){
  const elements = [...document.querySelectorAll(".fav")]
  // console.log(elements)
  elements.forEach( element => {
    element.addEventListener("click", function(event) {
      // console.log(event.target)
        renderEventModal(event)
    })
    //  event => {
      // console.log("clicked")
  } 
  )
// })
}
            
render()