class App {
  constructor() {
    console.log('app works!')  
    //this.notes = []
    this.events = JSON.parse(localStorage.getItem("events")) || []
    this.eventsList = []
    this.origin = "https://wexfordartscentre.ticketsolve.com/shows.xml"
    this.proxy  = "https://cors-anywhere.herokuapp.com/"


    //this.getEvents()
    this.renderCal()
    }
  // $.ajax({
  //   url: proxy+origin,
  //   datatype: 'xml'
  // })
  //   .done(function(response) {
  //     console.log("ok")
  //     $(response).find("show").each((index, show) => {
  //        const tags = []
  //        $(show).find("tag").get().forEach(tag => tags.push(tag.textContent))
  //        const showObj = {
  //         id: show.getAttribute("id"),
  //         title: show.querySelector("name").childNodes[1].nodeValue,
  //         // title: show.getElementsByTagName("name")[0].childNodes[1].nodeValue,
  //         start: show.querySelector("opening_time_iso").textContent,
  //         url: show.querySelector("url").textContent.split("event")[0],
  //         classNames: [...tags],
  //         extendedProps: {
  //           description: show.querySelector("description").textContent,
  //           images: {
  //             thumb: show.querySelector("url[size='thumb']").innerHTML,
  //             medium: show.querySelector("url[size='medium']").innerHTML,
  //             large: show.querySelector("url[size='large']").innerHTML
  //           }
  //         }

  //        }
  //        console.log(showObj)
  //        eventsList.push(showObj)
  //       });
  // }).fail(function (jqXHR, textStatus, error) {
  //   console.log(`GET error: ${error}` + jqXHR.responseJSON + textStatus); })// no returned error as fails at browser
  //   .always(
      
      
      
      renderCal(){
      // if (eventsList.length > 0) {

      var calendarEl = document.getElementById('calendar') // needs to be here for event delegation?
      var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'en-gb',
          plugins: [ 'dayGrid', 'list', 'bootstrap'],
          themeSystem: 'bootstrap',   //defaultView: 'listWeek',
       

          eventRender: function(info) {
            //var tooltip = new Tooltip(info.el, {
            // https://stackoverflow.com/questions/56866108/tooltips-not-working-in-fullcalendar-when-i-use-bootstrap-css
            $(info.el).tooltip({  
              title: `${info.event.title}\n@ ${info.event.start.toLocaleTimeString({},
                {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'} // AM || PM
              )}`,
              placement: 'top',
              trigger: 'hover',
              container: 'body'
            });
            //console.log(info.event.title)
          },
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

          events: this.eventsList
      })
      calendar.render();
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

new App();