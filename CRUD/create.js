function saveNewTask(subtasks){
    title = taskName
    console.log("saving this as new task", subtasks)
    persistNewTask(title)
    //this log happens too quickly for the fetch. what to do?
    console.log(localStorage.getItem("selected_task"))
}


function persistNewTask(){
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

    fetch("http://127.0.0.1:8001/tasks/", requestOptions)
    .then(response => response.text())
    .then(result => returnNewTaskID(result))
    .catch(error => console.log('error', error));
}

function returnNewTaskID(result){
    obj = JSON.parse(result)
    localStorage.setItem("selected_task", obj.id)
    console.log('new task ID',obj.id)
}