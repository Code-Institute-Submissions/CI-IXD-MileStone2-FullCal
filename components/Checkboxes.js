import {categories} from "./Events.js"
import {calendar} from "../app/index.js"


export class Category{

  constructor(){
    this.categories = categories
    // this.printed = false
    this.$checkboxes = document.querySelector("#checkboxes")
    this.$checkAll = document.querySelector("#checkAll")
    this.checkboxes = [...this.$checkboxes.querySelectorAll("input[type=checkbox]")].slice(1)
    this.init()
  }
 init() {
  // if (this.printed == false) {
      this.categories.forEach( (v, k) =>  {
      $('<input />', {
        'type': 'checkbox',
        'value': k,
        'id' : k,
        'class' : 'badgebox',
        'name': 'someName'
      })
      .prop("checked", v) 
      .wrap(`<label class="btn btn-sm btn-${k}" for="${k}"></label>`)
      .closest('label')
      .prepend(`${k}`)
      .append(`</span><span class="badge">&check;</span>`)
      .appendTo(this.$checkboxes);
      })
      this.printed = true
    // }
  }
//<input type="checkbox" id="default" class="badgebox">  //<span class="badge">&check;</span></label>
// <label for="default" class="btn btn-default">Default 


 checkboxListeners(){
  // const this.$checkboxes = document.querySelector("#checkboxes")
  let _this = this
  this.$checkboxes.addEventListener("change", function(event) {
    
    const clicked = event.target.closest("input[type=checkbox]")
    const checkboxes = [...this.querySelectorAll("input[type=checkbox]")].slice(1)
    _this.categories.clear()

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
      checkboxes.forEach(x => _this.categories.set(x.value, x.checked) )
    }
      
    function checkAll(){
      $("#checkAll").prop("indeterminate", false)
      $("input:checkbox").prop("checked", true)
      checkboxes.forEach(x => _this.categories.set(x.value, true) )
    }  

    function unCheckAll(){
      $("#checkAll").prop("indeterminate", false)
      $("input:checkbox").prop("checked", false)
      checkboxes.forEach(x => _this.categories.set(x.value, false) )
    }  
    
    calendar.rerenderEvents()  // Manual trigger untriggered?
  
  })
  }
    
    
}