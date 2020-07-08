function populateStorage(tasks) {
    tasks.forEach(task => {
        taskStorageArray.push(task)
    })
    console.log('tsa',taskStorageArray)
    localStorage.setItem("tasks", JSON.stringify(taskStorageArray))
    retrieveStorage()
}

function retrieveStorage(){
    return JSON.parse(localStorage.getItem("tasks") || "[]")
}