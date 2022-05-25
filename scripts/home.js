const poster = "https://image.tmdb.org/t/p/w500";
let page_count=1;



function onJsonPopularMovies(json){
    const section = document.querySelector('#album-view');
    section.innerHTML='';
    const h1 = document.createElement('h1');
    h1.textContent = "In evidenza";
    section.appendChild(h1);

    const desc = document.createElement('div');
    desc.textContent = "Di seguito i titoli più popolari del momento";
    section.appendChild(desc);

    const  album = document.createElement('section');
    album.classList.add('album-view');
    section.appendChild(album);


    for(let result of json){

        
        if((result.title === null)||(result.overview === '')||(result.vote_average === 0)||(result.poster_path === null)){
            continue;
        }
        const box_contents = document.createElement('div');
        box_contents.classList.add('boxContents');
        album.appendChild(box_contents);

        const img_box = document.createElement('div');
        img_box.classList.add('imgBox');
        box_contents.appendChild(img_box);

        const img = document.createElement('img');
        img.src = poster + result.poster_path;
        img_box.appendChild(img);

        let div = document.createElement('div');
        box_contents.appendChild(div);

        let title = document.createElement('strong');
        title.textContent = result.title;
        div.appendChild(title);

        let id = document.createElement('small');
        id.textContent = result.id;
        id.classList.add('hidden');
        div.appendChild(id);

        let display = document.createElement('a');
        display.textContent = "Mostra trama";
        display.classList.add('display-overview');
        div.appendChild(display);
        display.addEventListener('click',showOverview);

        let overview = document.createElement('span');
        overview.classList.add('overview');
        overview.classList.add('hidden');
        overview.textContent = result.overview;
        div.appendChild(overview);

        
        let vote_container = document.createElement('div');
        vote_container.textContent = "Voto: ";
        div.appendChild(vote_container);
        let vote = document.createElement('em');
        vote.classList.add('vote');
        vote.textContent = result.vote_average;
        div.appendChild(vote);

        let share = document.createElement('em');
        share.classList.add('share');
        share.addEventListener('click',openModal);
        share.textContent = "consiglia in chat";
        div.appendChild(share);

        let favorites = document.createElement('button');

        if(result.favorites === false){
            favorites.textContent = 'aggiungi ai preferiti';
            favorites.addEventListener('click',addFavorites);
        }
        else{
            favorites.textContent = 'rimuovi dai preferiti';
            favorites.addEventListener('click',removeFavorites);
        }
        div.appendChild(favorites);
        
        
    }


    const button_container = document.createElement('div');
    button_container.classList.add('button-container');
    section.appendChild(button_container);

    if(page_count>1){
        let back_button = document.createElement('button');
        back_button.textContent = "pagina precedente";
        button_container.appendChild(back_button);
        back_button.addEventListener('click',previousPageRequest)
    }

    let next_page = document.createElement('button');
            next_page.textContent = "pagina succesiva";
            button_container.appendChild(next_page);
            next_page.addEventListener('click',nextPageRequest)



}


function onResponse(response){
    return response.json();
}


function popularMoviesRequest(){
    fetch("api_request.php?type=popular" + "&page=" + page_count).then(onResponse).then(onJsonPopularMovies);
}

popularMoviesRequest();




function previousPageRequest(){
    --page_count;
    fetch("api_request.php?type=popular" + "&page=" + page_count).then(onResponse).then(onJsonPopularMovies);
}

function nextPageRequest(){
    ++page_count;
    fetch("api_request.php?type=popular" + "&page=" + page_count).then(onResponse).then(onJsonPopularMovies);
}





function onJsonSearchMovies(json){
    const section = document.querySelector('#album-view');
    section.innerHTML='';

    const popular = document.createElement('button');
    popular.classList.add('popular-button');
    popular.textContent = "Più popolari";
    section.appendChild(popular);
    const h1 = document.createElement('h1');
    h1.textContent = "Trova film";
    section.appendChild(h1);

    const desc = document.createElement('div');
    desc.textContent = "Risultati della ricerca " + searched_movie;
    section.appendChild(desc);

    const  album = document.createElement('section');
    album.classList.add('album-view');
    section.appendChild(album);


    let count=0;
    for(let result of json){
        if((result.title === null)||(result.overview === '')||(result.vote_average === 0)||(result.poster_path === null)){
            continue;
        }
        ++count;
        const box_contents = document.createElement('div');
        box_contents.classList.add('boxContents');
        album.appendChild(box_contents);

        inc_width =document.querySelector('boxContents');

        const img_box = document.createElement('div');
        img_box.classList.add('imgBox');
        box_contents.appendChild(img_box);

        const img = document.createElement('img');
        img.src = poster + result.poster_path;
        img_box.appendChild(img);

        let div = document.createElement('div');
        box_contents.appendChild(div);

        let title = document.createElement('strong');
        title.textContent = result.title;
        div.appendChild(title);

        let id = document.createElement('small');
        id.textContent = result.id;
        id.classList.add('hidden');
        div.appendChild(id);

        let display = document.createElement('a');
        display.textContent = "Mostra trama";
        display.classList.add('display-overview');
        div.appendChild(display);
        display.addEventListener('click',showOverview);

        let overview = document.createElement('span');
        overview.classList.add('overview');
        overview.classList.add('hidden');
        overview.textContent = result.overview;
        div.appendChild(overview);

        
        let vote_container = document.createElement('div');
        vote_container.textContent = "Voto: ";
        div.appendChild(vote_container);
        let vote = document.createElement('em');
        vote.classList.add('vote');
        vote.textContent = result.vote_average;
        div.appendChild(vote);

        let share = document.createElement('em');
        share.classList.add('share');
        share.addEventListener('click',openModal);
        share.textContent = "consiglia in chat";
        div.appendChild(share);

        let favorites = document.createElement('button');

        if(result.favorites === false){
            favorites.textContent = 'aggiungi ai preferiti';
            favorites.addEventListener('click',addFavorites);
        }
        else{
            favorites.textContent = 'rimuovi dai preferiti';
            favorites.addEventListener('click',removeFavorites);
        }
        div.appendChild(favorites);
        
    }   
    if(count <4){
        let box_contents = [];
        box_contents = document.querySelectorAll('div.boxContents');

        for(let box of box_contents){
            box.classList.add('inc-width');
        }
    }
    if(count=== 0){
        const not_found = document.createElement('div');
        desc.textContent = "Non sono stati trovati risultati";
        section.appendChild(not_found);
    }

    const popular_button = document.querySelector('button.popular-button').addEventListener('click',popularMoviesRequest);
}


let searched_movie;

function searchMoviesRequest(event){
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const value = encodeURIComponent(input.value);
    searched_movie = input.value;

    if((input.value !== '')&&(input.value !== "nome del film")){
        fetch("api_request.php?type=search&query="+ value).then(onResponse).then(onJsonSearchMovies);
    }
    else{
        
        const section = document.querySelector('#album-view');
        section.innerHTML='';

        const popular = document.createElement('button');
        popular.classList.add('popular-button');
        popular.textContent = "Più popolari";
        section.appendChild(popular);
        const popular_button = document.querySelector('button.popular-button').addEventListener('click',popularMoviesRequest);

        const desc = document.createElement('div');
        desc.textContent = "Non hai inserito il nome del film";
        section.appendChild(desc);
        
        
    }
    
}

const form_search = document.querySelector('#search').addEventListener('submit',searchMoviesRequest);
const form_search_mobile = document.querySelector('form.search-mobile').addEventListener('submit',searchMoviesRequest);


function onClickSearchButton(){ 
    document.querySelector('#search').classList.remove('hidden');
    document.querySelector('#close').classList.remove('hidden');
    document.querySelector('#search-button').classList.add('hidden');    
}

function onClickCloseButton(){
    document.querySelector('#search').classList.add('hidden');
    document.querySelector('#close').classList.add('hidden');
    document.querySelector('#search-button').classList.remove('hidden');    
}




const close_button = document.querySelector('#close').addEventListener('click',onClickCloseButton);
const search_button = document.querySelector('#search-button').addEventListener('click',onClickSearchButton);


function onAddResponse(){}




const inputs =document.querySelectorAll('input');

for(let input of inputs){
    input.addEventListener('focus',onFocus);
    input.addEventListener('blur',onBlur);
}   

function onClick2(){    
    document.querySelector('#menu-view').innerHTML='';
    const menu = document.querySelector('#menu').addEventListener('click',onClick1);
}

function onClick1(){

    const menu = document.querySelector('#menu-view');
    menu.classList.remove('hidden');
    menu.innerHTML='';

    let genre = document.createElement('a');
    genre.textContent = "Genere";
    genre.href="genre.php";
    menu.appendChild(genre);


    let top_rated = document.createElement('a');
    top_rated.textContent = "Più votati";
    top_rated.href = "top_rated.php";
    menu.appendChild(top_rated);

    let chat = document.createElement('a');
    chat.textContent = "Chat";
    chat.href="chat.php";
    menu.appendChild(chat);


    let favorites = document.createElement('a');
    favorites.textContent = "favorites";
    favorites.href="favorites.php";
    menu.appendChild(favorites);
    

    let logout = document.createElement('a');
    logout.textContent = "Logout";
    logout.href="logout.php";
    menu.appendChild(logout);
    

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);