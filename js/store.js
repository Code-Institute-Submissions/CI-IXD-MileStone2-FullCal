export default class Store {
    static getFavEvents(){
        // let favs
        return (JSON.parse(localStorage.getItem("favourites")) || [])
        // favs =, return favs
    }

    static addEvent(show){
        let favourites = Store.getFavEvents()
        favourites = [...favourites, show]
        localStorage.setItem("favourites", JSON.stringify(favourites))
        return
    }

    static removeEvent(eid){
        let favourites = Store.getFavEvents()
        favourites = favourites.filter(favourite => Number(favourite.id) !== Number(eid))
        localStorage.setItem("favourites", JSON.stringify(favourites))
        return
    }

    static checkFavs(eid){
        let favourites = Store.getFavEvents()
        return favourites.some(fav => Number(fav.id) === Number(eid) ) 
        // console.log("it's " + favourites.some(fav => Number(fav.id) === Number(show.id) ) + " that this is a fav")
    }

    static oldestFavEvent(){
        let favourites = Store.getFavEvents()
        return favourites.reduce( (a,b) => b.start < a.start ? b : a)
        // reduce(  )
    }



}

/*
import getEvents from "./requests.js"

class Store {
    constructor() {
        this.favourites = JSON.parse(localStorage.getItem("favourites")) || []
        this.events = JSON.parse(sessionStorage.getItem("events")) || getEvents()  // you can await constructor
    }
    add(show){
        this.favourites = [...this.favourites, show]
    }
    remove(showId){
        this.favourites = this.favourites.filter( favourite => favourite.id !== showId)
    }
    save() {
        localStorage.setItem("favourites", JSON.stringify(this.favourites))
    }
    checkFavs(showId) {
        return this.favourites.some(favourite => Number(favourite.id) === Number(showId)) // show obj is in favs ?
    }
}

*/