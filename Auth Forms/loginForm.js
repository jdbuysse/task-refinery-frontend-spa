

function handleLogin(event){
    event.preventDefault()
    const loginFormData = new FormData(event.target)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')
    sendFetch(username,password)
    event.target.reset()
}

function sendFetch(username, password){
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    
    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/login/", requestOptions)
    .then(response => response.json())
    .then(result => {
        localStorage.setItem("user_id", parseJwt(result.access).user_id)
        localStorage.setItem("token", result.access)
        localStorage.setItem("username", username)
        window.location.replace("http://localhost:3000#start")
    })
    .catch(error => console.log('error', error));
}

function parseJwt(token){
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
}

export {handleLogin}