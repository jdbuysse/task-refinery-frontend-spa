import * as taskBoard from "../Task Board/taskBoard.js"

const taskDropdown = document.querySelector('#task-select')
taskDropdown.addEventListener('change', selector)


function selector(event){
    taskBoard.clearTasks()
    let task = JSON.parse(event.target.value)
    console.log(task)
    localStorage.setItem("selected_task", task.id)
    taskBoard.addTaskName(task.title)
    taskBoard.addSubtasks(task.subtasks)
}


function createTaskDropdown(tasks){
    tasks.forEach(task => {
        let option = document.createElement('option')
        option.innerText = task.title
        option.value = JSON.stringify(task)
        taskDropdown.appendChild(option)
    })
}

export {selector, createTaskDropdown}