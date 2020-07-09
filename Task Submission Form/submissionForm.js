import * as taskBoard from "../Task Board/taskBoard.js"
import * as storage from "../LocalStorage/localStorage.js"

const taskInput = document.querySelector('#task-input-form')


//taskInput.addEventListener('submit', (event) => captureFormEvent(event))


function captureFormEvent(event){
    event.preventDefault()
    const formData = new FormData(taskInput)
    const newTasks = formData.get('tasks')
    let taskObj = formatTaskList(newTasks)
    //storage.populateStorage(taskObj) store object on 'save' rather than submit
    console.log('str',taskObj)
    taskBoard.renderSubtasks(taskObj)
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