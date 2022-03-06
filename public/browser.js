
let buttonUl = document.querySelector('.ulClass')
let formClass = document.querySelector ('.formClass')
let fieldClass  = document.querySelector('.fieldClass')

buttonUl.addEventListener('click', buttonFunction)
formClass.addEventListener('submit',formFunction)

function itemTemplate (item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div >
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}
//initiazion of html
let myHTML = items.map(function(item){
   return itemTemplate (item)
}).join('')
buttonUl.insertAdjacentHTML('beforeend',myHTML)

//create item
function formFunction (e) {
    e.preventDefault()
    const item = e.target
    axios.post('/create-item', {text:fieldClass.value}).then(function(response){
        //create html
        buttonUl.insertAdjacentHTML('beforeend', itemTemplate(response.data))
        fieldClass.value=""
        fieldClass.focus()
       }).catch(function(){
           console.log('please try again')
       })
}
//edit and delete
function buttonFunction (e) {

    const buttoncheck = e.target
    
    if (buttoncheck.classList[0] === 'edit-me' ) {
        let userEdit  = prompt ("enter your edited text",buttoncheck.parentElement.parentElement.querySelector(".item-text").innerHTML)
        //axios is for jumping the function from browser env to nodejs env 
        if (userEdit){
           /*ni buat server*/ axios.post('/update-item', /*for sending which data send to db */{text: userEdit, id: buttoncheck.getAttribute("data-id")}).then(function(){
              /*ni buat browser*/  buttoncheck.parentElement.parentElement.querySelector(".item-text").innerHTML = userEdit
               }).catch(function(){
                   console.log('please try again')
               })
        }
     }

    else if (buttoncheck.classList[0]==='delete-me'){
        
        if (confirm('are you sure?')) {
            
            axios.post('/delete-item', {id: buttoncheck.getAttribute("data-id")}).then(function(){
                buttoncheck.parentElement.parentElement.remove()
               }).catch(function(){
                   console.log('please try again')
               })
               
            }
    }
}


