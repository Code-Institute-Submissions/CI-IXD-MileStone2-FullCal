import Store from "../js/store.js"
import {calendar, eventSource} from "../app.js/index.js"

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
    
    $('.favourite.btn').html(`${isFavourited? '<i class="fa fa-heart" aria-hidden="true"></i> Favourited' : '<i class="fa fa-heart-o" aria-hidden="true"></i> Favourite' }`)
    $('#eventUrl').attr('href',event.url)
    $('#fullCalModal').modal()

  }

static favsButton(){


  const fcleft = document.querySelector("div.fc-toolbar.fc-header-toolbar div.fc-left") // parent
  let btns = [ ...fcleft.querySelectorAll(".btn") ]
  const innerWidth = window.innerWidth
  if(innerWidth < 765){
   btns = btns.filter(btn => !btn.classList.contains("fc-dayGridMonth-button"))
  }
  console.log(btns)
  const bwrap = document.createElement("div")
  bwrap.classList.add('btn-group')
  btns.forEach(btn => bwrap.append(btn))
  fcleft.appendChild(bwrap)

  document.querySelector(".fc-dayGridMonth-button").textContent = 'Month'
  document.querySelector(".fc-listWeek-button").textContent = 'Week'
  document.querySelector(".fc-listMonth-button").textContent = 'List'

  const favToggleButton = document.createElement("input")
  favToggleButton.setAttribute("type", "checkbox")
  favToggleButton.setAttribute("data-toggle", "toggle")
  favToggleButton.setAttribute("data-on", "<i class='fa fa-heart'></i> Favs")
  favToggleButton.setAttribute("data-onstyle", "secondary")
  favToggleButton.setAttribute("data-off", "Events")
  favToggleButton.setAttribute("data-offstyle", "primary")
  favToggleButton.id="favToggleButton"

  const container = document.querySelector("div.fc-toolbar.fc-header-toolbar div.fc-center") // parent
  container.appendChild(favToggleButton)
  $("#favToggleButton").bootstrapToggle('off')
  $("#favToggleButton").change(function () {
    let eventSources = calendar.getEventSources()
        eventSources[0].remove()
    if($(this).prop('checked') == true){
      calendar.addEventSource(eventSource.favs)
      calendar.changeView('listMonth')
      if(!$("#checkAll").is(':checked')){
        $("#checkAll").trigger("click") // turn on categories for Favs
      }else{
        $("#checkAll").trigger("click")
        $("#checkAll").trigger("click")
      }
    }else{
      calendar.today()
      calendar.changeView('listWeek')
      $(".fc-listMonth-button").remove("btn-active")
      calendar.addEventSource(eventSource.wxac) 
      if($("#checkAll").prop('indeterminate') == true){
        const cboxdiv = document.querySelector("#checkboxes")
        const cboxes = [...cboxdiv.querySelectorAll("input[type=checkbox]")].slice(1)
        cboxes.filter(checkbox => !checkbox.checked).forEach(unchecked => $(unchecked).trigger("click"))
        $("#favToggleButton").bootstrapToggle('off')
      }
    }
    
  })

 }  


}