import view from "../utils/view.js"
import {default as getEvents} from "../components/Events.js"
import {printCheckboxes, checkboxListeners} from "../components/Checkboxes.js"
import store from "./store.js"
import renderEventModal from "../components/Modal.js";




export default async function render(){
  const events = await getEvents()
  const hasEvents = events.length > 0
  if(hasEvents){
    view.innerHTML = `
    <div>
      ${events.map(event => JSON.stringify(event) + "<br/><hr/>")}
    </div>
    `
  }else {
    view.innerHTML = `No events found!`
  }
  
  printCheckboxes()
  checkboxListeners()
}



            
            
            
            
render()
