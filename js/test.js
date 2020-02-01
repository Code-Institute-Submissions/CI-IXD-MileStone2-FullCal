// Quokka test
function firstFunc (){
  return new Promise(
    function(resolve,reject){
      resolve('Your cat is ')
    }
  )
}

firstFunc().then(val => console.log(val + "crazy") ) 