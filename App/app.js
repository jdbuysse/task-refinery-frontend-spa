import * as taskSelection from "../Task Selection/selector.js"
import * as dragging from "../Dragging/dragging.js"


let tasksURL = `http://localhost:8001/tasks/`
const userID = localStorage.getItem("user_id")


if (userID){
    console.log('using user tasks', userID)
    tasksURL = `http://localhost:8001/users/${userID}`
}
else{
    taskName.innerText = "You don't have any tasks yet"
}

fetch(tasksURL)
    .then(response => response.json())
    .then(result => handleData(result))
    .then(dragging.makeDraggable())

function handleData(data){
    //taskBoard.renderTasks(data)
    taskSelection.createTaskDropdown(data.tasks)
}