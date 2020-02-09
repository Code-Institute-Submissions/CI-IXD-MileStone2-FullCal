class AsyncConst {
constructor() {
   return (async () => {
   const favourites = JSON.parse(localStorage.getItem("favourites")) || []
 
    // this.origin = "https://wexfordartscentre.ticketsolve.com/shows.xml"
    // this.proxy  = "https://cors-anywhere.herokuapp.com/"
    // this.proxy = "https://cors.x7.workers.dev/"
    let URL = window.location.href
    const local = URL.substring(0, URL.lastIndexOf("/") + 1) + "shows.xml";
    let cats = false
    const categories = new Map
    const $calendar = document.querySelector("#calendar")
    const $favIcon = document.querySelector(".favourite")
    const $selecta = document.querySelector("#color_selector")
    const $checkAll = document.querySelector("#checkAll")
    const $checkboxes = document.querySelector("#checkboxes")
    const sources = {
      wac: { 
            events: function(fetchInfo,successCallback){
            let result = events
            // printCheckboxes()
            successCallback(result) 
            }
           },
      favs: {
            events:  function(fetchInfo,successCallback){
            const ents = [{"id":"873612231","title":"Besties, Dark Waters & What Next Mother- Film Premiere","start":"2020-02-07T19:30:00+00:00","url":"https://wexfordartscentre.ticketsolve.com/shows/873612231/","classNames":["presentationcentre","wexfordartscentre"],"extendedProps":{"description":"\n          <p><span>Three New Short Wexford Films to be screened in aid of FOCUS Ireland. The World Premiere of a new short film,&nbsp;<strong>BESTIES</strong>, featuring members of the Enniscorthy Drama Group, will be shown in the Presentation Centre, on Friday 7<sup>th</sup>&nbsp;of February, at 7.30pm in aid of FOCUS Ireland.The cast includes, Karen Franklin, Jennafer Boyd, Fintan Kelly, Maeve Ennis, Summer Keane and Jennifer Kelly. Written and directed by Dick Donaghue and produced by Jer Ennis. Filmed in Enniscorthy.</span></p>\n<p><span>Two other short films will also be premiered. </span><strong><span>DARK WATERS</span></strong><span>, starring Sharon Griffiths with David Parsons which was filmed in Bridgetown. </span><strong><span>WHAT NEXT MOTHER</span></strong><span>, a comedy, filmed in Bunclody. Starring Mary Gibson, Elaine Jordan, Niall Kennedy and Lauren Jordan, will feature on the night also.</span></p>\n<p><span>All proceeds will be donated to FOCUS Ireland, the aim of the night is to shine a light on the homelessness issue, raise much needed funds and also to show off the writing and acting talent in our locality</span></p>\n<p><strong>&nbsp;</strong></p>\n<p><strong>&nbsp;</strong></p>\n        ","category":"Film","images":{"thumb":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/42108e2ccaa9cbeaed96ff70f4f71abb3e953a28352072c0afd65721f1c07e2b","medium":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/db985b134426e3a0a042b6dc139e02b7924a669da4f6434c9c9c4b9553d63a33","large":"https://dc40ra2rfm3rp.cloudfront.net/as-assets/variants/LXoGhVKjEdUogGVvXQNMp1UB/d82b4c5034021c15162868846a860fc142237fb62f146ef228d6181ef8a17941"}}}]
            console.log(ents)
            successCallback(ents)
            }
          },
    }
    const events = await getEvents(local)

    let calendar = new FullCalendar.Calendar($calendar, {
        locale: 'en-gb',
        plugins: [ 'dayGrid', 'list', 'bootstrap'],
        customButtons: {
          favourites: {
            text: 'Favourites!',
            click: function(){
              var eventSources = calendar.getEventSources()
              eventSources[0].remove()
              calendar.addEventSource( sources.favs )
              
            }
          }
        },
        themeSystem: 'bootstrap', 
        header: {
          right: 'favourites today prev,next ',
          // center: 'title',
          // right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        // defaultView: 'list',
        eventRender: function (info) {
            return categories.get((info.event.extendedProps.category))
            // return true
          },
        eventClick: function(info){
          info.jsEvent.preventDefault() // don't let the browser navigate
          renderEventModal(info)
        },
          eventSources: [sources.wac]
              
      //end App.Cal{}     
      })

    async function getEvents(local){
      // const App = this
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
          events.push(showObj)
          })
        })
        // .catch()
  
            return events
      }
            
            
            
            
            calendar.render()
            // addEventListeners()
            console.log(events)
            console.log()
            
            return this
            
       
      //constructor
      })()
    }
}


new AsyncConst()

  // function addEventListeners(){
  //   // const App = this

  //   $checkboxes.addEventListener("change", function(event) {
      
  //     const clicked = event.target.closest("input[type=checkbox]")
  //     const checkboxes = [...this.querySelectorAll("input[type=checkbox]")].slice(1)
  //     categories.clear()

  //     if(clicked.value != "all"){
  //       const numberChecked = checkboxes.filter(input => input.checked).length
  //       switch(numberChecked){
  //         case 0 :
  //           unCheckAll()
  //           break
  //         case checkboxes.length : 
  //           checkAll()
  //           break
  //         default:
  //           someCheck()
  //       }
  //     }else{
  //       clicked.checked == true ? checkAll() : unCheckAll()
  //     }

  //     function someCheck(){
  //       $("#checkAll").prop("indeterminate", true)
  //       $("input:checkbox").prop("checked", $(this).checked)
  //       checkboxes.forEach(x => App.categories.set(x.value, x.checked) )
  //     }
        
  //     function checkAll(){
  //       $("#checkAll").prop("indeterminate", false)
  //       $("input:checkbox").prop("checked", true)
  //       checkboxes.forEach(x => App.categories.set(x.value, true) )
  //     }  

  //     function unCheckAll(){
  //       $("#checkAll").prop("indeterminate", false)
  //       $("input:checkbox").prop("checked", false)
  //       checkboxes.forEach(x => App.categories.set(x.value, false) )
  //     }  
      
  //     calendar.rerenderEvents()  

  //   })

  // }
  

    //   getFavourites(){
    //     console.log(this.favourites)
    //       return this.favourites
    //   }

    //   checkFavourites(favourites, event) {  // returns T/F
    //     return favourites.some(favourite => favourite.id === event.id) // given story obj is in favs
    // }

    // renderEventModal(info){
    //       const App = this
    //       const obj = App.events.filter(x => x.id == info.event.id)[0] //cyclical object returning an array
          
    //       this.$favIcon.addEventListener('click', function(){
            
    //           if(App.checkFavourites(App.favourites, info.event.id)){
    //             console.log("true")
    //           //  App.deleteEvent(info.event.id)
    //           }else{
    //             console.log(App)
    //             App.addEvent(obj)
    //           }
         

    //         })
          
    //       $('#modalTitle').html(info.event.title)
    //       $('#modalBody').html(`
    //         <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
    //         <div class="card-body">
    //         ${info.event.extendedProps.description} 
    //         </div>
    //       `);
    //       $('.favourite').attr('data-event', JSON.stringify(obj))
    //       $('.favourite').html(`${App.favourites.some(x => x.id == info.event.id) ? "Remove From Favourites" : "Add To Favourites"}`)
    //       $('#eventUrl').attr('href',info.event.url)
    //       $('#fullCalModal').modal()

    //       console.log("Event Id: "+info.event.id)

    //       return false
    //     }



    // function printCheckboxes(){
    //   if (this.cats == false) {
    //       this.categories.forEach( (v, k) =>  {
    //       $('<input />', {
    //         'type': 'checkbox',
    //         'value': k,
    //         'name': 'someName'
    //       })
    //       .prop("checked", v) 
    //       .wrap('<label class="mr-2"></label>')
    //       .closest('label')
    //       .append('<span class="ml-2">'+k+'</span>')
    //       .appendTo(this.$checkboxes);
    //       })
    //       this.cats = true
    //   }
    // }



    // // Methods
    // saveEvents(){
    //   console.log("saved")
    //   localStorage.setItem("favourites", JSON.stringify(this.favourites))
    //   console.log("Current Favs:")
    //   console.log(this.favourites)
      
    // }



    // addEvent(newEvent){ // destructor note{}
    //    console.log("passed: "+JSON.stringify(newEvent))

    //       newEvent.extendedProps.isFavourited = "true"
    //       //console.log(JSON.stringify(this.favourites))
    //       this.favourites = [...this.favourites, newEvent ] //nesting! [] {...newEvent, isFavourited: "true"}
    //       console.log(this.favourites)
    //       //console.log(this.notes)
    //       this.render()
    //   }


    //   deleteEvent(eid){
    //     // console.log("Delete Event : " + String(id ))
    //     // console.log(Number(id))
    //     this.favourites = this.favourites.filter( ent => ent.id !== eid)

    //     this.render()
    //   }

      // render(){
      //   this.saveEvents()
      // }
   


// new App()
          // eventClick: 



      
      //   });
 
      //   
      // });