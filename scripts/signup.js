const form_status ={
    name: false,
    surname: false,
    email: false,
    username: false,
    password: false,
    confirm_password: false
};




function emptyValues(event){
    if((form_signup.name.value.length === 0)||(form_signup.surname.value.length === 0)||(form_signup.email.value.length === 0)||
    (form_signup.password.value.length === 0)||(form_signup.username.value.length === 0)||(form_signup.confirm_password.value.length === 0)){
        document.querySelector('#empty-input').classList.remove('hidden');
        event.preventDefault();
    }
}



function onJsonCheckUsername(json){
        if(json.exists === true){
            form_status.username=false;
            const input = document.querySelector('[name="username"]');
            input.classList.remove('border-error');
            const div_error = document.querySelector('#username-error');
            div_error.innerHTML='';

            div_error.textContent = "Nome utente già in uso";
            div_error.classList.add('error');
            input.classList.add('border-error');
        }
        else{
            form_status.username=true;
        }
}



function onJsonCheckEmail(json){
    if(json.exists === true){
        form_status.email=false;
        const input = document.querySelector('[name="email"]');
        input.classList.remove('border-error');
        const div_error = document.querySelector('#email-error');
        div_error.innerHTML='';

        div_error.textContent = "email già in uso";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else{
        form_status.email=true;
    }

}


function onResponse(response){
    if(!response.ok) return null;
    return response.json();
}


function checkSurname(){
    const input = document.querySelector('[name="surname"]');
    input.classList.remove('border-error');
    const div_error = document.querySelector('#surname-error');
    div_error.innerHTML='';


    if(input.value === ''){
        form_status.surname=false;
        div_error.textContent = "campo obbligatorio";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else if(!/^[a-zA-Z ]+$/.test(input.value)){
        form_status.surname=false;
        div_error.textContent = "Devi inserire un cognome reale";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else{
        form_status.surname=true;
    }
}

function checkName(){
    const input = document.querySelector('[name="name"]');
    input.classList.remove('border-error');
    const div_error = document.querySelector('#name-error');
    div_error.innerHTML='';


    if(input.value === ''){
        form_status.name=false;
        div_error.textContent = "campo obbligatorio";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else if(!/^[a-zA-Z ]+$/.test(input.value)){
        form_status.name=false;
        div_error.textContent = "Devi inserire un nome reale";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else{
        form_status.name=true;
    }
}







function checkConfirmPassword(){
    const input = document.querySelector('[name="confirm_password"]');    
    input.classList.remove('border-error');
    const div_error = document.querySelector('#c-pwd-error');
    div_error.innerHTML='';

    if(input.value === ''){
        form_status.confirm_password=false;
        div_error.textContent = "campo obbligatorio";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else if(input.value !== document.querySelector('[name="password"]').value){
        form_status.confirm_password=false;
        div_error.textContent = "Le password non coincidono";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else{
        form_status.confirm_password=true;
    }
}




function checkPassword(){
    
    const input = document.querySelector('[name="password"]');
    const input_confirm = document.querySelector('[name="confirm_password"]');
    if(input_confirm.value !==''){
        checkConfirmPassword();
    }

    input.classList.remove('border-error');
    const div_error = document.querySelector('#pwd-error');
    div_error.innerHTML='';
    if(input.value === ''){
        form_status.password=false;
        div_error.textContent = "campo obbligatorio";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else if(input.value.length < 8){
        form_status.password=false;
        div_error.textContent = "La password deve contenere almeno 8 caratteri";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else{
        form_status.password=true;
    }


}



function checkEmail(){

    const input = document.querySelector('[name="email"]');
    input.classList.remove('border-error');
    const div_error = document.querySelector('#email-error');
    div_error.innerHTML='';

    if(input.value === ''){
        form_status.email=false;
        div_error.textContent = "campo obbligatorio";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(input.value).toLowerCase())){
        form_status.email=false;
        div_error.textContent = "email non valida";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else{
        fetch("check_email.php?q=" +encodeURIComponent(input.value)).then(onResponse).then(onJsonCheckEmail);
    }

}






function checkUsername(){
    const input = document.querySelector('[name="username"]');
    input.classList.remove('border-error');
    const div_error = document.querySelector('#username-error');
    div_error.innerHTML='';

    if(input.value === ''){
        form_status.username=false;
        div_error.textContent = "campo obbligatorio";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else if(!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)){
        form_status.username=false;
        div_error.textContent = "Nome utente non valido";
        div_error.classList.add('error');
        input.classList.add('border-error');
    }
    else{
        fetch("check_username.php?q=" +encodeURIComponent(input.value)).then(onResponse).then(onJsonCheckUsername);
    }
    
}





function checkStatus(event){
    let correct=true;

    for(let item in form_status){
        if(form_status[item]===false){
            correct=false;
        }
    }

    if(correct=== false){
        event.preventDefault();
    }

}




function checkForm(event){
    
    emptyValues(event); 
    checkStatus(event);
    

}







const form_signup = document.querySelector('form');
form_signup.addEventListener('submit',checkForm);




document.querySelector('[name="name"]').addEventListener('blur',checkName);
document.querySelector('[name="surname"]').addEventListener('blur',checkSurname);
document.querySelector('[name="username"]').addEventListener('blur',checkUsername);
document.querySelector('[name="email"]').addEventListener('blur',checkEmail);
document.querySelector('[name="password"]').addEventListener('blur',checkPassword);
document.querySelector('[name="confirm_password"]').addEventListener('blur',checkConfirmPassword);

