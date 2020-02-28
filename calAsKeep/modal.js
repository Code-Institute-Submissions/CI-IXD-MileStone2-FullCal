import checkFavourites from "../utils/checkFavourites.js" // helper func
import store from "../js/store.js";
import { calendar } from "../js/main.js";


export default function renderEventModal(info){
          const { favourites } = store.getState()
          const $favIcon = document.querySelector(".favourite")

          const showObj = {
            id: info.event.id,
            title: info.event.title,
            start: info.event.start,
            url: info.event.url,
            extendedProps: {
              description: info.event.extendedProps.description,
              category: info.event.extendedProps.category,
              images: {
                thumb: info.event.extendedProps.images.thumb,
                medium: info.event.extendedProps.images.medium,
                large: info.event.extendedProps.images.large
                },
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
          $('.favourite').attr('data-event', JSON.stringify(showObj))
          $('.favourite-text').html(`${isFavourited? '<i class="fa fa-heart" aria-hidden="true"></i> Favourited' : '<i class="fa fa-heart-o" aria-hidden="true"></i> Favourite' }`)
          $('#eventUrl').attr('href',info.event.url)
          $('#fullCalModal').modal()


          return false
        }
   
