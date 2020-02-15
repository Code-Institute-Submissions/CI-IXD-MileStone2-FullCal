import checkFavourites from "../utils/checkFavourites.js" // helper func
import store from "../js/store.js";
// import { calendar } from "../js/main.js";

// import getEvents from "../components/Events.js"

export default function renderEventModal(info){
          const { favourites } = store.getState()
          const $favIcon = document.querySelector(".favourite")
          
          // console.log(favourites.forEach(favourite => favourite.id))
          // const event = calendar.getEventById(info.event.id)
          // console.log(event)
          // const obj = events.filter(x => x.id == info.event.id)[0] //cyclical object returning an array
          

          const showObj = {
            id: info.id,
            title: info.title, // title: show.getElementsByTagName("name")[0].childNodes[1].nodeValue,
            start: info.start,
            url: info.url,
            // classNames: [...tags],
            extendedProps: {
              description: info.extendedProps.description,
              category: info.extendedProps.category,
              images: {
                thumb: info.extendedProps.images.thumb,
                medium: info.extendedProps.images.medium,
                large: info.extendedProps.images.large
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
            
          $('#modalTitle').html(info.title)
          // $('#modalBody').html(`
          //   <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
          //   <div class="card-body">
          //   ${info.event.extendedProps.description} 
          //   </div>
          // `);
          $('.favourite').attr('data-event', JSON.stringify(showObj))
          
          $('.favourite-text').html(`${isFavourited? "Remove from Favourites" : "Add to Favourites" }`)
          $('#eventUrl').attr('href',info.url)
          $('#fullCalModal').modal()

          // console.log("Event Id: "+info.event.id)

          return false
        }


