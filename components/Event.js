// import store from "../js/store.js"
import checkFavourites from "../utils/checkFavourites.js" // helper func

export default function Event(event) {
  // const { favourites } = store
  // console.log(favourites)
  // const isFavourited = checkFavourites(favourites, event.id)
  // console.log(isFavourited)
  return `
  <div class="row border-bottom">
    <div class="col">
      <span>${event.index}</span>
      <span>Event ID: ${event.id}</span>
      <h6>${event.title}</h6>
      <p>${escape(event.extendedProps.description).slice(0, 300)}...</p>
      <p>${event.start}
      |
      <span class="fav" data-event='${JSON.stringify(event)}'>
      <img class="heart" src="https://icon.now.sh/heart/ccc">
      ${event.isFavourited? "Remove from Favourites" : "Add to Favourites"} ${event.isFavourited}
    </span>
    </p>
    </div>
  </div>`
}