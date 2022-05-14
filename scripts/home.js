const poster = "https://image.tmdb.org/t/p/w500";
const spotify_client_id = "6998d302b5194f88a753bfd0b30d3324";
const spotify_client_secret = "2491df4a8e7846a48a910a1f48aa1574";
const spotify_token_endpoint = "https://accounts.spotify.com/api/token";
const spotify_request_endpoint = "https://api.spotify.com/v1/";

let spotify_token = '';


let page_count=1;






// Aggiungi ai preferiti 




function removeFavorites(event){
    console.log("Cliccato su rimuovi preferiti");
    let element = event.currentTarget;
    element.textContent = "aggiungi ai preferiti";
    element.addEventListener('click',addFavorites);

    let movie_id = element.parentNode.parentNode.querySelector('small').textContent


    
    fetch("remove_favorites.php?" + "movie_id=" + encodeURIComponent(movie_id));

}


function addFavorites(event){
    let element = event.currentTarget;
    element.textContent = "rimuovi dai preferiti";
    element.addEventListener('click',removeFavorites);

    let img_src = element.parentNode.parentNode.querySelector('img').src;
    let title = element.parentNode.parentNode.querySelector('strong').textContent;
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent
    let vote = element.parentNode.parentNode.querySelector('em').textContent;
    let overview = element.parentNode.parentNode.querySelector('span').textContent;

    
    fetch("add_favorites.php?" +
        "image=" + encodeURIComponent(img_src) +
        "&title=" +  encodeURIComponent(title) +
        "&movie_id=" + encodeURIComponent(movie_id) +
        "&vote=" + encodeURIComponent(vote) +
        "&overview=" + encodeURIComponent(overview)        
    );

}




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









//Popular Movies

/* tentativo di tenere traccia dei preferiti */
/*
let check_favorites;

function onJsonCheck(json){

    check_favorites=json.op;

}


function checkFavorites(movie_id){
    fetch("check_favorites.php?movie_id=" + encodeURIComponent(movie_id)).then(onCheckResponse).then(onJsonCheck);
    return check_favorites;
}



function onCheckResponse(response){
    return response.json();
}
*/

function onJsonPopular(json){
    json = JSON.parse(json);

    const section = document.querySelector('#movies-view');
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
    const results = json.results;


    for(let result of results){

        
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

        let favorites = document.createElement('button');
        favorites.textContent = 'aggiungi ai preferiti';
        favorites.addEventListener('click',addFavorites);
        div.appendChild(favorites);
        
    }

}

/* implementare mostra trama e nascondi trama
    const movies = document.querySelectorAll("button.favorites");
    for(let movie of movies){
        let movie_id=movie.parentNode.parentNode.querySelector('small').textContent;
        
        let res=checkFavorites(movie_id);
        if(res==true){
            movie.textContent="Rimuovi dai preferiti";
            movie.addEventListener('click',removeFavorites);
        }
    }
*/




function onResponse(response){
    return response.json();
}


function popularMovies(){
    document.querySelector('#next-page').classList.remove('hidden');
    fetch("popular_request.php" + "?page=" + page_count).then(onResponse).then(onJsonPopular);
}

popularMovies();


// Page view

function previousPageRequest(){
    --page_count;
    if(page_count === 1){
        document.querySelector('#previous-page').classList.add('hidden');
    }
    fetch("popular_request.php" + "?page=" + page_count).then(onResponse).then(onJsonPopular);
}

function nextPageRequest(){
    ++page_count;
    if(page_count === 2){
        document.querySelector('#previous-page').classList.remove('hidden');
    }
    fetch("popular_request.php" + "?page=" + page_count).then(onResponse).then(onJsonPopular);
}


const next_page_button = document.querySelector("#next-page").addEventListener('click',nextPageRequest);
const previous_page_button = document.querySelector("#previous-page").addEventListener('click',previousPageRequest);










//Search movies

function onJsonSearchMovies(json){
    json = JSON.parse(json);
    const section = document.querySelector('#movies-view');
    section.innerHTML='';

    const input_value = document.querySelector('#search-movies').value;

    const popular = document.createElement('button');
    popular.classList.add('popular-button');
    popular.textContent = "Più popolari";
    section.appendChild(popular);
    const h1 = document.createElement('h1');
    h1.textContent = "Trova film";
    section.appendChild(h1);

    const desc = document.createElement('div');
    desc.textContent = "Risultati della ricerca " + input_value;
    section.appendChild(desc);

    const  album = document.createElement('section');
    album.classList.add('album-view');
    section.appendChild(album);
    const results = json.results;


    for(let result of results){

        
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

        let favorites = document.createElement('button');
        favorites.textContent = 'aggiungi ai preferiti';
        favorites.addEventListener('click',addFavorites);
        div.appendChild(favorites);
        
    }


    const popular_button = document.querySelector('button.popular-button').addEventListener('click',popularMovies);
}






function searchMoviesRequest(event){
    event.preventDefault();
    document.querySelector('#next-page').classList.add('hidden');
    const input = document.querySelector('#search-movies');
    const value = encodeURIComponent(input.value);

    fetch("search_movies_request?query=" + value).then(onResponse).then(onJsonSearchMovies);
}


function onBlur(event){
    let element = event.currentTarget;
    if(element.value === ""){
        element.value="nome del film";
    }
}

function onFocus(event){
    let element = event.currentTarget;
    if(element.value === "nome del film"){
        element.value="";
    }
}




const form_search = document.querySelector('#search').addEventListener('submit',searchMoviesRequest);



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






//SoundTracks


function onJsonSoundTrack(json) {
    console.log(json);
    const element = json.playlists.items[0];
    const input = document.querySelector('#movie-soundtrack').value;
    const view = document.querySelector('#movie-soundtrack-view');
    view.innerHTML='';
    let found = false;

    if((input!=='')&&(json.playlists.items.length !== 0)){
        found = true;
        const box_contents = document.createElement('div');
        box_contents.classList.add('boxContents');
        view.appendChild(box_contents);
    
        const img_box = document.createElement('div');
        img_box.classList.add('imgBox');
        box_contents.appendChild(img_box);
    
        const img = document.createElement('img');
        img.src = element.images[0].url;
        img_box.appendChild(img);
    
        let div = document.createElement('div');
        box_contents.appendChild(div);
    
        let title = document.createElement('strong');
        title.textContent = element.name;
        div.appendChild(title);
    
        const link = document.createElement('a');
        link.classList.add('soundtrack-link');
        link.textContent = "asccolta su spotify";
        link.href = element.external_urls.spotify;
        link.target = '_blank';
        div.appendChild(link);
    }

    if(found===false){        
        let not_found = document.createElement('strong');
        not_found.textContent = "Non è stato trovato alcun elemento";
        view.appendChild(not_found);
    }


}




function sendRequest(event){
    event.preventDefault();
    const album_input = document.querySelector('#movie-soundtrack');
    let value = album_input.value + " soundtrack";
    value = encodeURIComponent(value);

    const request = spotify_request_endpoint + 'search?type=playlist&q='  + value + '&limit=1';

    fetch(request,
    {
        headers:
        {
            'Authorization': 'Bearer ' + spotify_token
        }
    }
    ).then(onResponse).then(onJsonSoundTrack);
}



function onJsonToken(json){
    console.log(json);
    spotify_token = json.access_token;
}



fetch(spotify_token_endpoint,{
    method: "post",
    body: "grant_type=client_credentials",
    headers:{
        "Content-type": "application/x-www-form-urlencoded",
        "Authorization": 'Basic ' + btoa(spotify_client_id + ':' + spotify_client_secret)
    }
}).then(onResponse).then(onJsonToken);



const form_soundtrack = document.querySelector('#soundtrack');
form_soundtrack.addEventListener('submit',sendRequest);





const inputs =document.querySelectorAll('input');

for(let input of inputs){
    input.addEventListener('focus',onFocus);
    input.addEventListener('blur',onBlur);
}   







/*visualizzazione mobile*/



function onClick2(){    
    document.querySelector('#menu-view').innerHTML='';
    const menu = document.querySelector('#menu').addEventListener('click',onClick1);
}

function onClick1(event){

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

    
    let favorites = document.createElement('a');
    favorites.textContent = "Preferiti";
    favorites.href = "favorites.php";
    menu.appendChild(favorites);

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);




function onJsonSearchMoviesMobile(json){
    console.log(json);
    const section = document.querySelector('#movies-view');
    section.innerHTML='';

    const input_value = document.querySelector('#search-movies-mobile').value;
    const popular = document.createElement('button');
    popular.classList.add('popular-button');
    popular.textContent = "Più popolari";
    section.appendChild(popular);
    const h1 = document.createElement('h1');
    h1.textContent = "Trova film";
    section.appendChild(h1);

    const desc = document.createElement('div');
    desc.textContent = "Risultati della ricerca " + input_value;
    section.appendChild(desc);

    const  album = document.createElement('section');
    album.classList.add('album-view');
    section.appendChild(album);
    const results = json.results;


    for(let result of results){

        if((result.title === null)||(result.overview === null)||(result.vote_average === 0)||(result.poster_path === null)){
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

        let overview = document.createElement('span');
        overview.classList.add('overview');
        overview.textContent = result.overview;
        div.appendChild(overview);

        let vote_container = document.createElement('div');
        vote_container.textContent = "Voto: ";
        box_contents.appendChild(vote_container);
        let vote = document.createElement('Strong');
        vote.classList.add('vote');
        vote.textContent = result.vote_average;
        box_contents.appendChild(vote);
    }

    const popular_button = document.querySelector('button.popular-button').addEventListener('click',popularMovies);
}






function searchMoviesMobileRequest(event){
    event.preventDefault();
    const input = document.querySelector('#search-movies-mobile');
    const value = encodeURIComponent(input.value);
    const request = TMDB_request_endpoint + "&query=" + value;

    fetch(request).then(onResponse).then(onJsonSearchMoviesMobile);
}




const form_search_mobile = document.querySelector('#search-mobile').addEventListener('submit',searchMoviesMobileRequest);

