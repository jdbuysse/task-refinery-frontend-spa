import * as taskSelection from "../Task Selection/selector.js"
import * as dragging from "../Dragging/dragging.js"
import * as submissionForm from "../Task Submission Form/submissionForm.js"
import * as login from "../Auth Forms/loginForm.js"
import * as createAccount from "../Auth Forms/createAccountForm.js"

//let tasksURL = `http://localhost:8001/tasks/`
const userID = localStorage.getItem("user_id")
const hero = document.querySelector('#hero')
const startHeader = document.querySelector('#start-menu')
const taskName = document.querySelector('#task-name')
const loginForm = document.querySelector('#login')
const createAccountForm = document.querySelector('#create-account')
const taskInput = document.querySelector('#task-input-form')


//stopped before implementing create account
taskInput.addEventListener('submit', (event) => submissionForm.captureFormEvent(event))
loginForm.addEventListener("submit", login.handleLogin)
createAccountForm.addEventListener("submit", createAccount.createAccount)

const routes = {
    '/': homePage,
    'start': start
}

if (userID){
    fetchTasks()
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
    const page = routes[path]
    if (page){
        page()
    }
    else {
        console.log('404')
    }
}

function fetchTasks() {
    let tasksURL = `http://localhost:8000/users/${userID}`
    fetch(tasksURL)
    .then(response => response.json())
    .then(result => handleData(result))
    .then(dragging.makeDraggable())
}


function handleData(data){
    taskSelection.createTaskDropdown(data.tasks)
}


window.addEventListener('hashchange', router)
window.addEventListener('load', router)

export {fetchTasks}