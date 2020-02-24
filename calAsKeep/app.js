import {default as getEvents, categories} from "../components/Events.js"
import checkFavourites from "../utils/checkFavourites.js" // helper func
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

      // console.log(events)

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

  static deleteEventByClick(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove(); // tr not just td
    }

  }

  static deleteEventFromList(eid){
    const $list = document.querySelector("#event-list")
    const cells = [ ...$list.querySelectorAll("td")]
    cells.forEach(cell => {
      if(cell.textContent === eid){
        cell.parentElement.remove()
      }
    })
    // if(el.classList.contains('delete')) {
      // el.parentElement.parentElement.remove(); // tr not just td
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

    // $('#fullCalModal').modal("toggle")



  }

}

// Store Class - localStorage



// Events: Display Fav Cal
document.addEventListener("DOMContentLoaded", UI.displayEvents)





let closest = Infinity

const sources = {
  favs: {
    events: 
    [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-17T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}],
    id: 2
  },
}

const  favourites  = Store.getFavEvents()

// document.addEventListener("DOMContentLoaded", function() {

  let $calendar = document.querySelector("#calendar")
  let calendar = new FullCalendar.Calendar($calendar, {
  
     locale: 'en-gb',
     plugins: [ 'dayGrid', 'list', 'bootstrap'],
     defaultDate: '2020-02-16',
    //  defaultView: 'dayGridMonth',
     defaultView: 'listWeek',
     themeSystem: 'bootstrap', // black table borders! 
   
    //  customButtons: {
    //    favourites: {
    //      text: 'Favs!',
    //      click: function(){   // turn on all cats!
    //       //  calendar.getEventSourceById(1).remove()
    //       //  calendar.addEventSource(sources.favs)
    //       calendar.gotoDate(new Date(closest)) //calendar.gotoDate("2021-01-09")
    //      }
    //    }
    //  },
     header: {
       left: 'title, dayGridMonth, listWeek',
       center: '',
       right: 'favourites, today, prev,next ',
      },
      // eventSources: [sources.favs],
     views: {
    //   dayGridMonth: { // name of view
    //     // titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
    //     // other view-specific options here
    //     eventTimeFormat: {
    //     hour: 'numeric',
    //     minute: '2-digit',
    //     meridiem: true,
    //     omitZeroMinute: true,
    //     hour12: true
    //     },
    //   }


    listWeek: {

        eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: true,
        // omitZeroMinute: true,
        hour12: true
    }
  },
},






    eventRender: function ({event, el, jsEvent, view}) {
     
      const isFavourited = Store.checkFavs(event.id)      
      if(view.type === 'dayGridMonth') {


        //return categories.get(event.extendedProps.category)
       if(isFavourited){ // el - is the anchor wrapper, div.fc-content > span.fc-time + span.fc-title
        el.querySelector(".fc-title").innerHTML = `<i>${event.title}</i>`
        // el.querySelector(".fc-title").style.border = "1px solid black"
        el.style.backgroundColor  = "plum";
        el.style.borderColor = "plum"
        var heartEl = document.createElement("span")
        heartEl.innerHTML = "<img class='heart' src='https://icon.now.sh/heart/ccc'/>"
        var container = el.querySelector(".fc-content")
        container.style.padding = "2px 18px"
        container.style.backgroundImage = "url(https://icon.now.sh/heart/f00)"
        container.style.backgroundPosition = "center left"
        container.style.backgroundRepeat = "no-repeat"
        var timex = el.querySelector(".fc-time")
     
       }



      }else if(view.type === 'listWeek'){
        
          
            el.innerHTML = `
              <td class="fc-list-item-title" colspan="3">
  
    <div class="card rounded-right m-2 border border-muted event-card">
      <div class="row no-gutters">
        <div class="col-auto " style="z-index: 9;" data-target="#show-${event.id}" data-toggle="collapse" aria-expanded="false">
          <div class="img-left rounded-left" style="background:url(${event.extendedProps.images.medium}); background-size: cover; background-clip: border-box;"></div>
        </div>
        <div class="col d-flex flex-column justify-content-between">
          <div class="card-block py-1 px-3" data-target="#show-${event.id}" data-toggle="collapse" aria-expanded="false">
              <h4 class="card-title" >${(event.title).length >= 42? '<small>'+event.title+'</small>' : event.title}</h4>
              <h6>${event.start.getHours() >= 12? event.start.getHours()-12 : event.start.getHours()  }:${(event.start.getMinutes() === 0? '00': event.start.getMinutes()) + (event.start.getHours() >= 12? 'pm' : 'am')  }</h6>
              <div id="show-${event.id}" class="card-text collapse">${event.extendedProps.description}</div>
          </div>
          <div class="card-footer d-flex flex-row justify-content-around" style=" z-index: 5">
            <a href="#" class="btn btn-danger text-light"><i class="fa fa-ticket"></i> Definitely !</a>
             <button class="btn btn-info favourite" type="button">${isFavourited? "Remove from Favourites" : "Add to Favourites" }</button>
            
            <button class="btn btn-success">Share</button>
          </div>
        </div>
      </div>
    </div>
  
              </td>
             `

      }

           // const { favourites } = Store.getFavEvents()

         
          
        },
    eventPositioned: function(info){
      
      info.el.querySelector(".favourite").setAttribute("data-show", `${info.event.extendedProps.jdata}`) //IDS can't be numbers!


    },
    //eventRender: function (info) {
      
      //  },
      eventClick: function({event, el, jsEvent, view}){
        // console.log(jsEvent)
   

        // if(view.type === 'listWeek'){
        //   console.log("click")
        // }

        // if(view.type === 'dayGridMonth'){
        //   jsEvent.preventDefault()
        //   openForm(event)
        // }
        
      },
      events: async function(fetchInfo, successCallback){
    let result = await getEvents()
    // printCheckboxes()
    // intervalStart = calendar.view.currentStart
    // favCal() // T/F flag if create
    successCallback(await result) 
    addEventListeners()
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
    
    // events: function(fetchInfo, successCallback){
    //   // [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-07T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}]
    //   const ents  = Store.getFavEvents()
    //   successCallback(ents)
    // },
    eventSources: [sources.favs],
    datesRender: function({view, el}) {
      // intervalStart = view.currentStart
      // console.log(intervalStart)
    },
    views: {
      listWeek: {
        // noEventsMessage: "Non " + Store.getFavEvents().length + " Future Events " + intervalStart ,
      }
    },
  })

  // console.log(timeBetween - favCal.view.currentStart)




 




//    function openForm(event){
//     //  console.log(event.extendedProps.jdata)
    
//     $('#modalTitle').html(event.title)
//     $('#modalBody').html(`
//       <p class="edate">${event.start}</p>
//       <p class="eid">${event.id}</p>
//     `)
//     $('#modalBody').html(`
//       <img src="${event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${event.title}" />
//       <div class="card-body">
//       ${event.extendedProps.description} 
//       </div>
//     `);
//     $('.favourite').attr('data-event', event.extendedProps.jdata )
//     const isFavourited = Store.checkFavs(event.id)
//     $('.favourite-text').html(`${isFavourited? "Remove from Favourites" : "Add to Favourites" }`)  // Event Added Msg on both
//     $('#eventUrl').attr('href',event.url)
//     $('#fullCalModal').modal()
//   // document.querySelector("#form").classList.add("form-open")
//   //     document.querySelector("#note-title").style.display = "block"
//   //     document.querySelector("#note-title").value = info.event.title
//   //     document.querySelector("#note-text").value = info.event.extendedProps.description
//   //     document.querySelector("#form-buttons").style.display = "block"
// }

function addEventListeners() {
// JSON.parse(document.querySelector(".favourite").getAttribute("data-event"))
const $favourites = [...document.querySelectorAll(".favourite")]
console.log($favourites)
$favourites.forEach(favourite => {
  favourite.addEventListener("click", (e) => {

    const event = JSON.parse(e.target.dataset.show)
    const isFavourited = Store.checkFavs(event.id);
    console.lof(isFavourited)
    if(isFavourited) {
      Store.removeEvent(event.id)
      UI.showAlert("Event Removed to Favourites", "warning")
      UI.deleteEventFromList(event.id)
      // calendar.rerenderEvents()
    }else{

      
          UI.addEventToList(event)
        
          Store.addEvent(event)
      
          
          calendar.rerenderEvents()
          // favCal.rerenderEvents()
          UI.showAlert("Event Added to Favourites", "success")
      
          UI.clearFields()
    }
  }
  )
})


  // Event to Add Event = UI and Storage


  // Event to REmove a Book - UI and Storage
  document.querySelector("#event-list").addEventListener("click", e => { // event propagation (del - first one would be removed)
    UI.deleteEventByClick(e.target) 
    // console.log(e.target)

    
    let eid = e.target.parentElement.parentElement.firstElementChild.textContent
    // console.log(eid)
    Store.removeEvent(eid)
    
    UI.showAlert("Event Removed to Favourites", "warning")

    //

  })

  calendar.render()

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
  // console.log(closest)
  closest = new Date(closest)
  if(document.querySelector(".fc-list-empty")){

    document.querySelector(".fc-list-empty").innerHTML = `<a href="#" class="btn">${closest}</a>`
    document.querySelector(".fc-list-empty").addEventListener("click", () => {
      favCal.gotoDate(closest)
    
    })

  }
}
calendar.render()
nextEvent()

