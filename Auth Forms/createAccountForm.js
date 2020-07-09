const accountCreatedMessage = document.querySelector('#create-account-message')

function createAccount(event){
    event.preventDefault()
    const loginFormData = new FormData(event.target)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')
    createAccountFetch(username,password)
    event.target.reset()
}

function createAccountFetch(username, password){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/create/", requestOptions)
      .then(response => response.json())
      .then(result => accountCreated(result))
}

function accountCreated(result){
    if (result.id != undefined) {
        accountCreatedMessage.textContent = `Welcome, ${result.username}, your account has
        been successfully created. Please log in.`
        localStorage.setItem("user_id", result.id)
    }
    else {
        accountCreatedMessage.textContent = `Account could not be created: ${result.username}`
    }
    
}

export {createAccount}
