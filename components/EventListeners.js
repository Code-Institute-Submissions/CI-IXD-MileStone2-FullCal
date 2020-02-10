  import {categories} from "../components/Events.js"
  import {calendar} from "../js/main.js"
  export default function addEventListeners(){
    const $checkboxes = document.querySelector("#checkboxes")
    const $checkAll = document.querySelector("#checkAll")
    $checkboxes.addEventListener("change", function(event) {
      
      const clicked = event.target.closest("input[type=checkbox]")
      const checkboxes = [...this.querySelectorAll("input[type=checkbox]")].slice(1)
      categories.clear()

      if(clicked.value != "all"){
        const numberChecked = checkboxes.filter(input => input.checked).length
        switch(numberChecked){
          case 0 :
            unCheckAll()
            break
          case checkboxes.length : 
            checkAll()
            break
          default:
            someCheck()
        }
      }else{
        clicked.checked == true ? checkAll() : unCheckAll()
      }

      function someCheck(){
        $("#checkAll").prop("indeterminate", true)
        $("input:checkbox").prop("checked", $(this).checked)
        checkboxes.forEach(x => categories.set(x.value, x.checked) )
      }
        
      function checkAll(){
        $("#checkAll").prop("indeterminate", false)
        $("input:checkbox").prop("checked", true)
        checkboxes.forEach(x => categories.set(x.value, true) )
      }  

      function unCheckAll(){
        $("#checkAll").prop("indeterminate", false)
        $("input:checkbox").prop("checked", false)
        checkboxes.forEach(x => categories.set(x.value, false) )
      }  
      
      calendar.rerenderEvents()  

    })

  }