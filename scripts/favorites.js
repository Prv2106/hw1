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



function onJson(json){
    console.log(json);

    const section = document.querySelector('#favorites-view');
    section.innerHTML='';
    const h1 = document.createElement('h1');
    h1.textContent = "Raccolta dei tuoi film preferiti";
    section.appendChild(h1);

    if(json.status === false){
        const desc = document.createElement('div');
        desc.textContent = "Non hai ancora aggiunto titoli alla tua raccolta";
        section.appendChild(desc);
        section.classList.add('empty-favorites');
    }
    else{

        console.log(json.length);


        const  album = document.createElement('section');
        album.classList.add('favorites-view');
        section.appendChild(album);



        for(let result of json){
            const box_contents = document.createElement('div');
            box_contents.classList.add('boxContents');
            album.appendChild(box_contents);
    
            const img_box = document.createElement('div');
            img_box.classList.add('imgBox');
            box_contents.appendChild(img_box);
    
            const img = document.createElement('img');
            img.src = result.img;
            img_box.appendChild(img);
    
            let div = document.createElement('div');
            box_contents.appendChild(div);
    
            let title = document.createElement('strong');
            title.textContent = result.title;
            div.appendChild(title);
    
            let id = document.createElement('small');
            id.textContent = result.movie_id;
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
            vote.textContent = result.vote;
            div.appendChild(vote);
    
            let favorites = document.createElement('button');
            favorites.textContent = 'rimuovi dai preferiti';
            favorites.addEventListener('click',removeFavorites);
            div.appendChild(favorites);


        }
    }


}


function onJsonRemove(json){
    updateFavorites();
}

function onResponse(response){
    return response.json();
}




function favoritesRequest(){
    fetch("load_favorites.php").then(onResponse).then(onJson);
}


favoritesRequest();

function updateFavorites(event){
    favoritesRequest();
}


function removeFavorites(event){
    let element = event.currentTarget;
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent;    
    fetch("remove_favorites.php?" + "movie_id=" + encodeURIComponent(movie_id)).then(onResponse).then(onJsonRemove);
}

/*mobile*/



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



    let up_coming = document.createElement('a');
    up_coming.textContent = "Ultime uscite";
    up_coming.href = "up_coming.php";
    menu.appendChild(up_coming);

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);




