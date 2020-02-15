import view from "../utils/view.js"
import {default as getEvents} from "./requests.js"
import Event from "../components/Event.js"
import {printCheckboxes, checkboxListeners} from "../components/Checkboxes.js"
import store from "./store.js"
import renderEventModal from "../components/Modal.js";




export default async function render(){
  const favBtn = document.createElement("button")
  favBtn.innerText = "Favs"
  document.querySelector("h1").append(favBtn)
  // document.querySelector("h1 > button").addEventListener("click", getFavs ) //() => window.location.href="https://irishtimes.com"
  // async function getFavs(){
    const { favourites } = await store.getState()
    // console.log(favourites)
    const events = [...favourites]
    // const hasEvents = true
  // }
  // const events = await getEvents()
  const hasEvents = events.length > 0
  if(hasEvents){ // ${events.map(event => JSON.stringify(event) + "<br/><hr/>")}
    view.innerHTML = `
    <div>
      ${events.map((event, i) => Event({ ...event, index: i+1 })).join('')}
    </div>
    `
    printCheckboxes()
    checkboxListeners()
    pListeners()
   

  }else {
    view.innerHTML = `No events found!`
  }
  

}




function renderModal() {
  $('#modalTitle').html("Modelling a Modal")
  $('#fullCalModal').modal()
}      
            

function pListeners(){
  const elements = [...document.querySelectorAll(".fav")]
  console.log(elements)
  elements.forEach( element => {
    element.addEventListener("click", function(event) {
      const eventInfo = JSON.parse(this.dataset.event);  
      console.log(eventInfo)
      renderEventModal(eventInfo)
    })
    //  event => {
      // console.log("clicked")
  } 
  )
// })
}
            
render()