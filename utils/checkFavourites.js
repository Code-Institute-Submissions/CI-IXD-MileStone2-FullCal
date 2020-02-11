export default function checkFavourites(favourites, show) {  // returns T/F
  return favourites.some(favourite => favourite.publicId === show.publicId) // show obj is in favs ?
}