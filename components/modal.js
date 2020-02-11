import { calendar } from "../js/main.js";

import checkFavourites from "../utils/checkFavourites.js" // helper func

let favourites = JSON.parse(localStorage.getItem("favourites")) || []

// import {events} from "./Events.js"
export default function renderEventModal(info){
          const $favIcon = document.querySelector(".favourite")
          // console.log(App)
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
                }
              }
            }



          let isFavourited = checkFavourites(favourites, showObj);
          $favIcon.addEventListener('click', function(){
            
              if(isFavourited){
                console.log("true")
                deleteEvent(info.event.id)
                $('.favourite-text').html("Add To Favourites")
              }else{
                addEvent(showObj)
                $('.favourite-text').html("Remove from Favourites")
                // $('.favourite-text').html(`${isFavourited? "Remove From Favourites" : "Add To Favourites"}`)
              }
         

            })
          
          $('#modalTitle').html(info.event.title)
          $('#modalBody').html(`
            <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
            <div class="card-body">
            ${info.event.extendedProps.description} 
            </div>
          `);
          $('.favourite').attr('data-event', JSON.stringify(showObj))
          
          $('.favourite-text').html(`${isFavourited? "Remove From Favourites" : "Add To Favourites"}`)
          $('#eventUrl').attr('href',info.event.url)
          $('#fullCalModal').modal()

          console.log("Event Id: "+info.event.id)

          return false
        }


        // Methods
   function saveEvents(){
      console.log("saved")
      localStorage.setItem("favourites", JSON.stringify(favourites))
      console.log("Current Favs:")
      console.log(favourites)
    }



  function addEvent(newEvent){ // destructor note{}
       console.log("passed: "+JSON.stringify(newEvent))

          newEvent.extendedProps.isFavourited = "true"
          //console.log(JSON.stringify(this.favourites))
         favourites = [...favourites, newEvent ] //nesting! [] {...newEvent, isFavourited: "true"}
          console.log(favourites)
          //console.log(this.notes)
         render()
      }


function  deleteEvent(eid){
        // console.log("Delete Event : " + String(id ))
        // console.log(Number(id))
        favourites = favourites.filter( ent => ent.id !== eid)

        render()
      }

function render(){
        saveEvents()
      }
   
