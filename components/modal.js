import checkFavourites from "../utils/checkFavourites.js" // helper func
// import store from "../js/store.js";
import store from "../js/store.js";

// import getEvents from "../components/Events.js"

export default function renderEventModal(event){
          const info = JSON.parse(event.target.dataset.event);
          const { favourites } = store
          const $favIcon = document.querySelector(".favourite")
          
          const showObj = {
            id: info.id,
            title: info.title, 
            start: info.start,
            url: info.url,
            extendedProps: {
              description: info.extendedProps.description,
              category: info.extendedProps.category,
              images: {
                thumb: info.extendedProps.images.thumb,
                medium: info.extendedProps.images.medium,
                large: info.extendedProps.images.large
                },
              }
              
            }

            // console.log(showObj)
            // console.log(favourites)
            const isFavourited = store.checkFavs(showObj.id)
            // console.log(isFavourited)
 

        
          $favIcon.addEventListener('click', function() {
              // const event = JSON.parse(this.dataset.event)
              
             
              if(isFavourited){
                // store.dispatch( { type: "REMOVE_FAVOURITE", payload: { favourite: showObj } })
                store.remove(showObj.id)
              } else {
                // store.dispatch( { type: "ADD_FAVOURITE", payload: { favourite: showObj } })
                store.add(showObj)
              }
              store.save()
              console.log(store.favourites)
              renderEventModal(event)
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

          // return false
        }



