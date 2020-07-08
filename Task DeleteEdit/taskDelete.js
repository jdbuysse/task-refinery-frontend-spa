function addTaskDeleteButton(li,task){
    let button = document.createElement("button")
    button.innerText = 'X'
    li.append(button)
    button.addEventListener("click", event => deleteTask(task))
}

function deleteTask(id){
    event.preventDefault()
    event.target.parentNode.remove()
    //add code to remove from local storage
}

export {addTaskDeleteButton, deleteTask}