export const categories = new Map
export default async function getEvents(){
  let URL = window.location.href
  let local = URL.substring(0, URL.lastIndexOf("/") + 1) + "shows.xml"; 
  const events = []
  //  await fetch(this.proxy+this.origin)
  await fetch(local)
       .then( response => response.text())
       .then( function(data){
       // console.log("fetched data ok")
       
       const xmlDOM = new DOMParser().parseFromString(data, 'text/xml') // DOM tree from XML
       xmlDOM.querySelectorAll("show").forEach(show => { 
         const tags = []
         $(show).find("tag").get().forEach(tag =>  tags.push(tag.textContent) )
         
         let category = show.querySelector("event_category").textContent
         if(category.toLowerCase().includes("children") || category.toLowerCase().includes("workshop")) {
           category = "Children"
         }
         if(!categories.has(category)){
           categories.set(category, true)
         }
         
         const showObj = {
           id: show.getAttribute("id"),
           title: show.querySelector("name").childNodes[1].nodeValue, // title: show.getElementsByTagName("name")[0].childNodes[1].nodeValue,
           start: show.querySelector("opening_time_iso").textContent,
           url: show.querySelector("url").textContent.split("event")[0],
           // classNames: [...tags],
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
        //  console.log(showObj.extendedProps.description)
     events.push(showObj)
     })
     console.log(events)
   })
   // .catch()

   return events
 }

