import * as taskDelete from "../Task DeleteEdit/taskDelete.js"
import * as taskEdit from "../Task DeleteEdit/taskEdit.js"


const subtaskList = document.querySelector('#task-list')

const taskName = document.querySelector('#task-name')

//renders an array of subtask objects
function renderSubtasks(subtasks) {
    console.log(subtasks)
    subtasks.forEach(subtask => {
        renderSubtask(subtask)
    })
}


//takes single task obj
function renderSubtask(subtask) {
    const li = document.createElement('li')
    li.innerText = subtask.content
    li.setAttribute('task-id', '1') //dummy value for now
    li.setAttribute('data-draggable', 'item')
    li.setAttribute('draggable', 'true')
    li.textContent = subtask.content
    taskDelete.addTaskDeleteButton(li, subtask)
    taskEdit.addTaskEditButton(li)
    subtaskList.append(li)
}


function clearTasks(){
    subtaskList.innerHTML = ``
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
    let subtasks = Array.from(subtaskList.children).map(item => {
        return item.innerText
    })
    if (localStorage.getItem("selected_task") === "0") {
        saveNewTask(subtasks) //this will go in CRUD folder
    }
    else {
        updateExistingTask(subtasks) //this goes in CRUD folder
    }
}


export {renderSubtask, renderSubtasks, saveBoard, newBoard, 
    addSubtasks, addTaskName, clearTasks}