$(document).ready(function() {
  let eventsList = []
  let origin = "https://wexfordartscentre.ticketsolve.com/shows.xml"
  let proxy  = "https://cors-anywhere.herokuapp.com/"

    function handleErrors(jqXHR, textStatus, errorThrown) {
          console.log(`jqXHR: ${jqXHR},
                       textStatus: ${textStatus}
                       errorThrown: ${errorThrown}`); //jqXHR
     
  }
  // fetch(proxy+origin) //proxy + cors origin
  //     .then(handleErrors)
  //     .then(response => console.log("ok") )
  //     .catch(error => console.log(error) );

  // Can chain .then()/.done()/.fail()/.always() onto $.ajax() 
  // ref: https://stackoverflow.com/questions/16026942/how-do-i-chain-three-asynchronous-calls-using-jquery-promises
  $.ajax({
    url: proxy+origin,
    datatype: 'xml'
  })
    .done(function(response) {
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
         console.log(showObj)
         eventsList.push(showObj)
        });
  }).fail(function (jqXHR, textStatus, error) {
    console.log(`GET error: ${error}` + jqXHR.responseJSON + textStatus); })// no returned error as fails at browser
    .always( function() {
      if (eventsList.length > 0) {
        // eventsList.forEach( event => {
        //   $("#calendar").append(JSON.stringify(event) + "<br/><hr/>")
        // })
      var calendarEl = document.getElementById('calendar') // needs to be here for event delegation?
      var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'en-gb',
          plugins: [ 'dayGrid', 'list', 'bootstrap'],
          themeSystem: 'bootstrap',
          //defaultView: 'listWeek',

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
          eventClick:  function(info) {
            document.querySelectorAll('.favourite').forEach(favouriteButton => {
              favouriteButton.addEventListener('click', function(){console.log(this.dataset.event)})
            })
            const obj = eventsList.find(x => x.id == info.event.id) //cyclical object 
            //console.log(obj)
            info.jsEvent.preventDefault() // don't let the browser navigate
            $('#modalTitle').html(info.event.title)
            $('#modalBody').html(`
              <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
              <div class="card-body">
              ${info.event.extendedProps.description} 
              </div>
            `);
            $('.favourite').attr('data-event', JSON.stringify(obj))
            $('#eventUrl').attr('href',info.event.url)
            $('#fullCalModal').modal()
            return false
          },

          events: eventsList
      })
      calendar.render();
     }
    })
// end doc ready



});



class App {
  constructor() {
    console.log('app works!')  
  }  
}

new App();