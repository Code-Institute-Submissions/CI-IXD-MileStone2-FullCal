export default class Store {
    static getFavEvents(){
        // let favs
        return (JSON.parse(localStorage.getItem("favourites")) || [])
        // favs =, return favs
    }

    static addEvent(show){
        if(Store.checkFavs(show.id) == true) return
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
