import {default as getEvents, categories} from "./components/Events.js"
import {Category} from "./components/Checkboxes.js"
import UI from "./components/Ui.js"
import Store from "./js/store.js"


export const eventSource = {
  
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
  // test : {
  //    events: 
  //    [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-17T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}],
  //  },
}


let $calendar = document.querySelector("#calendar")
export let calendar = new FullCalendar.Calendar($calendar, {
  
     locale: 'en-gb',
     plugins: [ 'dayGrid', 'list', 'bootstrap'],
    //  defaultDate: '2020-02-16',
    //  defaultView: 'dayGridMonth',
     defaultView:  'listWeek',
     themeSystem: 'bootstrap', 
     header: {
       left: 'dayGridMonth, listWeek, listMonth, title',
       center: 'favsButton',
       right: 'title, prev,next ',
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
            el.style.backgroundColor  = "plum";
            el.style.borderColor = "plum"
            var heartEl = document.createElement("span")
            heartEl.innerHTML = "<img class='heart' src='https://icon.now.sh/heart/ccc/'/>"
            var container = el.querySelector(".fc-content")
            container.style.padding = "2px 18px"
            container.style.backgroundImage = "url(https://icon.now.sh/heart/f00/)"
            container.style.backgroundPosition = "center left"
            container.style.backgroundRepeat = "no-repeat"
          }
          
          $(el).tooltip({ 
            title: event.title,
            placement: "top", trigger: "hover", container: "body"
          })

        }else if(view.type === 'listWeek'){
            
              
                el.innerHTML = `
                  <td class="fc-list-item-title" colspan="3">
      
                  <div class="card rounded-right m-2 border border-muted event-card">
                    <div class="row no-gutters">
                      <div class="col-auto " data-target="#show-${event.id}" data-toggle="collapse" aria-expanded="false">
                        <div class="img-left rounded-left" style="background:url(${event.extendedProps.images.medium}); background-size: cover; background-clip: border-box;"></div>
                      </div>
                      <div class="col d-flex flex-column justify-content-between">
                        <div class="card-block py-1 px-3" data-target="#show-${event.id}" data-toggle="collapse" aria-expanded="false">
                            <h4 class="card-title" >${(event.title).length >= 42? '<small>'+event.title+'</small>' : event.title}</h4>
                            <h6>${event.start.getHours() >= 12? event.start.getHours()-12 : event.start.getHours()  }:${(event.start.getMinutes() === 0? '00': event.start.getMinutes()) + (event.start.getHours() >= 12? 'pm' : 'am')  }</h6>
                            <div id="show-${event.id}" class="card-text collapse">${event.extendedProps.description}</div>
                        </div>
                        <div class="card-footer d-flex flex-row justify-content-around" style=" z-index: 5">
                          <a href="#" class="btn btn-danger text-light"><i class="fa fa-ticket"></i> Buy Tickets!</a>
                          <button class="btn btn-info favourite" type="button">${isFavourited? '<i class="fa fa-heart" aria-hidden="true"></i> Favourited' : '<i class="fa fa-heart-o" aria-hidden="true"></i> Favourite' }</button>
                          <!-- split share button -->
                          <div class="btn-group">
                            <button type="button" class="btn btn-success copylinkA" data-href="${event.url}" data-toggle="tooltip" data-trigger="click" data-placement="top" title="Link Copied to Clipboard"><i class="fa fa-link"></i>&nbsp;Share</button>
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURI(event.url)}&amp;src=sdkpreparse"
                                onclick="window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;"
                                class="fb-xfbml-parse-ignore"><img src="https://icon.now.sh/facebook/4267b2"/>&nbsp;Facebook</a>
                              <a class="dropdown-item" href="https://api.whatsapp.com/send?text=${encodeURI(event.url)}" 
                                onclick="window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;"><img src="https://icon.now.sh/whatsapp/007e33/" />&nbsp;WhatsApp</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item copylinkB" data-href="${event.url}" data-toggle="tooltip" data-trigger="click" title="Link Copied to Clipboard"
                              data-template='<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
                                href="${event.url}" ><img src="https://icon.now.sh/link/333/" />&nbsp;Copy link</a>
                            </div>
                          </div>
                          <!-- //.card-footer -->
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
            // UI.deleteEventFromList(show.id) // test
          }else{
            // UI.addEventToList(show) // test
            Store.addEvent(show)
            UI.showAlert("Event Added to Favourites", "success")
          }
          calendar.rerenderEvents() 
        })
      // share button - copylinks
      info.el.querySelector(".copylinkA").addEventListener("click", e => copyLink(e))
      info.el.querySelector(".copylinkB").addEventListener("click", e => copyLink(e))
      }
      $('[data-toggle="tooltip"]').tooltip()
    },
    eventClick: function(info){
        if(info.view.type === 'dayGridMonth'){
          info.jsEvent.preventDefault()
          const isFavourited = Store.checkFavs(info.event.id)
          const show = JSON.parse(info.event.extendedProps.jdata)
          UI.openModal(show, isFavourited)
          document.querySelector("span.favourite").addEventListener("click", e => {
            if(isFavourited) {
              Store.removeEvent(show.id)
              UI.showAlert("Event Removed to Favourites", "warning")
              // UI.deleteEventFromList(show.id) //table test
              UI.openModal(show)
            }else{
              // UI.addEventToList(show)  // table test
              Store.addEvent(show)
              UI.showAlert("Event Added to Favourites", "success")
              UI.openModal(show, true)
            }
            calendar.rerenderEvents()
          })
        }
        
      },
      eventSources: [eventSource.wxac],
     
   })
   
// Events: Display Fav Cal   
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
   

document.addEventListener("DOMContentLoaded", UI.favsButton)
   
    
    
// Copylink Helper 
// ref: https://stackoverflow.com/questions/55065316/copy-text-present-in-button-attribute-to-clipboard
function copyLink(jsevent){
  jsevent.preventDefault();
  const copyText = jsevent.target.dataset.href
  let textarea = document.createElement("textarea") 
  textarea.textContent = copyText
  textarea.style.position = "fixed" // Prevent scrolling to bottom of page in MS Edge.
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
  setTimeout(function(){$('[data-toggle="tooltip"]').tooltip('hide')}, 750);
}
    
    
/* Table Testing 
   Commented out in index.html

// Flags - unused 
let favToggle = false
let cbToggle = false
let closest = Infinity
// const favourites  = Store.getFavEvents()

// Event Class: Represents an Event
// consturctir of Book - properties??
class Ent {
  constructor(title, date, eid){
    this.title = title;
    this.start = date;
    this.id = eid;
  }
} 

// addEventListeners()   
function addEventListeners() {

// Event to Add Event = UI and Storage

// Event to REmove a Book - UI and Storage
  document.querySelector("#event-list").addEventListener("click", e => { // event propagation (del - first one would be removed)
    UI.deleteEventByClick(e.target) 
    
    let eid = e.target.parentElement.parentElement.firstElementChild.textContent
    // console.log(eid)
    Store.removeEvent(eid)
    
    UI.showAlert("Event Removed to Favourites", "warning")

      calendar.rerenderEvents()
    })


  } */
    