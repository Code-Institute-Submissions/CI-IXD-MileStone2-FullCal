export const categories = new Map
export default async function getEvents(){
  let URL = window.location.href
  console.log(URL)
  let local = URL.substring(0, URL.lastIndexOf("/") + 1) + "shows.xml"; 
  const events = []
  //  await fetch(this.proxy+this.origin)
  await fetch(local)
       .then( response => response.text())
       .then( function(data){
       const xmlDOM = new DOMParser().parseFromString(data, 'text/xml') // DOM tree from XML
       xmlDOM.querySelectorAll("show").forEach(show => { 
         let category = show.querySelector("event_category").textContent
         if(category.toLowerCase().includes("child") || category.toLowerCase().includes("kid")) {
           category = "Children"
         }
         if(category.toLowerCase().includes("workshop") || category.toLowerCase().includes("talk")){
           category = "Workshops"
         }
         if(category.toLowerCase().includes("trad") || category.toLowerCase().includes("jazz") || category.toLowerCase().includes("music")){
           category = "Music"
          }
        if(category.toLowerCase().includes("drama") || category.toLowerCase().includes("theatre")){
        category = "Theatre"
        }
         if(!categories.has(category)){
           categories.set(category, true)
         }
         const showObj = {
           id: show.getAttribute("id"),
           title: show.querySelector("name").childNodes[1].nodeValue,
           start: show.querySelector("opening_time_iso").textContent,
           url: show.querySelector("url").textContent.split("event")[0],
           extendedProps: {
             description: show.querySelector("description").textContent.replace("<![CDATA[", "").replace(/<\/?\w*\b[^>]*>/ig, '').replace("]]>", ""),
             category, // k+v
             images: {
               thumb: show.querySelector("url[size='thumb']").innerHTML,
               medium: show.querySelector("url[size='medium']").innerHTML,
               large: show.querySelector("url[size='large']").innerHTML
             }
           }
         }
         let jdata = JSON.stringify(showObj)
         showObj.extendedProps.jdata = jdata
     events.push(showObj)
     })
     console.log(events)
   })
   // .catch()

   return events
 }

