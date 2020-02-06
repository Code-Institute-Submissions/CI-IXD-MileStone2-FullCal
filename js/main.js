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
    this.$categories = document.querySelector("#checkboxes")
    this.cats = new Set

    const App = this
    App.calendar = new FullCalendar.Calendar(App.$calendar, { //const calendarEl = this.$calendar
        
      locale: 'en-gb',
        plugins: [ 'dayGrid', 'list', 'bootstrap'],
        themeSystem: 'bootstrap', 
        // defaultView: 'list',

          eventRender: function (info) {
         


            return App.cats.has(info.event.extendedProps.category)? true : false
            
      
          },
        eventClick: function(info){
          info.jsEvent.preventDefault() // don't let the browser navigate
          App.renderEventModal(info)
        },
        events:  async function(fetchInfo,successCallback){
              
               await App.getEvents()
               App.printUnique(App.cats)
                successCallback(App.events)
            //  successCallback([{ title: "Slow Flow Mindful Yoga" , start: "2020-02-07T19:30:00+00:00" }])
              } 
      //end App.Cal{}     
      })


    //this.getEvents()
    this.renderCal()
    this.addEventListeners();
    }


  addEventListeners(){
    const App = this
    // App.$selecta.addEventListener('change', function() { // this changes cntx
    //   //console.log(this.options[this.selectedIndex].value)
    //   console.log("change")
    //   App.calendar.rerenderEvents()      // App.FullCalender.render()
    //  })
    App.$categories.addEventListener("change", function() {
     
      let checkboxes = [...this.querySelectorAll("input[type=checkbox")].filter(x => x.checked ).map(x => x.value)
      App.cats = new Set(checkboxes)
      // console.log(App.cats)
      // App.cats = [...checkboxes.values]
      App.calendar.rerenderEvents()  
    })
  }
  
  async getEvents(){
      const App = this
     await fetch(this.proxy+this.origin)
    // await fetch(this.local)
              .then( response => response.text())
              .then( function(data){
                console.log("fetched data ok")
              const xmlDOM = new DOMParser().parseFromString(data, 'text/xml') // DOM tree from XML
              xmlDOM.querySelectorAll("show").forEach(show => { 
              const tags = []
              $(show).find("tag").get().forEach(tag => {
                tags.push(tag.textContent)
              })
              const category = show.querySelector("event_category").textContent
              App.cats.add(category)
              const showObj = {
                id: show.getAttribute("id"),
                title: show.querySelector("name").childNodes[1].nodeValue, // title: show.getElementsByTagName("name")[0].childNodes[1].nodeValue,
                start: show.querySelector("opening_time_iso").textContent,
                url: show.querySelector("url").textContent.split("event")[0],
                classNames: [...tags],
                extendedProps: {
                  description: show.querySelector("description").textContent,
                  category, // k+v
                  images: {
                    thumb: show.querySelector("url[size='thumb']").innerHTML,
                    medium: show.querySelector("url[size='medium']").innerHTML,
                    large: show.querySelector("url[size='large']").innerHTML
                  }
                }

              }
              console.log(showObj)
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
            
              if(App.checkFavourites(App.favourites, info.event.id)){
                console.log("true")
              //  App.deleteEvent(info.event.id)
              }else{
                console.log(App)
                App.addEvent(obj)
              }
         

            })


          
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

          console.log("Event Id: "+info.event.id)

    
          return false
        }

    printCheckBoxes(x){

      $('<input />', {
        'type': 'checkbox',
        'value': x,
        
        'name': 'someName'
    }).after(x).appendTo(this.$categories);
      // console.log(cb)
      // .append(cb)

 
    }
    printUnique(arr){
      
      // let unique = [...new Set(arr)]; 
      // console.log(unique)

      this.cats.forEach( x =>  {
        $('<input />', {
          'type': 'checkbox',
          'value': x,
          // 'checked': 'checked',
          'name': 'someName'
      }).prop("checked", true) 
        .wrap('<label class="mr-2"></label>').closest('label').append('<span class="ml-2">'+x+'</span>').appendTo(this.$categories);
        });
     


    }
      
    renderCal(){

          this.calendar.render()
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