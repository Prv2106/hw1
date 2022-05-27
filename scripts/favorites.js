
let page=0;
let last;
let first_element=[];


function onJson(json){
    const section = document.querySelector('#album-view');
    section.innerHTML='';
    const h1 = document.createElement('h1');
    h1.textContent = "Raccolta dei tuoi film preferiti";
    section.appendChild(h1);

    if((json.status === false)){

        if(page>0){
            --page;
        showCurrentPage();
        }
        else{
            const desc = document.createElement('div');
            desc.textContent = "Non hai ancora aggiunto titoli alla tua raccolta";
            section.appendChild(desc);
            section.classList.add('empty-favorites');
        }
    }
    else{
        const  album = document.createElement('section');
        album.classList.add('album-view');
        section.appendChild(album);

        let num_favorites=0;
        let count=0;

        for(let result of json.results){
            ++num_favorites;
            ++count;
            
            const box_contents = document.createElement('div');
            box_contents.classList.add('boxContents');
            album.appendChild(box_contents);
    
            const img_box = document.createElement('div');
            img_box.classList.add('imgBox');
            box_contents.appendChild(img_box);
    
            const img = document.createElement('img');
            img.src = result.res.img;
            img_box.appendChild(img);
    
            let div = document.createElement('div');
            box_contents.appendChild(div);
    
            let title = document.createElement('strong');
            title.textContent = result.res.title;
            div.appendChild(title);
    
            let id = document.createElement('small');
            id.textContent = result.res.movie_id;
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
            overview.textContent = result.res.overview;
            div.appendChild(overview);
    
    
            let vote_container = document.createElement('div');
            vote_container.textContent = "Voto: ";
            div.appendChild(vote_container);
            let vote = document.createElement('em');
            vote.classList.add('vote');
            vote.textContent = result.res.vote;
            div.appendChild(vote);
            
            let share = document.createElement('em');
            share.classList.add('share');
            share.addEventListener('click',openModal);
            if(result.shared === false){
                share.textContent = "consiglia in chat";
            }
            else{
                share.textContent = "consiglia di nuovo in chat";
            }
            
            div.appendChild(share);

            let favorites = document.createElement('button');
            favorites.textContent = 'rimuovi dai preferiti';
            favorites.addEventListener('click',removeFavorites);
            div.appendChild(favorites);

            if(num_favorites===1){
                first_element[page]=result.res.favorite_id;
            }
            last = result.res.favorite_id;

    
        }



        if(count <4){
            let box_contents = [];
            box_contents = document.querySelectorAll('div.boxContents');
    
            for(let box of box_contents){
                box.classList.add('inc-width');
            }
        }

        const button_container = document.createElement('div');
        button_container.classList.add('button-container');
        section.appendChild(button_container);
        if(page>0){
            let back_button = document.createElement('button');
            back_button.textContent = "pagina precedente";
            button_container.appendChild(back_button);
            back_button.addEventListener('click',previousPage)
        }
        if((num_favorites === 12)&&(json.n_res.num>12)){
            let next_page = document.createElement('button');
            next_page.textContent = "pagina succesiva";
            button_container.appendChild(next_page);
            next_page.addEventListener('click',nextPage);
        }
        


    }


}



function previousPage(){
    --page;
    fetch("db_operations.php?type=show_favorites&first=" + first_element[page]).then(onShowFavoritesResponse).then(onJson);
}



function nextPage(){
    page++;
    fetch("db_operations.php?type=show_favorites&last=" + last).then(onShowFavoritesResponse).then(onJson);
}

function showCurrentPage(){
    fetch("db_operations.php?type=show_favorites&current=" + first_element[page]).then(onShowFavoritesResponse).then(onJson);
}



function onJsonRemoveFavorites(){
    showCurrentPage();
}

function onShowFavoritesResponse(response){
    return response.json();
}




function favoritesRequest(){
    fetch("db_operations.php?type=show_favorites").then(onShowFavoritesResponse).then(onJson);
}


favoritesRequest();

function updateFavorites(event){
    favoritesRequest();
}

function onResponse(response){
    response.json().then(onJsonRemoveFavorites)
}


function onClick2(){    
    document.querySelector('#menu-view').innerHTML='';
    const menu = document.querySelector('#menu').addEventListener('click',onClick1);
}

function onClick1(){

    const menu = document.querySelector('#menu-view');
    menu.classList.remove('hidden');
    menu.innerHTML='';

    let home = document.createElement('a');
    home.textContent = "Home";
    home.href="home.php";
    menu.appendChild(home);

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

    let logout = document.createElement('a');
    logout.textContent = "Logout";
    logout.href="logout.php";
    menu.appendChild(logout);
    

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);





function onAddMsgResponse(response){
    return response.json();
}
