export default function Event(event) {
  // console.log(event)
  return `
  <div class="row border-bottom">
    <div class="col">
      <span>${event.index}</span>
      <span>Event ID: ${event.id}</span>
      <h6>${event.title}</h6>
      <p>${event.extendedProps.description.slice(0, 300)}...</p>
      <p>${event.start}
      |
      <span class="fav" data-event='${JSON.stringify(event)}'>
      <img class="heart" src="https://icon.now.sh/heart/ccc">
      Add To Favorites
    </span>
    </p>
    </div>
  </div>`
}


/*

const showObj = {
           id: show.getAttribute("id"),
           title: show.querySelector("name").childNodes[1].nodeValue, // title: show.getElementsByTagName("name")[0].childNodes[1].nodeValue,
           start: show.querySelector("opening_time_iso").textContent,
           url: show.querySelector("url").textContent.split("event")[0],
           // classNames: [...tags],
           extendedProps: {
             description: show.querySelector("description").textContent,
             category, // k+v
             images: {
               thumb: show.querySelector("url[size='thumb']").innerHTML,
               medium: show.querySelector("url[size='medium']").innerHTML,
               large: show.querySelector("url[size='large']").innerHTML
             }
             */