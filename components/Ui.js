import Store from "../js/store.js"
import {calendar, eventSource} from "../calAsKeep/app.js"

export default class UI {
  // UI Class: Handles UI Tasks
  /* event displays/removed show an alert */
  static displayEvents() {
      const events = Store.getFavEvents() //LocalaStorage
      events.forEach( event => UI.addEventToList(event))
  }

  static addEventToList(event) {
    const $list = document.querySelector("#event-list")

    const row = document.createElement("tr")
    row.innerHTML = `
    <td>${event.id}</td>
    <td>${event.title}</td>
    <td>${event.start}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `

    $list.appendChild(row)

  }

  static deleteEventByClick(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove(); // tr not just td
    }

  }

  static deleteEventFromList(eid){
    const $list = document.querySelector("#event-list")
    const cells = [ ...$list.querySelectorAll("td")]
    cells.forEach(cell => {
      if(cell.textContent === eid){
        cell.parentElement.remove()
      }
    })

  }

  static showAlert(message, className){
    const div = document.createElement("div")
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".fc-view-container") // parent
    const table = document.querySelector(".fc-view") // before this child
    container.insertBefore(div, table)
    // Vanish alert < 3secs
    setTimeout( () => document.querySelector(".alert").remove(), 2400 )
  }

  static clearFields() {
    // $('#fullCalModal').modal("toggle")
  }


  static openModal(event, isFavourited=false) {
    
    $('#modalTitle').html(event.title)
    $('#modalBody').html(`
    <img src="${event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${event.title}" />
    <div class="card-body">
    ${event.extendedProps.description} 
    </div>
    `);
    $('.favourite').attr('data-event', event.extendedProps.jdata )
    
    $('.favourite-text').html(`${isFavourited? "Remove from Favourites" : "Add to Favourites" }`)
    $('#eventUrl').attr('href',event.url)
    $('#fullCalModal').modal()

  }

static favsButton(){



  const favToggleButton = document.createElement("input")
  favToggleButton.setAttribute("type", "checkbox")
  favToggleButton.setAttribute("data-toggle", "toggle")
  favToggleButton.setAttribute("data-on", "<i class='fa fa-heart'></i> Favs")
  favToggleButton.setAttribute("data-onstyle", "danger")
  favToggleButton.setAttribute("data-off", "Events")
  favToggleButton.setAttribute("data-offstyle", "primary")
  favToggleButton.id="favToggleButton"
  // document.querySelector(".fc-favsButton-button")
  
  // html body div.container div.row div.col-md-8 div#calendar.fc.fc-ltr.fc-bootstrap div.fc-toolbar.fc-header-toolbar div.fc-right div.btn-group
  const container = document.querySelector("div.fc-toolbar.fc-header-toolbar div.fc-right") // parent
  const prevButton = document.querySelector("div.btn-group") // before this child
  container.insertBefore(favToggleButton, prevButton)
  // const $favToggleButton = document.querySelector("#favToggleButton")
  $("#favToggleButton").bootstrapToggle('off')
  $("#favToggleButton").change(function () {
    var eventSources = calendar.getEventSources()
        eventSources[0].remove()
    if($(this).prop('checked') == true){
      calendar.addEventSource(eventSource.favs)
      calendar.changeView('favsView')
      if(!$("#checkAll").is(':checked')){
        $("#checkAll").trigger("click") // turn on categories for Favs
      }else{
        $("#checkAll").trigger("click")
        $("#checkAll").trigger("click")
      }
    }else{
    //if($(this).prop('checked') == false){
      calendar.today()
      calendar.changeView('listWeek')
      calendar.addEventSource(eventSource.wxac)  //calendar.getEventSourceById(3)
      if($("#checkAll").prop('indeterminate') == true){
        const cboxdiv = document.querySelector("#checkboxes")
        const cboxes = [...cboxdiv.querySelectorAll("input[type=checkbox]")].slice(1)
        cboxes.filter(checkbox => !checkbox.checked).forEach(unchecked => $(unchecked).trigger("click"))
        // event.stopPropagation();
        $("#favToggleButton").bootstrapToggle('off')
      }
    }
  })

 }  


}