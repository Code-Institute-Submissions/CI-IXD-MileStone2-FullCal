export default function checkFavourites(favourites, show) {  // returns T/F
  return favourites.some(favourite => favourite.id === show.id) // show obj is in favs ?
}