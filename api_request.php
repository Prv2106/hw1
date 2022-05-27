<?php
session_start();
if(!isset($_SESSION['username'])){
    header("Location: login.php");
    exit;
}




switch($_GET['type']) {
    case 'search': searchMovies(); break;
    case 'popular': popularMovies(); break;
    case 'rated': topRatedMovies(); break;
    case 'genre_list': getGenreList(); break;
    case 'genre': searchByGenre(); break;
    default: break;
}



function searchMovies(){
    $endpoint = 'https://api.themoviedb.org/3/search/movie?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT&query=';

    
    header('Content-Type: application/json');
    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());
    $username = $_SESSION['username'];
    
    $movie = urlencode($_GET['query']);
    $url = $endpoint . $movie;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL,$url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);

    
    $json = json_decode($result, true);

    curl_close($curl);

    $newJson = array();

    for ($i = 0; $i < count($json['results']); $i++) {
        $favorites=false;
        $shared = false;
        $movie_id = $json['results'][$i]['id'];
        $query = "SELECT * from favorites where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res) > 0){
            $favorites=true;
        }
        else{
            $favorites=false;
        }

        $query = "SELECT * from chat where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res) > 0){
            $shared=true;
        }
        else{
            $shared=false;
        }
        


        $newJson[] = array(
            'id' => $json['results'][$i]['id'],
            'title' => $json['results'][$i]['title'],
            'poster_path' => $json['results'][$i]['poster_path'],
            'overview'=>$json['results'][$i]['overview'],
            'vote_average' => $json['results'][$i]['vote_average'],
            'favorites' => $favorites,
            'shared' => $shared
        );
    }

    echo json_encode($newJson);

}



function popularMovies(){
    $endpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT&page=';

    header('Content-Type: application/json');
    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());
    $username = $_SESSION['username'];
    
    $page = $_GET['page'];
    $url = $endpoint . $page;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL,$url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);

    
    $json = json_decode($result, true);

    curl_close($curl);

    $newJson = array();

    for ($i = 0; $i < count($json['results']); $i++) {
        $favorites=false;
        $movie_id = $json['results'][$i]['id'];
        $query = "SELECT * from favorites where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res) > 0){
            $favorites=true;
        }
        else{
            $favorites=false;
        }
        $query = "SELECT * from chat where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res) > 0){
            $shared=true;
        }
        else{
            $shared=false;
        }
        


        $newJson[] = array(
            'id' => $json['results'][$i]['id'],
            'title' => $json['results'][$i]['title'],
            'poster_path' => $json['results'][$i]['poster_path'],
            'overview'=>$json['results'][$i]['overview'],
            'vote_average' => $json['results'][$i]['vote_average'],
            'favorites' => $favorites,
            'shared' => $shared
        );
    }

    echo json_encode($newJson);

}

function topRatedMovies(){  
    $endpoint = 'https://api.themoviedb.org/3/movie/top_rated?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT&page=';


    header('Content-Type: application/json');
    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());
    $username = $_SESSION['username'];
    
    $page = $_GET['page'];
    $url = $endpoint . $page;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL,$url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);

    
    $json = json_decode($result, true);

    curl_close($curl);

    $newJson = array();

    for ($i = 0; $i < count($json['results']); $i++) {
        $favorites=false;
        $movie_id = $json['results'][$i]['id'];
        $query = "SELECT * from favorites where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res) > 0){
            $favorites=true;
        }
        else{
            $favorites=false;
        }
        $query = "SELECT * from chat where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res) > 0){
            $shared=true;
        }
        else{
            $shared=false;
        }
        


        $newJson[] = array(
            'id' => $json['results'][$i]['id'],
            'title' => $json['results'][$i]['title'],
            'poster_path' => $json['results'][$i]['poster_path'],
            'overview'=>$json['results'][$i]['overview'],
            'vote_average' => $json['results'][$i]['vote_average'],
            'favorites' => $favorites,
            'shared' => $shared
        );
    }

    echo json_encode($newJson);

}




function getGenreList(){
    $url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT';


    header('Content-Type: application/json');
    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());
    $username = $_SESSION['username'];
    
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL,$url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);

    
    $json = json_decode($result, true);

    curl_close($curl);

    $newJson = array();

    for ($i = 0; $i < count($json['genres']); $i++) {
        $newJson[] = array(
            'name' => $json['genres'][$i]['name'],
            'id' => $json['genres'][$i]['id']
        );
    }

    echo json_encode($newJson);






}




function searchByGenre(){
    $endpoint = 'https://api.themoviedb.org/3/discover/movie?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT&with_genres=';


    header('Content-Type: application/json');
    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());
    $username = $_SESSION['username'];
    
    
    $genre_id = $_GET['id'];
    $page = $_GET['page'];
    $url = $endpoint . $genre_id . "&page=" . $page;



    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL,$url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);

    
    $json = json_decode($result, true);

    curl_close($curl);

    $newJson = array();

    for ($i = 0; $i < count($json['results']); $i++) {
        $favorites=false;
        $movie_id = $json['results'][$i]['id'];
        $query = "SELECT * from favorites where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res) > 0){
            $favorites=true;
        }
        else{
            $favorites=false;
        }
        $query = "SELECT * from chat where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res) > 0){
            $shared=true;
        }
        else{
            $shared=false;
        }
        


        $newJson[] = array(
            'id' => $json['results'][$i]['id'],
            'title' => $json['results'][$i]['title'],
            'poster_path' => $json['results'][$i]['poster_path'],
            'overview'=>$json['results'][$i]['overview'],
            'vote_average' => $json['results'][$i]['vote_average'],
            'favorites' => $favorites,
            'shared' => $shared
        );
    }

    echo json_encode($newJson);
}




?>