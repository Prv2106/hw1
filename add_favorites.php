<?php

session_start();

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
    exit;
}

$query="INSERT INTO  favorites values('".$movie_id."','".$username."','".$img."','".$title."','".$vote."','".$overview."')";
$res = mysqli_query($conn,$query);
if($res == true){
    $response = array("op" => true); 
}
else{
    $response = array("op" => false); 
}

mysqli_close($conn);

?>