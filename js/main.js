'use strict'
class App {
  constructor() {
    console.log('app works!')  
    //this.notes = []
    this.events = JSON.parse(localStorage.getItem("events")) || []
    this.eventsList = []
    this.origin = "https://wexfordartscentre.ticketsolve.com/shows.xml"
    this.proxy  = "https://cors-anywhere.herokuapp.com/"

    this.$calendar = document.querySelector("#calendar")

    //this.getEvents()
    this.renderCal()

    }
  
    async getEvents(){
      //console.log(this)
      const App = this
      $.ajax({ // .done .fail .always
      url: this.proxy+this.origin,
      datatype: 'xml'
      }).done(function(response) {
        const eList = []//this.eventsList
        console.log("ok")
        $(response).find("show").each((index, show) => {
          const tags = []
          $(show).find("tag").get().forEach(tag => tags.push(tag.textContent))
          const showObj = {
            id: show.getAttribute("id"),
            title: show.querySelector("name").childNodes[1].nodeValue,
            // title: show.getElementsByTagName("name")[0].childNodes[1].nodeValue,
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
          
          //console.log(this) // this = Ajax Obj
          eList.push(showObj)
          //console.log(this.eventsList.length())
          })
          // console.log(this) // ajax promise
        
          //App.renderCal(eList)
      })
      //.fail(function (jqXHR, textStatus, error) { console.log(`GET error: ${error}` + jqXHR.responseJSON + textStatus); })// no returned error as fails at browser
      //.always(eList) 

    }
      
    lprint(stuff){
      console.log(stuff);
    }
      
      async renderCal(eventsList){

      //const calendarEl = this.$calendar
      const App = this
      console.log('constructor ' + JSON.stringify(App))

      let data = await this.getEvents();
     
      return data;

      // var calendar = new FullCalendar.Calendar(this.$calendar, {
        
      //   locale: 'en-gb',
      //     plugins: [ 'dayGrid', 'list', 'bootstrap'],
      //     themeSystem: 'bootstrap',   //defaultView: 'listWeek',
       
      //     eventRender: function(info) {
      //       $(info.el).tooltip({  
      //         title: `${info.event.title}\n@ ${info.event.start.toLocaleTimeString({},
      //           {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'} // AM || PM
      //         )}`,
      //         placement: 'top',
      //         trigger: 'hover',
      //         container: 'body'
      //       });
      //       //console.log(info.event.title)
      //     },
      //     //eventCLick

      //     events: async function(info,successCallBack){
      //       let data = App.getEvents()
      //       let result = await data 
      //       alert(JSON.stringify(result)).successCallBack()
      //           //App.lprint(result)
      //       }

      //   })
              
              
            

          // function(getEvents,
          //                  successCallBack(eList),
          //                   failureCallBack: function() { // callback if there's an error
          //                     alert("error");
          //                   })),
        
     // console.log(data)
      // await calendar.render();

     }


    // Methods
    saveEvents(){
      localStorage.setItem("events", JSON.stringify(this.events))
    }



    addEvent(newEvent){ // destructor note{}
          // const newEvent = {
          //     title,//title: note.title,
          //     text,//text: note.text,
          //     color: "white",
          //     id: this.notes.length > 0 ? this.notes[this.notes.length -1].id + 1 : 1
          // }
          this.events = [...this.events, newEvent]
          //console.log(this.notes)
          this.saveEvents()
      }





}

new App()
          // eventClick:  function(info) {
          //   const obj = eventsList.find(x => x.id == info.event.id) //cyclical object 
            
          //   document.querySelectorAll('.favourite').forEach(favouriteButton => {
          //     favouriteButton.addEventListener('click', function(){
                
          //       console.log(obj) //(this.dataset.event)
          //       this.addEvent(obj)

          //     })
          //   })
          //   //console.log(obj)
          //   info.jsEvent.preventDefault() // don't let the browser navigate
          //   $('#modalTitle').html(info.event.title)
          //   $('#modalBody').html(`
          //     <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
          //     <div class="card-body">
          //     ${info.event.extendedProps.description} 
          //     </div>
          //   `);
          //   $('.favourite').attr('data-event', JSON.stringify(obj))
          //   $('#eventUrl').attr('href',info.event.url)
          //   $('#fullCalModal').modal()
          //   return false
          // },