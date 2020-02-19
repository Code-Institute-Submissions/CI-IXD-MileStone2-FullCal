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

    $('#fullCalModal').modal("toggle")



  }

}

// Store Class - localStorage



// Events: Display Fav Cal
document.addEventListener("DOMContentLoaded", UI.displayEvents)

// Event to Add Event = UI and Storage
document.querySelector(".favourite-text").addEventListener("click", (e) => {


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
    favCal.rerenderEvents()
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




let closest = Infinity


// document.addEventListener("DOMContentLoaded", function() {

  let $calendar = document.querySelector("#calendar")
  let calendar = new FullCalendar.Calendar($calendar, {
  
     locale: 'en-gb',
     plugins: [ 'dayGrid', 'list', 'bootstrap'],
   
     customButtons: {
       favourites: {
         text: 'Favs!',
         click: function(){   // turn on all cats!
          //  calendar.getEventSourceById(1).remove()
          //  calendar.addEventSource(sources.favs)
          calendar.gotoDate(new Date(closest)) //calendar.gotoDate("2021-01-09")
         }
       }
     },
     themeSystem: 'bootstrap', 
     header: {
       right: 'favourites today prev,next ',
     },
     views: {
      dayGridMonth: { // name of view
        // titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
        // other view-specific options here
        eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: true,
        omitZeroMinute: true,
        hour12: true
        },
      }

     },
    //  defaultView: 'list', //no events to display??
    eventRender: function (info) {
       //return categories.get(info.event.extendedProps.category)
       if(Store.checkFavs(info.event)){ // el - is the anchor wrapper, div.fc-content > span.fc-time + span.fc-title
        info.el.querySelector(".fc-title").innerHTML = `<i>${info.event.title}</i>`
        // info.el.querySelector(".fc-title").style.border = "1px solid black"
        info.el.style.backgroundColor  = "plum";
        info.el.style.borderColor = "plum"
        var heartEl = document.createElement("span")    // css.text see notejoy
        heartEl.innerHTML = "<img class='heart' src='https://icon.now.sh/heart/ccc'/>"
        var container = info.el.querySelector(".fc-content")
        container.style.padding = "2px 18px"
        container.style.backgroundImage = "url(https://icon.now.sh/heart/f00)"
        container.style.backgroundPosition = "center left"
        container.style.backgroundRepeat = "no-repeat"
        var timex = info.el.querySelector(".fc-time")
        // container.insertAfter(heartEl, timex)
        
        // var elem =  info.el.find(".fc-content") //.prepend("<i>F</i>");
        //  console.log(info.el)
        //  console.log(info.event._instance.range.start.getTime())
       }
     },
    eventClick: function({event, el, jsEvent, view}){
      jsEvent.preventDefault()
      el.style.borderColor = 'red' // animate this

      openForm(event)
  
    },
    events: async function(fetchInfo,successCallback){
      let result = await getEvents()
      // printCheckboxes()
      // intervalStart = calendar.view.currentStart
      // favCal() // T/F flag if create
      successCallback(await result) 
      },
     
   })

 

  let $favCal = document.querySelector("#favCal")

  var intervalStart


  let favCal = new FullCalendar.Calendar($favCal, {
    header: { center: '', right: 'prev,next' }, // buttons for switching between views
    plugins: [ 'dayGrid', 'list', 'bootstrap', 'timeGrid'],
    // defaultDate: intervalStart,
    // defaultView: 'list',
    // views: {
    //   timeGridFourDay: {
    //     titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
    //     type: 'list',
    //     // start: intervalStart, // customStart??
    //     duration: { days: 21 },
    //     buttonText: '4 day'
    //   }
    // },
    locale: 'en-gb',
    defaultView: 'listWeek',
    // defaultDate: intervalStart,
    
    events: function(fetchInfo, successCallback){
      // [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-07T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}]
      const ents  = Store.getFavEvents()
      successCallback(ents)
    },
    datesRender: function({view, el}) {
      // intervalStart = view.currentStart
      // console.log(intervalStart)
    },
    views: {
      listWeek: {
        noEventsMessage: "Non " + Store.getFavEvents().length + " Future Events " + intervalStart ,
      }
    },
  })

  // console.log(timeBetween - favCal.view.currentStart)




 
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

}


async function nextEvent(){
  await favCal.render()
  const ents  = Store.getFavEvents() 
  const now = new Date()
  ents.forEach( d => {
    const date = new Date(d.start)
    // console.log(date)
    if (date >= now && (date < new Date(closest) || date < closest)){
      closest = d.start
    }
  })
  console.log(closest)
  closest = new Date(closest)
  if(document.querySelector(".fc-list-empty")){

    document.querySelector(".fc-list-empty").innerHTML = `<a href="#" class="btn">${closest}</a>`
    document.querySelector(".fc-list-empty").addEventListener("click", () => {
      favCal.gotoDate(closest)
    
    })

  }
}

nextEvent()
