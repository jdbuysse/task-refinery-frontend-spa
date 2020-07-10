import * as taskSelection from "../Task Selection/selector.js"
import * as dragging from "../Dragging/dragging.js"
import * as submissionForm from "../Task Submission Form/submissionForm.js"
import * as login from "../Auth Forms/loginForm.js"
import * as createAccount from "../Auth Forms/createAccountForm.js"
import * as taskBoard from "../Task Board/taskBoard.js"

//let tasksURL = `http://localhost:8001/tasks/`
const userID = localStorage.getItem("user_id")
const hero = document.querySelector('#hero')
const startHeader = document.querySelector('#start-menu')
const taskName = document.querySelector('#task-name')
const loginForm = document.querySelector('#login-div')
const createAccountForm = document.querySelector('#create-account')
const taskInput = document.querySelector('#task-input-form')
const clear = document.querySelector('#clear-board')
const save = document.querySelector('#save-board')
const saveSubtasks = document.querySelector('#save-board-subtasks')
const myBoards = document.querySelector('#my-boards')
const createAccountDiv= document.querySelector('#create-account-div')
const boardToggle = document.querySelector('#challenge-header')

taskInput.addEventListener('submit', (event) => submissionForm.captureFormEvent(event))
loginForm.addEventListener("submit", login.handleLogin)
createAccountForm.addEventListener("submit", createAccount.createAccount)

clear.addEventListener("click", taskBoard.clearTasks)


save.addEventListener("click", taskBoard.saveBoard)
saveSubtasks.addEventListener("click", taskBoard.saveBoardSubtasks)
const routes = {
    '/': homePage,
    'start': start,
    'login' : loginRoute,
    'board' : boardRoute
}

if (userID){
    fetchTasks()
}
else{
    taskName.innerText = "You don't have any tasks yet"
    myBoards.innerHTML = `<a href='#login'>Login/Create Account</a>`
}

function homePage(){
    startHeader.className = "hide"
    hero.className = "show"
}

function start(){
    hero.className = "hide"
    startHeader.className = "show"
}

function loginRoute(){
    loginForm.className ="show"
    createAccountDiv.className = "show"
}

function boardRoute(){
    //there's not a quick way to toggle with the routes approach
    boardToggle.className = "show"
    
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