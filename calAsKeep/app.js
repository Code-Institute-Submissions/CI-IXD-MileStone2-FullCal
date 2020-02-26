import {default as getEvents, categories} from "../components/Events.js"
import {Category} from "../components/CBSclass.js"
import UI from "../components/Ui.js"
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





// Events: Display Fav Cal
document.addEventListener("DOMContentLoaded", UI.displayEvents)
document.addEventListener("DOMContentLoaded", UI.favsButton)



let favToggle = false
let cbToggle = false
let closest = Infinity
// const favourites  = Store.getFavEvents()

export const eventSource = {
test : {
   events: 
   [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-17T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}],
 },

 favs: {
   events: function(fetchInfo, successCallback){
     let result = Store.getFavEvents()
     successCallback(result)
   }
 },
wxac: {
   events: async function(fetchInfo, successCallback){
     let result = await getEvents()
     cbs()
     // intervalStart = calendar.view.currentStart
     // favCal() // T/F flag if create
     successCallback(await result)
   }
  }
}


let $calendar = document.querySelector("#calendar")
export let calendar = new FullCalendar.Calendar($calendar, {
  
     locale: 'en-gb',
     plugins: [ 'dayGrid', 'list', 'bootstrap'],
    //  defaultDate: '2020-02-16',
    //  defaultView: 'dayGridMonth',
     defaultView: 'listWeek',
     themeSystem: 'bootstrap', // black table borders! 
    customButtons: {
      // favsButton: {
      //   text: 'Favs',
      //   click: function(){
          
      //     var eventSources = calendar.getEventSources()
      //     eventSources[0].remove()
      //     if(favToggle == false){
      //       favToggle = true
      //       calendar.addEventSource(eventSource.favs)
      //       calendar.changeView('favsView')
      //     }else{
      //       favToggle = false
      //       calendar.today()
      //       calendar.changeView('listWeek')
      //       calendar.addEventSource(eventSource.wxac)  //calendar.getEventSourceById(3)
      //     }
          
      //   }
      // }
    },
     header: {
       left: 'title, dayGridMonth, listWeek',
       center: '',
       right: 'favsButton, prev,next ',
      },
  
     views: {
        listWeek: {

            eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
            // omitZeroMinute: true,
            hour12: true
        }
      },
        favsView: {
          type: 'list',
          duration: { months: 1 }
        }
    },
   

    eventRender: function ({event, el, jsEvent, view}) {
      if(categories.get(event.extendedProps.category) == true) {
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
        }else{ return false } // else dont render event
         
          
        },
    eventPositioned: function(info){
      if(info.view.type === 'listWeek'){
        info.el.querySelector(".favourite").addEventListener("click", e => {
          const show = JSON.parse(info.event.extendedProps.jdata)
          const isFavourited = Store.checkFavs(show.id)
          if(isFavourited) {
            Store.removeEvent(show.id)
            UI.showAlert("Event Removed to Favourites", "warning")
            UI.deleteEventFromList(show.id)
          }else{
            UI.addEventToList(show)
            Store.addEvent(show)
            UI.showAlert("Event Added to Favourites", "success")
          }
          calendar.rerenderEvents() 
        })
      }
    
    },
    eventClick: function(info){
        // console.log(jsEvent)
        if(info.view.type === 'dayGridMonth'){
          info.jsEvent.preventDefault()
          const isFavourited = Store.checkFavs(info.event.id)
          const show = JSON.parse(info.event.extendedProps.jdata)
          UI.openModal(show, isFavourited)
          document.querySelector("span.favourite").addEventListener("click", e => {
            // console.log(e.target.classList)
            if(isFavourited) {
              Store.removeEvent(show.id)
              UI.showAlert("Event Removed to Favourites", "warning")
              UI.deleteEventFromList(show.id)
              UI.openModal(show)
            }else{
              UI.addEventToList(show)
              Store.addEvent(show)
              UI.showAlert("Event Added to Favourites", "success")
              UI.openModal(show, true)
            }
            calendar.rerenderEvents()
          })
        }
        
      },
      eventSources: [eventSource.wxac],
      
    // },


     
   })


function addEventListeners() {

// const $favourites = [...document.querySelectorAll(".favourite")]
// for(const $favourite of $favourites){

 



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

    calendar.rerenderEvents()
  })


}


calendar.render()


// Category.checkboxListeners()
let printed = false
function cbs()
{
  if(printed == false){
    let cbx = new Category
    printed = true
    cbx.checkboxListeners()
  }
}

addEventListeners()







