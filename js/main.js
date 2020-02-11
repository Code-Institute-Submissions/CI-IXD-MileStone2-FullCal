import renderEventModal from "../components/modal.js";
import {printCheckboxes, checkboxListeners} from "../components/Checkboxes.js"
import {default as getEvents, categories} from "../components/Events.js"
import store from "./store.js"



 
    // const origin = "https://wexfordartscentre.ticketsolve.com/shows.xml"
    // const proxy  = "https://cors-anywhere.herokuapp.com/"
    // const proxy = "https://cors.x7.workers.dev/"
   

    const $calendar = document.querySelector("#calendar")
    const $favIcon = document.querySelector(".favourite")
    // const $selecta = document.querySelector("#color_selector")


    const sources = {
      wxac: { 
            events: async function(fetchInfo,successCallback){
            let result = await getEvents()
            printCheckboxes()
            successCallback(await result) 
            },
            id: 1
           },
      favs: {
            events:  function(fetchInfo,successCallback){
            const ents = [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-07T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}]
            console.log(ents)
            successCallback(ents)
            },
            id: 2
          },
    }
  //  let events = await getEvents(local)

let calendar = new FullCalendar.Calendar($calendar, {
        locale: 'en-gb',
        plugins: [ 'dayGrid', 'list', 'bootstrap'],
        customButtons: {
          favourites: {
            text: 'Favourites!',
            click: function(){   // turn on all cats!
              calendar.getEventSourceById(1).remove()
              calendar.addEventSource(sources.favs)
              console.log(calendar.getEventSources()[0])
              console.log(calendar.getEventSourceById(2))
              // calendar.addEventSource()
              
            }
          }
        },
        themeSystem: 'bootstrap', 
        header: {
          right: 'favourites today prev,next ',
          // center: 'title',
          // right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        // defaultView: 'list',
        eventRender: function (info) {
            return categories.get(info.event.extendedProps.category)
            // return true
          },
        eventClick: function(info){
          info.jsEvent.preventDefault() // don't let the browser navigate
          renderEventModal(info)
        },
          eventSources: [sources.wxac]
              
      //end App.Cal{}     
      })


            
            
            
            
calendar.render()
checkboxListeners()

export { calendar }
  
