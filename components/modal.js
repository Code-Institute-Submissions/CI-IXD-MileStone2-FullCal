export default function renderEventModal(info){
       
          // console.log(App)
          const obj = _this.events.filter(x => x.id == info.event.id)[0] //cyclical object returning an array
          
          // this.$favIcon.addEventListener('click', function(){
            
          //     if(App.checkFavourites(App.favourites, info.event.id)){
          //       console.log("true")
          //     //  App.deleteEvent(info.event.id)
          //     }else{
          //       console.log(App)
          //       _this.addEvent(obj)
          //     }
         

          //   })
          
          $('#modalTitle').html(info.event.title)
          $('#modalBody').html(`
            <img src="${info.event.extendedProps.images.medium}" style="object-fit: cover; object-position: 20% 10%;" alt="${info.event.title}" />
            <div class="card-body">
            ${info.event.extendedProps.description} 
            </div>
          `);
          $('.favourite').attr('data-event', JSON.stringify(obj))
          $('.favourite').html(`${_this.favourites.some(x => x.id == info.event.id) ? "Remove From Favourites" : "Add To Favourites"}`)
          $('#eventUrl').attr('href',info.event.url)
          $('#fullCalModal').modal()

          console.log("Event Id: "+info.event.id)

          return false
        }