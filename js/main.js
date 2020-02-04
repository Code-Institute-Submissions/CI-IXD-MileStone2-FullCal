'use strict'
class App {
  constructor() {
    console.log('app works!')  
    //this.notes = []
    this.favourites = JSON.parse(localStorage.getItem("favourites")) || []
    this.events = []
    this.origin = "https://wexfordartscentre.ticketsolve.com/shows.xml"
    this.proxy  = "https://cors-anywhere.herokuapp.com/"
    // this.proxy = "https://cors.x7.workers.dev/"
    let URL = window.location.href
    this.local = URL.substring(0, URL.lastIndexOf("/") + 1) + "shows.xml";

    this.$calendar = document.querySelector("#calendar")
    this.$favIcon = document.querySelector(".favourite")
    this.$selecta = document.querySelector("#color_selector")

    //this.getEvents()
    this.renderCal()

    }
  
  async getEvents(){
      const App = this
    // await fetch(this.proxy+this.origin)
    await fetch(this.local)
              .then( response => response.text())
              .then( function(data){
                console.log("fetched data ok")
              const xmlDOM = new DOMParser().parseFromString(data, 'text/xml') // DOM tree from XML
              xmlDOM.querySelectorAll("show").forEach(show => { 
              const tags = []
              $(show).find("tag").get().forEach(tag => tags.push(tag.textContent))
              const showObj = {
                id: show.getAttribute("id"),
                title: show.querySelector("name").childNodes[1].nodeValue, // title: show.getElementsByTagName("name")[0].childNodes[1].nodeValue,
                start: show.querySelector("opening_time_iso").textContent,
                url: show.querySelector("url").textContent.split("event")[0],
                classNames: [...tags],
                extendedProps: {
                  description: show.querySelector("description").textContent,
                  images: {
                    thumb: show.querySelector("url[size='thumb']").innerHTML,
                    medium: show.querySelector("url[size='medium']").innerHTML,
                    large: show.querySelector("url[size='large']").innerHTML
                  }
                }

              }

              App.events.push(showObj)
              })
              return App.events
          })
          // .catch()
    }

      getFavourites(){
        console.log(this.favourites)
          return this.favourites
      }

      checkFavourites(favourites, event) {  // returns T/F
        return favourites.some(favourite => favourite.id === event.id) // given story obj is in favs
    }

    renderEventModal(info){
          const App = this
          const obj = App.events.filter(x => x.id == info.event.id)[0] //cyclical object returning an array
          
          this.$favIcon.addEventListener('click', function(){
              

              //console.log(JSON.parse(this.dataset.story)) //(this.dataset.event)
              //console.log(info.event.id === Number("873611604"))
              if(App.checkFavourites(App.favourites, info.event.id)){
              //if(App.favourites.some(x => x.id === info.event.id)) {
                //
                console.log("true")
              //  App.deleteEvent(info.event.id)
              }else{
                console.log(App)
                App.addEvent(obj)
              }
         

            })
          // })
          //console.log(obj)

          
          $('#modalTitle').html(info.event.title)
          $('#modalBody').html(`
            <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
            <div class="card-body">
            ${info.event.extendedProps.description} 
            </div>
          `);
          $('.favourite').attr('data-event', JSON.stringify(obj))
          $('.favourite').html(`${App.favourites.some(x => x.id == info.event.id) ? "Remove From Favourites" : "Add To Favourites"}`)
          $('#eventUrl').attr('href',info.event.url)
          $('#fullCalModal').modal()
          // console.log(obj)
          // console.log(JSON.stringify(obj))

          // console.log(App.events)
          console.log("Event Id: "+info.event.id)
          // App.favourites.forEach(x => console.log(x.id == info.event.id))
          // console.log(App.favourites[1])
          // var testArr = [{id:7},{id:2},{id:4}]
          // console.log(testArr[1])
    
          return false
        }

      
    renderCal(){

     
      const App = this

      var calendar = new FullCalendar.Calendar(this.$calendar, { //const calendarEl = this.$calendar
        
        locale: 'en-gb',
          plugins: [ 'dayGrid', 'list', 'bootstrap'],
          themeSystem: 'bootstrap',   //defaultView: 'listWeek',
       
          // eventRender: function(info) {
            // $(info.el).tooltip({  
            //   title: `${info.event.title}\n@ ${info.event.start.toLocaleTimeString({},
            //     {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'} // AM || PM
            //   )}`,
            //   placement: 'top',
            //   trigger: 'hover',
            //   container: 'body'
            // });

            eventRender: function (info) {
              // console.log(info.event.title + " " + info.event.className[0])
              // console.log(info.event.title)
              if(info.event.classNames.includes("presentationcentre")){
                console.log(info.event.classNames)
                return true
              }else{
                return false
              }
              // // console.log($('#color_selector').val())
              // if(info.event.classNames.contains("presentationcentre")){
              //   console.log(info.event.title)
              //   console.log("Pres Centre")

              // }
   
              
            },
          eventClick: function(info){
            info.jsEvent.preventDefault() // don't let the browser navigate
            App.renderEventModal(info)
          },
          events:  async function(fetchInfo,successCallback){
                await App.getEvents()
               successCallback(App.events)
              //  successCallback(App.favourites) // successCallback([{ title: "Slow Flow Mindful Yoga" , start: "2020-02-07T19:30:00+00:00" }])
                } 
        //varCal     
        })
        console.log(this.$selecta)
        calendar.render();

     }


    // Methods
    saveEvents(){
      console.log("saved")
      localStorage.setItem("favourites", JSON.stringify(this.favourites))
      console.log("Current Favs:")
      console.log(this.favourites)
      
    }



    addEvent(newEvent){ // destructor note{}
       console.log("passed: "+JSON.stringify(newEvent))
          // const newEvent = {
          //     title,//title: note.title,
          //     text,//text: note.text,
          //     color: "white",
          //     id: this.notes.length > 0 ? this.notes[this.notes.length -1].id + 1 : 1
          // }
          newEvent.isFavourited = "true"
          //console.log(JSON.stringify(this.favourites))
          this.favourites = [...this.favourites, newEvent ] //nesting! [] {...newEvent, isFavourited: "true"}
          console.log(this.favourites)
          //console.log(this.notes)
          this.render()
      }


      deleteEvent(eid){
        // console.log("Delete Event : " + String(id ))
        // console.log(Number(id))
        this.favourites = this.favourites.filter( ent => ent.id !== eid)

        this.render()
      }

      render(){
        this.saveEvents()
      }


}

new App()
          // eventClick: 



      
      //   });
 
      //   
      // });