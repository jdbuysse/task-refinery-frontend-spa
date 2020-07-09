import * as taskDelete from "../Task DeleteEdit/taskDelete.js"
import * as taskEdit from "../Task DeleteEdit/taskEdit.js"
import * as create from "../CRUD/create.js"

const subtaskList = document.querySelector('#task-list')

const taskName = document.querySelector('#task-name')

//renders an array of subtask objects
function renderSubtasks(subtasks) {
    subtasks.forEach(subtask => {
        renderSubtask(subtask)
    })
}


//takes single task obj
function renderSubtask(subtask) {
    console.log('subtask', subtask)
    const li = document.createElement('li')
    li.innerText = subtask.content
    li.setAttribute('task-id', '1') //dummy value for now
    li.setAttribute('data-draggable', 'item')
    li.setAttribute('draggable', 'true')
    //li.textContent = subtask.content
    taskDelete.addTaskDeleteButton(li, subtask)
    taskEdit.addTaskEditButton(li)
    subtaskList.append(li)
}


function clearTasks(){
    subtaskList.innerHTML = ``
    taskName.innerHTML = ``
}

function addTaskName(name){
    taskName.textContent = name
}

function addSubtasks(subtasks){
    subtasks.forEach(sub => {
        renderSubtask(sub)
    })
}

function newBoard(){
    localStorage.setItem("selected_task", 0) //maybe needs to be string?
}


function saveBoard(){

    if (localStorage.getItem("selected_task") === "0") {
        //console.log("saving new task", taskName.textContent)
        create.saveNewTask(taskName.textContent) //this will go in CRUD folder
        
    }
    else {
        updateExistingTask(subtasks) //this goes in CRUD folder
    }
}

function saveBoardSubtasks(){
    console.log('saving subtasks')
    let subtasks = Array.from(subtaskList.children).map(item => {
        return item.innerText.slice(0, -5)
    })
    create.persistSubtasks(subtasks)
}


export {renderSubtask, renderSubtasks, saveBoard, newBoard, 
    addSubtasks, addTaskName, clearTasks, saveBoardSubtasks}