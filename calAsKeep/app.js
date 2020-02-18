
import {default as getEvents, categories} from "../components/Events.js"
import Store from "../js/store.js"



// Event Class: Represents an Event
// consturctir of Book - properties??
class Ent {
  constructor(title, date, eid){
    this.title = title;
    this.start = date;
    this.id = eid;
  }
}


// UI Class: Hanle UI Tasks
/* event displays/removed show an alert */
class UI {
  static displayEvents() {
    // const StoredEvents = [
    //   {
    // title: "Besties, Dark Waters & What Next Mother- Film Premiere",
    // id: "873612231",
    // date: "2020-02-07T19:30:00+00:00"
    //   },
    //   {

    //     title: "SONGS & TALL TALES OF JERRY FISH",
    //     id:"873610985",
    //     date: "2020-03-13T20:30:00+00:00"


    //   }];

      const events = Store.getFavEvents() //StoredEvents

      console.log(events)

      events.forEach( event => UI.addEventToList(event))
  }

  static addEventToList(event) {
    const $list = document.querySelector("#event-list")

    const row = document.createElement("tr")
    row.innerHTML = `
    <td>${event.id}</td>
    <td>${event.title}</td>
    <td>${event.start}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `

    $list.appendChild(row)

  }

  static deleteEvent(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove(); // tr not just td
    }

  }

  static showAlert(message, className){
    const div = document.createElement("div")
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".fc-view-container") // parent
    const table = document.querySelector(".fc-view") // before this child
    container.insertBefore(div, table)
    // Vanish alert < 3secs
    setTimeout( () => document.querySelector(".alert").remove(), 2400 )
  }

  static clearFields() {

    // document.querySelector('#title').value = '';
    // document.querySelector('#author').value = '';
    // document.querySelector('#isbn').value = '';
    $('#fullCalModal').modal("toggle")



  }

}

// Store Class - localStorage



// Events: Display Fav Cal
document.addEventListener("DOMContentLoaded", UI.displayEvents)

// Event to Add Event = UI and Storage
document.querySelector(".favourite-text").addEventListener("click", (e) => {

  // e.preventDefault() if submit
    // Get 'Form' / Modal values
    // const title = document.querySelector("#modalTitle").textContent
    // const date = document.querySelector(".edate").textContent
    // const id = document.querySelector(".eid").textContent
// Validate
  //  if(title === "" || author === "" || isbn === ""){
    //  UI.showAlert("Please fill in all fields", "danger")
  //  }else{ /* stuff below */  }


    const jdata = JSON.parse(document.querySelector(".favourite").getAttribute("data-event"))
    console.log(jdata)
    // get event data from info.event string
  //  JSON.parse(this.dataset.event)

    // Instatiate Event
    // const event = new Ent(title,date,id)

     const event = new Ent(jdata.title,jdata.start,jdata.id)

    // console.log(event)
    // console.log(jdata)

    UI.addEventToList(event)
  
    Store.addEvent(event)

    
    calendar.rerenderEvents()
    UI.showAlert("Event Added to Favourites", "success")

    UI.clearFields()


})

// Event to REmove a Book - UI and Storage
document.querySelector("#event-list").addEventListener("click", e => { // event propagation (del - first one would be removed)
  UI.deleteEvent(e.target) 
  // console.log(e.target)

  
  let eid = e.target.parentElement.parentElement.firstElementChild.textContent
  // console.log(eid)
  Store.removeEvent(eid)
  
  UI.showAlert("Event Removed to Favourites", "warning")

  calendar.rerenderEvents()

})






// document.addEventListener("DOMContentLoaded", function() {

  let $calendar = document.querySelector("#calendar")
  let calendar = new FullCalendar.Calendar($calendar, {
  
     locale: 'en-gb',
     plugins: [ 'dayGrid', 'list', 'bootstrap'],
     customButtons: {
       favourites: {
         text: 'Favourites!',
         click: function(){   // turn on all cats!
           calendar.getEventSourceById(1).remove()
           calendar.addEventSource(sources.favs)
         }
       }
     },
     themeSystem: 'bootstrap', 
     header: {
       right: 'favourites today prev,next ',
     },
    //  defaultView: 'list', no events to display??
    eventRender: function (info) {
       //return categories.get(info.event.extendedProps.category)
       if(Store.checkFavs(info.event)){ // el - is the anchor wrapper, div.fc-content > span.fc-time + span.fc-title
        info.el.querySelector(".fc-title").innerHTML = `<i>${info.event.title}</i>`
        // info.el.querySelector(".fc-title").style.border = "1px solid black"
        info.el.style.backgroundColor  = "plum";
        info.el.style.borderColor = "plum"
        var heartEl = document.createElement("span")
        heartEl.innerHTML = "<img class='heart' src='https://icon.now.sh/heart/ccc'/>"
        var container = info.el.querySelector(".fc-content")
        container.style.padding = "2px 18px"
        container.style.backgroundImage = "url(https://icon.now.sh/heart/f00)"
        container.style.backgroundPosition = "center left"
        container.style.backgroundRepeat = "no-repeat"
        var timex = info.el.querySelector(".fc-time")
        // container.insertAfter(heartEl, timex)
        
        // var elem =  info.el.find(".fc-content") //.prepend("<i>F</i>");
         console.log(info.el)
        //  console.log(info.event._instance.range.start.getTime())
       }
     },
    eventClick: function({event, el, jsEvent, view}){
      jsEvent.preventDefault()
      el.style.borderColor = 'red' // animate this
      // alert("Yp!")
      // var inter = Object.assign({},info.event)
      // var stringer = JSON.stringify(inter)
      // console.log(info.event._instance.range.start.toISOString())  //info.event._instance.range.start.toUTCString()
    //  console.log(inter)
    //  var inter2 = JSON.stringify(inter)
    //  console.log(inter2)
      openForm(event)
  
    },
    events: async function(fetchInfo,successCallback){
      let result = await getEvents()
      // printCheckboxes()
      successCallback(await result) 
      },
     
   })

   calendar.render()



   function openForm(event){
    //  console.log(event.extendedProps.jdata)
    
    $('#modalTitle').html(event.title)
    $('#modalBody').html(`
      <p class="edate">${event.start}</p>
      <p class="eid">${event.id}</p>
    `)
    // $('#modalBody').html(`
    //   <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
    //   <div class="card-body">
    //   ${info.event.extendedProps.description} 
    //   </div>
    // `);
    $('.favourite').attr('data-event', event.extendedProps.jdata )
    Store.checkFavs(event)
    // $('.favourite-text').html(`${isFavourited? "Remove from Favourites" : "Add to Favourites" }`)
    $('#eventUrl').attr('href',event.url)
    $('#fullCalModal').modal()
  // document.querySelector("#form").classList.add("form-open")
  //     document.querySelector("#note-title").style.display = "block"
  //     document.querySelector("#note-title").value = info.event.title
  //     document.querySelector("#note-text").value = info.event.extendedProps.description
  //     document.querySelector("#form-buttons").style.display = "block"
}

