import * as taskBoard from "../Task Board/taskBoard.js"

function addTaskEditButton(task) {
    let button = document.createElement("button")
    button.addEventListener("click", (event, task) => {
        editTask(event, task);
    })
    button.innerText = 'Edit'
    task.append(button)
}

function editTask(event) {
    event.target.parentNode.innerHTML = `
        <form id='update-task'>
            <input type='text' value='${event.target.parentNode.innerText.slice(0, -5)}'/>
        </form> 
    `
    const updateTask = document.querySelector('#update-task')
    updateTask.addEventListener('submit', (e) =>{
        handleEditTask(e)
    })
}

function handleEditTask(event) {
    event.preventDefault()
    let obj = makeTaskObject(event.target.children[0].value)
    taskBoard.renderSubtask(obj)
    event.target.parentNode.remove()
}

function makeTaskObject(value){
    let obj = {}
    obj['content'] = value 
    obj['completedness'] = 1 //dumy var
    return obj
}

export {addTaskEditButton, editTask, handleEditTask}