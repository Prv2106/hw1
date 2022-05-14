<?php

session_start();

header('Content-Type: application/json');

$conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());

$movie_id = mysqli_real_escape_string($conn,$_GET['movie_id']);

$username = $_SESSION['username'];

$query = "SELECT * from favorites where binary username = '".$username."'  AND  movie_id ='".$movie_id."' ";
$res = mysqli_query($conn,$query);

if(mysqli_num_rows($res) > 0){
    $response = array("op" => true); 
}
else{
    $response = array("op" => false); 
}

mysqli_close($conn);

echo json_encode($response);

?>