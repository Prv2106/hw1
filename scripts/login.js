
function emptyValues(event){
    if((form_login.username.value.length === 0)||(form_login.password.value.length === 0)){
        document.querySelector('#empty-input').classList.remove('hidden');
        event.preventDefault();
    }
}

const form_login = document.querySelector('form');
form_login.addEventListener('submit',emptyValues);