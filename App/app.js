import * as taskSelection from "../Task Selection/selector.js"
import * as dragging from "../Dragging/dragging.js"


let tasksURL = `http://localhost:8001/tasks/`
const userID = localStorage.getItem("user_id")
const hero = document.querySelector('#hero')
const startHeader = document.querySelector('#start-menu')

const routes = {
    '/': homePage,
    'start': start
}

if (userID){
    tasksURL = `http://localhost:8001/users/${userID}`
}
else{
    taskName.innerText = "You don't have any tasks yet"
}

function homePage(){
    console.log('home')
    startHeader.className = "hide"
    hero.className = "show"
}

function start(){
    console.log('start')
    hero.className = "hide"
    startHeader.className = "show"
    
}

function router(event){
    const path = window.location.hash.split('#')[1] || "/"
    console.log(path)
    const page = routes[path]
    console.log(page)
    if (page){
        page()
    }
    else {
        console.log('404')
    }
}

fetch(tasksURL)
    .then(response => response.json())
    .then(result => handleData(result))
    .then(dragging.makeDraggable())

function handleData(data){
    taskSelection.createTaskDropdown(data.tasks)
}


window.addEventListener('hashchange', router)
window.addEventListener('load', router)