<?php
session_start();
if(!isset($_SESSION['username'])){
    header("Location: login.php");
    exit;
}

switch($_GET['type']) {
    case 'add_favorites': addFavorites(); break;
    case 'remove_favorites': removeFavorites(); break;
    case 'show_favorites': showFavorites(); break;
    case 'add_msg': addMsg(); break;
    case 'remove_msg': removeMsg(); break;
    case 'update_msg': updateMsg(); break;
    case 'show_msg': showMsg(); break;
    case 'get_username': getUsername(); break;
    default: break;
}



function addFavorites(){
    header('Content-Type: application/json');

    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());


    $img = mysqli_real_escape_string($conn,$_GET['image']);
    $title = mysqli_real_escape_string($conn,$_GET['title']);
    $movie_id = mysqli_real_escape_string($conn,$_GET['movie_id']);
    $vote = mysqli_real_escape_string($conn,$_GET['vote']);
    $overview = mysqli_real_escape_string($conn,$_GET['overview']);

    $username = $_SESSION['username'];

    $query = "SELECT * from favorites where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
    $res = mysqli_query($conn,$query);
    if(mysqli_num_rows($res) > 0){
        mysqli_close($conn);
        echo json_encode($response);
        $response = array("op" => false); 
        exit;
    }

    $query="INSERT INTO  favorites values('".$movie_id."','".$username."','".$img."','".$title."','".$vote."','".$overview."','')";
    $res = mysqli_query($conn,$query);
    if($res == true){
        $response = array("op" => true); 
    }
    else{
        $response = array("op" => false); 
    }

    mysqli_close($conn);
    echo json_encode($response);
}


function removeFavorites(){

    header('Content-Type: application/json');

    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());

    $movie_id = mysqli_real_escape_string($conn,$_GET['movie_id']);


    $username = $_SESSION['username'];

    $query = "SELECT * from favorites where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
    $res = mysqli_query($conn,$query);
    if(mysqli_num_rows($res) < 0){
        mysqli_close($conn);
        $response = array("op" => false);
        echo json_encode($response);
        exit;
    }

    $query="DELETE from favorites where binary username = '".$username."'  AND  movie_id ='".$movie_id."'";
    $res = mysqli_query($conn,$query);
    if($res == true){
        $response = array("op" => true); 
    }
    else{
        $response = array("op" => false); 
    }

    echo json_encode($response);

    mysqli_close($conn);

}


function showFavorites(){
    header('Content-Type: application/json');

    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());

    $username = $_SESSION['username'];

    if((!isset($_GET['first']))&&(!isset($_GET['last']))&&(!isset($_GET['current']))){
        $query="SELECT * from favorites where username = '".$username."' ORDER BY favorite_id limit 12";
    }
    else if(isset($_GET['first'])){
        $query="SELECT * from favorites where username = '".$username."' AND  favorite_id >= '". $_GET['first']."' ORDER BY favorite_id limit 12";
    }
    else if(isset($_GET['last'])){
        $query="SELECT * from favorites where username = '".$username."' AND  favorite_id > '". $_GET['last']."' ORDER BY favorite_id limit 12";
    }
    else if(isset($_GET['current'])){
        $query="SELECT * from favorites where username = '".$username."' AND  favorite_id >= '". $_GET['current']."' ORDER BY favorite_id limit 12";
    }

    $res = mysqli_query($conn,$query);
    $results = array();
    if(mysqli_num_rows($res) > 0){
        while($row = mysqli_fetch_assoc($res)){
            $results[]= $row;
        }
        $status = true;
    }
    else{

        $status = false;
    }

    if(isset($_GET['last'])){
        $n_results = "SELECT count(*) as num from favorites where username = '".$username."' AND  favorite_id > '". $_GET['last']."' ORDER BY favorite_id";
        
    }
    else if(isset($_GET['current'])){
        $n_results = "SELECT count(*) as num from favorites where username = '".$username."' AND  favorite_id >= '". $_GET['current']."' ORDER BY favorite_id";
    }
    else{
        $n_results="SELECT count(*) as num from favorites where username = '".$username."' ORDER BY favorite_id";
    }
    
    $res = mysqli_query($conn,$n_results);
    $n_res = mysqli_fetch_assoc($res);
    $json = array("n_res" => $n_res,"results" => $results,"status" => $status);

    mysqli_close($conn);

    echo json_encode($json);

}





function addMsg(){


    header('Content-Type: application/json');

    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());


    $img = mysqli_real_escape_string($conn,$_GET['img']);
    $title = mysqli_real_escape_string($conn,$_GET['title']);
    $movie_id = mysqli_real_escape_string($conn,$_GET['movie_id']);
    $text = mysqli_real_escape_string($conn,$_GET['text']);
    $date = date("YmdHis"); 
    $username = $_SESSION['username'];
    $updated = 0;

    $query="INSERT INTO  chat values('".$username."','".$date."','".$img."','".$title."','".$movie_id."','".$text."','','".$updated."')";
    $res = mysqli_query($conn,$query);
    if($res == true){
        $response = array("op" => true); 
    }
    else{
        $response = array("op" => false); 
    }

    echo json_encode($response);
    mysqli_close($conn);


}

function removeMsg(){


    header('Content-Type: application/json');

    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());

    $msg_id = mysqli_real_escape_string($conn,$_GET['msg_id']);


    $username = $_SESSION['username'];


    $query="DELETE from chat where binary username = '".$username."'  AND  msg_id ='".$msg_id."'";
    $res = mysqli_query($conn,$query);
    if($res == true){
        $response = array("op" => true); 
    }
    else{
        $response = array("op" => false); 
    }

    echo json_encode($response);

    mysqli_close($conn);
    }



    function showMsg(){

    header('Content-Type: application/json');

    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());
    

    if((!isset($_GET['first_msg']))&&(!isset($_GET['current']))&&(!isset($_GET['last_msg']))){
        $query="SELECT * from chat ORDER BY msg_id DESC limit 10";
    }else if(isset($_GET['first_msg'])){
        $query="SELECT * from chat where msg_id <= '". $_GET['first_msg']."' ORDER BY msg_id DESC limit 10";
    }
    else if(isset($_GET['last_msg'])){
        $query="SELECT * from chat where msg_id < '". $_GET['last_msg']."' ORDER BY msg_id DESC limit 10";
    }else if(isset($_GET['current'])){
        $query="SELECT * from chat where msg_id <= '". $_GET['current']."' ORDER BY msg_id DESC limit 10";
    }

    $res = mysqli_query($conn,$query);
    $results = array();
    if(mysqli_num_rows($res) > 0){
        while($row = mysqli_fetch_assoc($res)){
            $results[]= $row;
        }
        $status = true;
    }
    else{
        $status = false;
    }

    if(isset($_GET['last_msg'])){
        $n_results = $query="SELECT count(*) as num from chat where msg_id < '". $_GET['last_msg']."' ORDER BY msg_id DESC";
        
    }
    else if(isset($_GET['current'])){
        $n_results = $query="SELECT count(*) as num from chat where msg_id <= '". $_GET['current']."' ORDER BY msg_id DESC";
    }
    else{
        $n_results = $query="SELECT count(*) as num from chat";
    }
    
    $res = mysqli_query($conn,$n_results);
    $n_res = mysqli_fetch_assoc($res);
    $json = array("n_res" => $n_res,"results" => $results,"status" => $status);


    mysqli_close($conn);

    echo json_encode($json);

    }

    function updateMsg(){
        

    header('Content-Type: application/json');

    $conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());

    $msg_id = mysqli_real_escape_string($conn,$_GET['msg_id']);
    $text_msg =mysqli_real_escape_string($conn,$_GET['text_msg']);

    $username = $_SESSION['username'];
    $date = date("YmdHis");


    $query="UPDATE chat set text_msg ='".$text_msg."' ,  date = '".$date."', updated = 1 where binary username = '".$username."'  AND  msg_id ='".$msg_id."'";
    $res = mysqli_query($conn,$query);
    if($res == true){
        $response = array("op" => true); 
    }
    else{
        $response = array("op" => false); 
    }

    echo json_encode($response);

    mysqli_close($conn);

    }




    function getUsername(){
        echo $_SESSION['username'];
    }

?>
