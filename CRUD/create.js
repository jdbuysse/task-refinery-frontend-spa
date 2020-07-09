

function saveNewTask(taskName){
    let title = taskName
    console.log("saving this as new task", title)
    persistNewTask(title)
    //this log happens too quickly for the fetch. what to do?
    console.log(localStorage.getItem("selected_task"))
}


function persistNewTask(title){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("description", "placeholder");
    urlencoded.append("title", title);

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    // fetch("http://127.0.0.1:8001/tasks/", requestOptions)
    // .then(response => response.text())
    // .then(result => returnNewTaskID(result))
    // .catch(error => console.log('error', error));
    
    const request = async () => {
        const response = await fetch("http://127.0.0.1:8000/tasks/", requestOptions)
        const json = await response.json()
        localStorage.setItem("selected_task", json.id)
        console.log(json)
    }

    request()
}

function returnNewTaskID(result){
    obj = JSON.parse(result)
    localStorage.setItem("selected_task", obj.id)
    console.log('new task ID',obj.id)
}


function persistSubtasks(subtasks) {
    console.log(subtasks)
    console.log('persist subtask',localStorage.getItem("selected_task"))
    persistFetch(subtasks)
}


function persistFetch(subtasks) {
    subtasks.forEach(subtask=> {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("content", subtask);
        urlencoded.append("task_id", localStorage.getItem("selected_task"));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/subtasks/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    })

}

export {saveNewTask, persistSubtasks}