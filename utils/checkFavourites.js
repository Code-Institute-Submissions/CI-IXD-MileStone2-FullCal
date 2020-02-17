export default function checkFavourites(favourites, show) {  // returns T/F
  return favourites.some(favourite => Number(favourite.id) === Number(show.id)) // show obj is in favs ?
}