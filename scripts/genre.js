const tmdb_genre_endpoint = "https://api.themoviedb.org/3/genre/movie/list?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT";
const tmdb_genre_endpoint2 = "https://api.themoviedb.org/3/discover/movie?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT&with_genres=";
const poster = "https://image.tmdb.org/t/p/w500";

let page_count=1;

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


function onJsonGenre(json){
    json = JSON.parse(json);

    const section = document.querySelector('#genre-view');
    section.innerHTML='';
    const h1 = document.createElement('h1');
    h1.textContent = "Cerca per genere";
    section.appendChild(h1);

    const  album = document.createElement('section');
    album.classList.add('genre-view');
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




let genre_list={};


function onJsonGenreType(json){
    json = JSON.parse(json);
    const results = json.genres;
    for(let result of results){

        genre_list[result.name] = result.id;

    }
    
}



let previous_genre_id = 28;


function genreRequest(){
    let genre = document.querySelector('#type').value;
    const genre_id = genre_list[genre];
    if(genre_id !== previous_genre_id){
        page_count=1;
        document.querySelector('#previous-page').classList.add('hidden');
    }
    previous_genre_id = genre_id;
    fetch("genre_request.php?id=" + genre_id + "&page=" + page_count).then(onResponse).then(onJsonGenre);
}



fetch("genre_type_request.php").then(onResponse).then(onJsonGenreType);

const genre_button = document.querySelector('#genre');

genre_button.addEventListener('click',genreRequest);



fetch("genre_request.php?id=" + 28 + "&page=" + 1).then(onResponse).then(onJsonGenre);



function onJsonRemove(json){
    updateFavorites();
}

function onResponse(response){
    return response.json();
}





function removeFavorites(event){
    let element = event.currentTarget;
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent;    
    fetch("remove_favorites.php?" + "movie_id=" + encodeURIComponent(movie_id)).then(onResponse).then(onJsonRemove);
}






function previousPageRequest(){
    --page_count;
    if(page_count === 1){
        document.querySelector('#previous-page').classList.add('hidden');
    }
    genreRequest();
}

function nextPageRequest(){
    ++page_count;
    if(page_count === 2){
        document.querySelector('#previous-page').classList.remove('hidden');
    }
    genreRequest();
}


const next_page_button = document.querySelector("#next-page").addEventListener('click',nextPageRequest);
const previous_page_button = document.querySelector("#previous-page").addEventListener('click',previousPageRequest);










/*mobile*/



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



    let up_coming = document.createElement('a');
    up_coming.textContent = "Ultime uscite";
    up_coming.href = "up_coming.php";
    menu.appendChild(up_coming);

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);




