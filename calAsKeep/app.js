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

     const event = new Ent(jdata.title,jdata.start,jdata.id)

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
     plugins: [ 'list', 'bootstrap'],
     defaultDate: '2020-02-16',
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




    eventRender: function (info) {
     
    
      
      const isFavourited = checkFavourites(favourites, info.event)
      console.log(isFavourited)
          var desc = info.event.extendedProps.description.replace(/<\/?(?!a)(?!p)(?!img)\w*\b[^>]*>/ig, '');

          info.el.innerHTML = `
            <td class="fc-list-item-title" colspan="3">

  <div class="card rounded-right m-2 border border-muted event-card">
    <div class="row no-gutters" data-target="#show-${info.event.id}" data-toggle="collapse" aria-expanded="false">
      <div class="col-auto " style="z-index: 9;">
        <div class="img-left rounded-left" style="background:url(${info.event.extendedProps.images.medium}); background-size: cover; background-clip: border-box;"></div>
      </div>
      <div class="col d-flex flex-column justify-content-between">
        <div class="card-block py-1 px-3">
            <h4 class="card-title" >${(info.event.title).length >= 42? '<small>'+info.event.title+'</small>' : info.event.title}</h4>
            <h6>${info.event.start.getHours() >= 12? info.event.start.getHours()-12 : info.event.start.getHours()  }:${(info.event.start.getMinutes() === 0? '00': info.event.start.getMinutes()) + (info.event.start.getHours() >= 12? 'pm' : 'am')  }</h6>
            <div id="show-${info.event.id}" class="card-text collapse">${desc}</div>
        </div>
        <div class="card-footer d-flex flex-row justify-content-around" style=" z-index: 5">
          <a href="#" class="btn btn-danger text-light"><i class="fa fa-ticket"></i> Definitely !</a>
           <button class="btn btn-info addToFavourites">${isFavourited? "Remove from Favourites" : "Add to Favourites" }</button>
          
          <button class="btn btn-success addToFavourites">Share</button>
        </div>
      </div>
    </div>
  </div>

            </td>
           `

           // const { favourites } = Store.getFavEvents()

         
          
        },
    eventPositioned: function(info){
      // console.log(info.el.querySelector("h4"))
      
      // info.el.querySelector(".col").setAttribute("data-target", `#LAB-${info.event.id}`) //IDS can't be numbers!
      // info.el.querySelector(".card-text").id = `LAB-${info.event.id}`
    },
    //eventRender: function (info) {
      
      //  },
      eventClick: function({event, el, jsEvent, view}){
        // console.log(jsEvent)
   
        
      },
      events: async function(fetchInfo, successCallback){
    let result = await getEvents()
    // printCheckboxes()
    // intervalStart = calendar.view.currentStart
    // favCal() // T/F flag if create
    successCallback(await result) 
    },

//     events: [
//   {
//     "id": "873612415",
//     "title": "After School Art Workshop",
//     "start": "2020-02-07T15:00:00+00:00",
//     "url": "https://wexfordartscentre.ticketsolve.com/shows/873612415/",
//     "extendedProps": {
//       "description": "\n          <p>After School Art Workshop- This series of art classes is a place where kids can explore their creative side - by having fun, learning new skills and building confidence! Small classes of 8 students, insures individual attention to each students progress when it comes to learning art.&nbsp;</p>\n<div>\n<div>&nbsp;Kids will explore different ways of creating art and mark makings through Paint, Collage, Charcoal, Drawing, Mix-media and Suminagashi. We will also at different artists through history as well as modern day children&apos;s illustrators such as Oliver Jeffers, Mae Besom and Isabelle Arsenault as inspiration.&nbsp;</div>\n<div>&nbsp;</div>\n<div>As places are limited book early through The Presentation Art Centre to avoid disappointment!&nbsp;</div>\n<div>Nadia Corridan is an artist based in Enniscorthy since 2016. She is a fine art painter with a BA Honours Degree from Limerick School of Art &amp; Design.&nbsp;</div>\n<div>She has developed&nbsp;her career as a figurative&nbsp;oil painter. She is also one of the founding members and project manager to the Enniscorthy Art Trail which runs over the August Bank Holiday weekend each year. Her artwork can be viewed through social media and her website (<a href=\"http://nadiacorridan.weebly.com/\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=http://nadiacorridan.weebly.com/&source=gmail&ust=1579278434105000&usg=AFQjCNGyGMUzeHxpyFWzoLkGLS101aCu5w\">nadiacorridan.weebly.com</a>)</div>\n</div>\n<div>&nbsp;</div>\n<div>Tckets &euro;10 -pay as you go</div>\n<div>&euro;50 for 6 classes&nbsp;</div>\n<div>Running from 6th February - 12th March</div>\n<div>3pm - 4:30pm</div>\n        ",
//       "category": "Children",
//       "images": {
//         "thumb": "https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/MQ4NVjpNd47FMzAbqehoZ78z/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b",
//         "medium": "https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/MQ4NVjpNd47FMzAbqehoZ78z/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33",
//         "large": "https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/MQ4NVjpNd47FMzAbqehoZ78z/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"
//       },
//       "jdata": "{\"id\":\"873612415\",\"title\":\"After School Art Workshop\",\"start\":\"2020-02-06T15:00:00+00:00\",\"url\":\"https://wexfordartscentre.ticketsolve.com/shows/873612415/\",\"extendedProps\":{\"description\":\"\\n          <p>After School Art Workshop- This series of art classes is a place where kids can explore their creative side - by having fun, learning new skills and building confidence! Small classes of 8 students, insures individual attention to each students progress when it comes to learning art.&nbsp;</p>\\n<div>\\n<div>&nbsp;Kids will explore different ways of creating art and mark makings through Paint, Collage, Charcoal, Drawing, Mix-media and Suminagashi. We will also at different artists through history as well as modern day children&apos;s illustrators such as Oliver Jeffers, Mae Besom and Isabelle Arsenault as inspiration.&nbsp;</div>\\n<div>&nbsp;</div>\\n<div>As places are limited book early through The Presentation Art Centre to avoid disappointment!&nbsp;</div>\\n<div>Nadia Corridan is an artist based in Enniscorthy since 2016. She is a fine art painter with a BA Honours Degree from Limerick School of Art &amp; Design.&nbsp;</div>\\n<div>She has developed&nbsp;her career as a figurative&nbsp;oil painter. She is also one of the founding members and project manager to the Enniscorthy Art Trail which runs over the August Bank Holiday weekend each year. Her artwork can be viewed through social media and her website (<a href=\\\"http://nadiacorridan.weebly.com/\\\" target=\\\"_blank\\\" data-saferedirecturl=\\\"https://www.google.com/url?q=http://nadiacorridan.weebly.com/&source=gmail&ust=1579278434105000&usg=AFQjCNGyGMUzeHxpyFWzoLkGLS101aCu5w\\\">nadiacorridan.weebly.com</a>)</div>\\n</div>\\n<div>&nbsp;</div>\\n<div>Tckets &euro;10 -pay as you go</div>\\n<div>&euro;50 for 6 classes&nbsp;</div>\\n<div>Running from 6th February - 12th March</div>\\n<div>3pm - 4:30pm</div>\\n        \",\"category\":\"Children\",\"images\":{\"thumb\":\"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/MQ4NVjpNd47FMzAbqehoZ78z/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b\",\"medium\":\"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/MQ4NVjpNd47FMzAbqehoZ78z/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33\",\"large\":\"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/MQ4NVjpNd47FMzAbqehoZ78z/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941\"}}}"
//     }
//   },
 
// ]
     
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
  // console.log(closest)
  closest = new Date(closest)
  if(document.querySelector(".fc-list-empty")){

    document.querySelector(".fc-list-empty").innerHTML = `<a href="#" class="btn">${closest}</a>`
    document.querySelector(".fc-list-empty").addEventListener("click", () => {
      favCal.gotoDate(closest)
    
    })

  }
}

nextEvent()
