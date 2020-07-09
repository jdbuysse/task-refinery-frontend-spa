import * as taskBoard from "../Task Board/taskBoard.js"
import * as storage from "../LocalStorage/localStorage.js"

const taskInput = document.querySelector('#task-input-form')
const taskName = document.querySelector('#task-name')

//taskInput.addEventListener('submit', (event) => captureFormEvent(event))


function captureFormEvent(event){
    event.preventDefault()
    const formData = new FormData(taskInput)
    const newTasks = formData.get('tasks')
    const taskNameInput = formData.get('task-title')
    let taskObj = formatTaskList(newTasks)
    //storage.populateStorage(taskObj) store object on 'save' rather than submit
    taskBoard.renderSubtasks(taskObj)
    console.log('i', taskNameInput)
    taskName.textContent = taskNameInput
}

function formatTaskList(text){
    let arr = text.split('\n')
    return arr.map(task => {
        let obj = {}
        obj['content'] = task 
        obj['completedness'] = 1 //all tasks start at 1
        return obj
    })
}

export {captureFormEvent, formatTaskList}