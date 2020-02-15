import checkFavourites from "../utils/checkFavourites.js" // helper func
import store from "../js/store.js";
import { calendar } from "../js/main.js";

// import getEvents from "../components/Events.js"

export default function renderEventModal(info){
          const { favourites } = store.getState()
          const $favIcon = document.querySelector(".favourite")
          
          // console.log(favourites.forEach(favourite => favourite.id))
          // const event = calendar.getEventById(info.event.id)
          // console.log(event)
          // const obj = events.filter(x => x.id == info.event.id)[0] //cyclical object returning an array
          

          const showObj = {
            id: info.event.id,
            title: info.event.title, // title: show.getElementsByTagName("name")[0].childNodes[1].nodeValue,
            start: info.event.start,
            url: info.event.url,
            // classNames: [...tags],
            extendedProps: {
              description: info.event.extendedProps.description,
              category: info.event.extendedProps.category,
              images: {
                thumb: info.event.extendedProps.images.thumb,
                medium: info.event.extendedProps.images.medium,
                large: info.event.extendedProps.images.large
                },
              // isFavourite: checkFavourites(favourites, showObj)
              }
              
            }

            console.log(showObj)
            const isFavourited = checkFavourites(favourites, showObj)
            console.log(isFavourited)
 

        
          $favIcon.addEventListener('click', async function() {
              const event = JSON.parse(this.dataset.event)
              
             
              // console.log(showObj)
              if(isFavourited){
                store.dispatch( { type: "REMOVE_FAVOURITE", payload: { favourite: showObj } })
              } else {
                store.dispatch( { type: "ADD_FAVOURITE", payload: { favourite: showObj } })
              }
              renderEventModal(info)
            })
            
          $('#modalTitle').html(info.event.title)
          // $('#modalBody').html(`
          //   <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
          //   <div class="card-body">
          //   ${info.event.extendedProps.description} 
          //   </div>
          // `);
          $('.favourite').attr('data-event', JSON.stringify(showObj))
          
          $('.favourite-text').html(`${isFavourited? "Remove from Favourites" : "Add to Favourites" }`)
          $('#eventUrl').attr('href',info.event.url)
          $('#fullCalModal').modal()

          // console.log("Event Id: "+info.event.id)

          return false
        }


//         // Methods
//    function saveEvents(){
//       console.log("saved")
//       localStorage.setItem("favourites", JSON.stringify(favourites))
//       console.log("Current Favs:")
//       console.log(favourites)
//     }



//   function addEvent(newEvent){ // destructor note{}
//        console.log("passed: "+JSON.stringify(newEvent))

//           newEvent.extendedProps.isFavourited = "true"
//           //console.log(JSON.stringify(this.favourites))
//          favourites = [...favourites, newEvent ] //nesting! [] {...newEvent, isFavourited: "true"}
//           console.log(favourites)
//           //console.log(this.notes)
//          render()
//       }


// function  deleteEvent(eid){
//         // console.log("Delete Event : " + String(id ))
//         // console.log(Number(id))
//         favourites = favourites.filter( ent => ent.id !== eid)

//         render()
//       }

// function render(){
//         saveEvents()
//       }
   
