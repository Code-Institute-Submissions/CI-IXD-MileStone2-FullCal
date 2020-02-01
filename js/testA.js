// Quokka test
console.log(1+2);

this.origin = "https://wexfordartscentre.ticketsolve.com/shows.xml"
this.proxy  = "https://cors-anywhere.herokuapp.com/"

this.$calendar = document.querySelector("#calendar")




this.eList = [1,2,3]


async function getEvents(){
  const App = this
  console.log(this.eList)

  //this.eventsList
  // new Promise((resolve, reject) => {
  //   setTimeout(() => resolve('done'), 1000);  
  // })

  // each Promise 1 resolve 1 reject (info,successCallback,failureCallback)
  // const url = this.proxy+this.origin
  // let URL = window.location.href
  // const url = URL.substring(0, URL.lastIndexOf("/") + 1) + "shows.xml";
  await $.ajax({
    url: this.proxy+this.origin,
    datatype: 'xml'
    })
    .then(function() {
      // return new Promise(
      //   function(resolve,reject){
      //     //resolve('Your cat is ')
      //     resolve(eList) // returns eList   - both seem to resolve/return a value Promise.value 
      //   }
      // )
     // eList = [...eList, 4,5,6]
      console.log(this) // ajax - context changed
      return App.eList // this.eList is undefined
    })


      .then(val => console.log(val + "crazy") ) // https://makandracards.com/makandra/39543-jquery-promises-done-and-then-are-not-the-same
    .then(() => {console.log(App.eList)}).catch(()=> {console.log("failure")});

    return eList

}

async function renderCal(){
  await getEvents()
  console.log("RENDER")
}

renderCal()

/*
      //const eList = []//this.eventsList
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
        
        eList.push(showObj)
        })
        console.log(App.eList) // accessing global scope but can't return it
        //let result = App.eList 
        return App.eList; // return 'value' works??
      })


      */