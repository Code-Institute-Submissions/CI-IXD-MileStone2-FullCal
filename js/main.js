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
    this.$checkboxes = document.querySelector("#checkboxes")
    this.categories = new Set

    const App = this
    App.calendar = new FullCalendar.Calendar(App.$calendar, { //const calendarEl = this.$calendar
        
      locale: 'en-gb',
        plugins: [ 'dayGrid', 'list', 'bootstrap'],
        themeSystem: 'bootstrap', 
        // defaultView: 'list',

          eventRender: function (info) {
         
            return App.categories.has(info.event.extendedProps.category)? true : false
         
            // return true
            
          },
        eventClick: function(info){
          info.jsEvent.preventDefault() // don't let the browser navigate
          App.renderEventModal(info)
        },
        events:   async function(fetchInfo,successCallback){
              /* event source 1 FETCH */
               await App.getEvents()
               App.printCheckboxes(App.categories)
              successCallback(App.events)
                
              /*
              event source 2
               const ents = [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-07T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}]
              console.log(ents)
              successCallback(ents)
              */


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
    App.$checkboxes.addEventListener("change", function() {
     
      let checkboxes = [...this.querySelectorAll("input[type=checkbox")].filter(x => x.checked ).map(x => x.value)
      App.categories= new Set(checkboxes)

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
              App.categories.add(category)
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


    printCheckboxes(categories){
      this.categories.forEach( x =>  {
        $('<input />', {
          'type': 'checkbox',
          'value': x,
          // 'checked': 'checked',
          'name': 'someName'
      }).prop("checked", true) 
        .wrap('<label class="mr-2"></label>').closest('label').append('<span class="ml-2">'+x+'</span>').appendTo(this.$checkboxes);
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

          newEvent.extendedProps.isFavourited = "true"
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