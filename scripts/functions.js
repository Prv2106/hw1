function hideOverview(event){
    let element = event.currentTarget;
    element.textContent = "Mostra trama";
    element.parentNode.parentNode.querySelector('span').classList.add('hidden');
    element.removeEventListener('click',hideOverview);
    element.addEventListener('click',showOverview);

}


function showOverview(event){ 
    let element = event.currentTarget;
    element.textContent = "Nascondi trama";

    element.parentNode.parentNode.querySelector('span').classList.remove('hidden');
    element.removeEventListener('click',showOverview);
    element.addEventListener('click',hideOverview);
}



function removeFavorites(event){
    let element = event.currentTarget;
    element.classList.add('removed');


    let movie_id = element.parentNode.parentNode.querySelector('small').textContent

    fetch("db_operations.php?type=remove_favorites" + "&movie_id=" + encodeURIComponent(movie_id)).then(onRemoveResponse).then(onJsonRemoveFavorites);
}

function onRemoveResponse(response){
    return response.json();
}

function onJsonRemoveFavorites(json){
    let button = document.querySelector('button.removed');
    if(json.op===true){
        button.textContent = "aggiungi ai preferiti";
        button.addEventListener('click',addFavorites);
        button.removeEventListener('click',removeFavorites);
        button.classList.remove('removed');
    }
}


function addFavorites(event){
    let element = event.currentTarget;
    element.classList.add('added');


    let img_src = element.parentNode.parentNode.querySelector('img').src;
    let title = element.parentNode.parentNode.querySelector('strong').textContent;
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent
    let vote = element.parentNode.parentNode.querySelector('em').textContent;
    let overview = element.parentNode.parentNode.querySelector('span').textContent;

    
    fetch("db_operations.php?type=add_favorites" +
        "&image=" + encodeURIComponent(img_src) +
        "&title=" +  encodeURIComponent(title) +
        "&movie_id=" + encodeURIComponent(movie_id) +
        "&vote=" + encodeURIComponent(vote) +
        "&overview=" + encodeURIComponent(overview)        
    ).then(onAddFavoritesResponse).then(onAddFavoritesJson);

}


function onAddFavoritesResponse(response){
    return response.json();
}


function onAddFavoritesJson(json){
    let button = document.querySelector('button.added');
    if(json.op === true){
        button.textContent = "rimuovi dai preferiti";
        button.addEventListener('click',removeFavorites);
        button.removeEventListener('click',addFavorites);
        button.classList.remove('added');
    }
}


function addMessage(event){
    event.preventDefault();
    const title = shared_movie.title;
    const img = shared_movie.poster;
    const movie_id = shared_movie.movie_id;
    const text = document.querySelector('#input-text').value;

    fetch("db_operations.php?type=add_msg" + 
    '&img='  +  encodeURIComponent(img) + 
    "&title=" + encodeURIComponent(title) + 
    "&text=" + encodeURIComponent(text) +
    "&movie_id=" + encodeURIComponent(movie_id) 
    ).then(onAddMsgResponse).then(onAddMsgJson);   

}

function onAddMsgJson(json){
    if(json.op === true){
        let share =document.querySelector('em.shared');
        share.classList.remove('shared');
        share.textContent='consiglia di nuovo in chat';
    }
}

let shared_movie = {
    'title': '',
    'poster': '',
    'movie_id': ''
}


function openModal(event){
    event.currentTarget.classList.add('shared');
    let h1 = document.querySelector('#modal-view h1');
    h1.textContent = "Scrivi un messaggio";
    let input= document.querySelector('#input-text');
    input.addEventListener('click',onFocusMsg);
    input.addEventListener('blur',onBlurMsg);
    form_msg.addEventListener('submit',addMessage);
    input.value = "Consiglio a tutti di guardare questo film!!!";
    const element = event.currentTarget;
    shared_movie.title=element.parentNode.parentNode.querySelector('strong').textContent;
    shared_movie.poster = element.parentNode.parentNode.querySelector('img').src;
    shared_movie.movie_id = element.parentNode.parentNode.querySelector('small').textContent;
    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
    modalView.classList.remove('hidden');
}


function closeModal(){ 
    document.body.classList.remove('no-scroll');
    modalView.classList.add('hidden');
    
}

const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click',closeModal);

const form_msg = document.querySelector('#text-box');

form_msg.addEventListener('submit',closeModal);

function onBlur(event){
    let element = event.currentTarget;
    if(element.value === ""){
        element.value="nome del film";
    }
}
function onBlurMsg(event){
    let element = event.currentTarget;
    if(element.value === ""){
        element.value="Consiglio a tutti di guardare questo film!!!";
    }
}

function onFocus(event){
    let element = event.currentTarget;
    if(element.value === "nome del film"){
        element.value="";
    }

}

function onFocusMsg(event){
    let element = event.currentTarget;
    event.stopPropagation();
    if(element.value === "Consiglio a tutti di guardare questo film!!!"){
        element.value="";
    }
}

