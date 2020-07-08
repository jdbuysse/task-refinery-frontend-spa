const taskInput = document.querySelector('#task-input-form')

taskInput.addEventListener('submit', (event) => captureFormEvent(event))


function captureFormEvent(event){
    event.preventDefault()
    const formData = new FormData(taskInput)
    const newTasks = formData.get('tasks')
    taskObj = formatTaskList(newTasks)
    //console.log('tobj',taskObj)
    populateStorage(taskObj)
    renderTasks(taskObj)
}